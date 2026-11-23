import {randomUUID} from 'node:crypto';
import {must,log} from './service.mjs';
export const roleSql="CASE WHEN EXISTS(SELECT 1 FROM office_managers om WHERE om.user_id=u.id) THEN 'office_manager' ELSE u.role END";
export const taskSelect='SELECT t.*,r.creator_id,r.group_id,r.parent_id,r.completed_at FROM tasks t LEFT JOIN task_routes r ON r.task_id=t.id';
export async function directory(q,u){
 const groups=await q('SELECT * FROM office_groups'+(u.role==='admin'?'':u.role==='office_manager'?' WHERE manager_id=?':' WHERE id IN (SELECT group_id FROM group_members WHERE user_id=?)')+' ORDER BY name',u.role==='admin'?[]:[u.id]);
 const team=await q(`SELECT u.id,u.name,u.active,${roleSql} AS role,m.group_id FROM users u LEFT JOIN group_members m ON m.user_id=u.id ORDER BY u.name`);
 const managed=new Set(groups.filter(g=>g.manager_id===u.id).map(g=>g.id));
 const targets=team.filter(t=>t.active&&(u.role==='admin'||t.id===u.id||u.role==='office_manager'&&t.role==='agent'&&managed.has(t.group_id)));
 return {groups,team,targets};
}
export async function groupChange(q,u,b,id){
 must(u.role==='admin',403,'تعریف گروه فقط برای مدیر کل مجاز است.');
 if(!id){const name=String(b.name??'').trim();must(name&&name.length<=120,422,'نام گروه معتبر نیست.');must((await q(`SELECT id FROM users u WHERE active=1 AND id=? AND ${roleSql} IN ('admin','office_manager')`,[b.manager_id??''])).length,422,'مدیر گروه را انتخاب کنید.');id=randomUUID();await q('INSERT INTO office_groups(id,name,manager_id) VALUES(?,?,?)',[id,name,b.manager_id]);}
 else must((await q('SELECT id FROM office_groups WHERE id=?',[id])).length,404,'گروه یافت نشد.');
 must(Array.isArray(b.members)&&b.members.length<=500,422,'فهرست اعضا معتبر نیست.');
 for(const member of new Set(b.members)){must(typeof member==='string'&&(await q(`SELECT id FROM users u WHERE active=1 AND id=? AND ${roleSql}='agent' AND NOT EXISTS(SELECT 1 FROM group_members m WHERE m.user_id=u.id)`,[member])).length,422,'مشاور باید فعال و بدون گروه باشد.');await q('INSERT INTO group_members(user_id,group_id) VALUES(?,?)',[member,id]);}
 await log(q,u,'groups',id,'تعریف گروه یا افزودن عضو');return id;
}
export async function routeTask(q,u,body,old,now){
 const {targets,groups}=await directory(q,u),group_id=('group_id' in body?body.group_id:old?.group_id)||null,parent_id=('parent_id' in body?body.parent_id:old?.parent_id)||null;
 const g=groups.find(g=>g.id===group_id);if(group_id)must(u.role!=='agent'&&g,403,'واگذاری به این گروه مجاز نیست.');
 const owner=body.assignee||g?.manager_id||old?.assignee||u.id;
 must(targets.some(t=>t.id===owner)&&(!g||owner===g.manager_id),403,'واگذاری به این مسئول مجاز نیست.');
 if(old){must(old.parent_id===parent_id,409,'تغییر وظیفهٔ اصلی مجاز نیست.');const definition=u.role==='admin'||old.creator_id===u.id||(!old.creator_id&&old.assignee===u.id);
 must(definition||old.assignee===u.id,403,'ویرایش این وظیفه مجاز نیست.');
 if(!definition){must(owner===old.assignee&&group_id===old.group_id&&['title','due_at','priority','contact_id','listing_id'].every(k=>(body[k]||null)===(old[k]||null))&&body.status!=='cancelled',403,'فقط وضعیت و گزارش اجرا قابل تغییر است.');}
 }
 if(parent_id){const [p]=await q(taskSelect+' WHERE t.id=?',[parent_id]);must(p&&!p.parent_id&&!group_id,422,'زیرکار باید به یک وظیفهٔ اصلی وصل باشد.');
 if(!old||old.assignee!==owner){must((u.role==='admin'||u.role==='office_manager'&&p.assignee===u.id)&&!['done','cancelled'].includes(p.status),403,'تقسیم این وظیفه مجاز نیست.');const target=targets.find(t=>t.id===owner),scope=p.group_id?[p.group_id]:(await q('SELECT id FROM office_groups WHERE manager_id=?',[p.assignee])).map(g=>g.id);must(target.role==='agent'&&scope.includes(target.group_id),403,'مجری باید مشاور گروه مسئول باشد.');}
 if(old&&['done','cancelled'].includes(p.status))must(false,409,'ابتدا وظیفهٔ اصلی را باز کنید.');
 }
 if(old&&!parent_id){const children=await q('SELECT t.status FROM tasks t JOIN task_routes r ON r.task_id=t.id WHERE r.parent_id=?',[old.id]);if(children.length){must(owner===old.assignee&&old.group_id===group_id,409,'تغییر مسئول وظیفهٔ تقسیم‌شده مجاز نیست.');if(['done','cancelled'].includes(body.status))must(children.every(t=>['done','cancelled'].includes(t.status)),409,'ابتدا زیرکارهای باز را تعیین تکلیف کنید.');}}
 if(body.status==='help')must(String(body.result??'').trim(),422,'علت درخواست کمک را بنویسید.');
 return {owner,group_id,parent_id,creator_id:old?.creator_id||old?.assignee||u.id,completed_at:body.status==='done'?(old?.status==='done'?old.completed_at:now):null};
}
