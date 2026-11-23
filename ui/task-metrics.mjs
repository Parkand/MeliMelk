// A split commitment contributes its executable children, never the parent as well.
export function commitments(tasks){
 const children=new Map(),ids=new Set(tasks.map(t=>t.id));
 for(const t of tasks)if(t.parent_id){if(!children.has(t.parent_id))children.set(t.parent_id,[]);children.get(t.parent_id).push(t)}
 return tasks.filter(t=>!ids.has(t.parent_id)).map(root=>({root,items:children.get(root.id)||[root]}));
}
export const onTime=t=>t.status==='done'&&Boolean(t.completed_at&&t.due_at)&&t.completed_at<=t.due_at;
export const late=(t,now)=>!['done','cancelled'].includes(t.status)&&t.due_at<now;
export function summary(items,now){
 const live=items.filter(t=>t.status!=='cancelled'),due=live.filter(t=>t.due_at<=now||(t.status==='done'&&t.due_at&&t.completed_at)),unknown=due.filter(t=>t.status==='done'&&!t.completed_at).length;
 return {total:live.length,done:live.filter(t=>t.status==='done').length,late:live.filter(t=>late(t,now)).length,help:live.filter(t=>t.status==='help').length,due:due.length-unknown,unknown,onTime:due.filter(onTime).length};
}
