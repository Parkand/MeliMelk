import test from 'node:test';
import assert from 'node:assert/strict';
import {api} from '../core/api.mjs';
import {connect,migrate} from '../core/db.mjs';
import {initialize} from '../core/seed.mjs';
import {commitments,summary} from '../ui/task-metrics.mjs';

const origin=process.env.APP_ORIGIN='http://127.0.0.1:3093';
test('SQLite API: two independent offices',async t=>{
 const db=await connect('sqlite::memory:');t.after(()=>db.close());await migrate(db);
 const password='sqlite-fixture-only';await initialize(db,{email:'chief@daftar.test',password});
 async function call(cookie,path,method='GET',body,status=200){
  const r=await api(new Request(`${origin}/api/${path}`,{method,headers:{cookie,origin,'content-type':'application/json'},body:body&&JSON.stringify(body)}),db);
  const res=await r.json();assert.equal(r.status,status,`${method} ${path}: ${JSON.stringify(res)}`);return {...res,cookie:r.headers.get('set-cookie')?.split(';')[0]};
 }
 const signin=async name=>call('','login','POST',{email:`${name}@daftar.test`,password});
 const chief=await signin('chief');const user=async(name,role)=>{await call(chief.cookie,'team','POST',{name,email:`${name}@daftar.test`,role,password},201);return signin(name)};
 const m=await user('manager1','office_manager'),m2=await user('manager2','office_manager'),a=await user('agent1','agent'),a2=await user('agent2','agent');
 const ws=u=>call(u.cookie,'workspace'),id=u=>u.user.id;
 const group=(who,name,manager,members,status=201)=>call(who.cookie,'groups','POST',{name,manager_id:id(manager),members:members.map(id)},status);
 const g=await group(chief,'غرب',m,[a]),g2=await group(chief,'شرق',m2,[a2]);
 const task={title:'پیگیری',due_at:'2026-05-01T12:00',status:'open',priority:'normal'};
 const add=(u,opts,status=201)=>call(u.cookie,'records/tasks','POST',{...task,...opts},status);
 const row=async(u,key)=>(await ws(u)).data.tasks.find(x=>x.id===key);
 const change=(u,r,patch,status=200)=>call(u.cookie,`records/tasks/${r.id}`,'PUT',{...r,...patch},status);
 await t.test('only chief manages groups; membership cannot span two groups',async()=>{
  await group(m,'نامعتبر',m,[],403);await call(chief.cookie,'groups/'+g2.id,'PUT',{members:[id(a)]},422);
  assert.deepEqual((await ws(m)).groups.map(x=>x.id),[g.id]);assert.deepEqual(new Set((await ws(m)).targets),new Set([id(a),id(m)]));assert.deepEqual((await ws(a)).targets,[id(a)]);
 });
 await t.test('server enforces delegation; workspace contains only permitted tasks',async()=>{
  const other=(await add(m2,{assignee:id(a2)})).id, self=(await add(a,{})).id, direct=(await add(chief,{assignee:id(a)})).id;
  await add(m,{group_id:g.id});await add(m,{group_id:g2.id},403);for(const u of [chief,m2,a2])await add(m,{assignee:id(u)},403);
  for(const u of [chief,m,a2])await add(a,{assignee:id(u)},403);await add(a,{group_id:g.id},403);
  assert.ok(await row(m,direct));assert.ok(await row(a,self));assert.equal(await row(m,other),undefined);assert.equal(await row(a,other),undefined);assert.equal(await row(m2,direct),undefined);
  await change(m,await row(chief,other),{title:'ویرایش'},403);await change(a,await row(a,self),{assignee:id(m)},403);
 });
 await t.test('accountable manager splits and closes only after worker reports completion',async()=>{
  const root=(await add(chief,{group_id:g.id})).id;const childOpts={parent_id:root,assignee:id(a)};
  await add(m2,{...childOpts,assignee:id(a2)},403);await add(chief,{...childOpts,assignee:id(a2)},403);await add(a,childOpts,403);
  const child=(await add(m,childOpts)).id;const p=await row(m,root),c=await row(a,child);
  assert.equal(p.assignee,id(m));assert.equal(p.creator_id,id(chief));assert.equal(c.creator_id,id(m));assert.equal(await row(a,root),undefined);
  await add(m,{...childOpts,parent_id:child},422);await change(chief,p,{assignee:id(chief),group_id:null},409);
  await change(m,p,{status:'done',result:'پایان'},409);await change(chief,p,{status:'cancelled'},409);
  await change(a,c,{title:'تغییر تعریف'},403);await change(a,c,{status:'help',result:'  '},422);
  await change(a,c,{status:'help',result:'نیاز به تأیید مدیر'});const help=await row(m,child);assert.equal(help.status,'help');assert.equal(help.assignee,id(a));assert.equal(help.result,'نیاز به تأیید مدیر');
  await change(a,help,{status:'done',result:'پیگیری شد'});assert.ok((await row(m,child)).completed_at);await change(m,p,{status:'done',result:'جمع‌بندی شد'});
  await change(a,await row(a,child),{status:'open'},409);assert.equal((await row(chief,root)).status,'done');
 });
});

test('metrics: split parent excluded; known due work only; equality is on time',()=>{
 const now='2026-05-10T15:00',past='2026-05-09T15:00',future='2026-05-11T15:00';
 const root={id:'p',status:'open',due_at:past};const children=[['a','done',past,past],['b','done',past,now],['c','done',past,null],['d','help',past],['e','waiting',now],['f','cancelled',past],['g','open',future]].map(([id,status,due_at,completed_at])=>({id,parent_id:'p',status,due_at,completed_at}));
 const single={id:'z',status:'done',due_at:future,completed_at:now};const sets=commitments([...children,root,single]);assert.equal(sets.length,2);assert.equal(sets[0].items.length,7);
 assert.deepEqual(summary(sets.flatMap(x=>x.items),now),{total:7,done:4,late:1,help:1,due:4,unknown:1,onTime:1});
 assert.deepEqual(summary([],now),{total:0,done:0,late:0,help:0,due:0,unknown:0,onTime:0});
});
