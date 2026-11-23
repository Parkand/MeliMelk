import {mkdir,mkdtemp,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {connect,migrate} from '../core/db.mjs';
import {initialize,dayOffset} from '../core/seed.mjs';
import {addUser,save} from '../core/service.mjs';
import {groupChange} from '../core/hierarchy.mjs';
const base=resolve('demo/generated-tests');await mkdir(base,{recursive:true});
const dir=await mkdtemp(join(base,'office-')); // Never open an existing database.
const db=await connect('sqlite:'+join(dir,'office.sqlite'));
try {
 await migrate(db);await initialize(db,{name:'سارا',email:'sara@daftar.test',password:'Sara-Demo-7812',sample:true});
 await db.tx(async q=>{
 const [admin]=await q('SELECT id,role FROM users');
 const manager=await addUser(q,{name:'نیما',role:'office_manager',email:'nima@daftar.test',password:'Nima-Demo-4531'});
 const tina=await addUser(q,{name:'تینا',role:'agent',email:'tina@daftar.test',password:'Tina-Demo-6294'});
 await groupChange(q,admin,{name:'فروش غرب',manager_id:manager,members:[tina]});
 const add=(k,v)=>save(q,admin,k,v);
 for(let i=1;i<=180;i++){
 const district=['ونک','پونک','صادقیه','سعادت‌آباد','مرزداران'][i%5],kind=i%2?'sale':'rent',area=60+i%95;
 const person=(n,category,label)=>add('contacts',{name:label+' '+i,phone:'09'+String(n).padStart(9,'0'),category,source:'داده آزمایشی'});
 const owner=await person(i,'owner','مالک نمونه'),buyer=await person(500+i,'customer','متقاضی نمونه');
 const p=await add('properties',{title:'آپارتمان '+district+' شماره '+i,owner_id:owner,kind:'apartment',district,area,rooms:1+i%3,parking:'yes'});
 const l=await add('listings',{property_id:p,kind,status:'active',verified:dayOffset(-i%20),...(kind==='sale'?{price:area*95000000}:{deposit:area*5000000,rent:area*120000})});
 await add('demands',{contact_id:buyer,kind,property_kind:'apartment',district,min_area:area-10,budget:area*100000000,parking:'yes',status:'active'});
 await save(q,{id:tina,role:'agent'},'tasks',{title:'پیگیری فایل '+district+' '+i,listing_id:l,contact_id:buyer,due_at:dayOffset(i%15-7)+'T10:30',priority:i%3?'normal':'high',status:i%4?'open':'waiting'});
 await add('visits',{contact_id:buyer,listing_id:l,starts_at:dayOffset(i+1)+'T11:00',ends_at:dayOffset(i+1)+'T11:45',status:'planned'});
 }
 let total=0;for(const t of ['contacts','properties','listings','demands','tasks','visits','deals','contracts','payments']){const [r]=await q(`SELECT COUNT(*) AS n FROM ${t}`);total+=Number(r.n);console.log(t,r.n);}if(total<=1000)throw Error('Insufficient records');console.log('Total:',total);
 });
}finally{await db.close()}
await writeFile(join(base,'latest.txt'),dir,'utf8');console.log(dir);
