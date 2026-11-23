function TaskDetail({frame,row,ws,related,canEdit,edit,create,open}) {
  const h=O.default.createElement, fields=ne.tasks.fields;
  const value=k=>Xe(fields.find(f=>f.key===k),row[k],ws.data);
  const fact=(label,text)=>h('div',{key:label},h('dt',null,label),h('dd',null,text||'—'));
  const group=(label,...items)=>h('section',null,h('h3',null,label),h('dl',null,...items));
  const button=(label,fn,only=false)=>h('button',{type:'button',className:only?'mp-edit':'',title:label,'aria-label':label,onClick:fn},only?h('svg',{width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7,'aria-hidden':true},h('path',{d:'m4 16-1 5 5-1L20 8l-4-4Zm10-10 4 4'})):h(j,{name:'plus',size:16}),!only&&label);
  const sub=Kd(row,ws).length>0;
  return h(MaskanModal,{frame,title:row.title||'جزئیات وظیفه',size:'wide',expand:true,extra:{className:'task-detail'},heading:h('div',{className:'pc-card-heading task-heading'},h('span',{className:'pc-card-avatar','aria-hidden':true},h(j,{name:'tasks',size:24})),h('small',null,'وظایف و پیگیری'),h('h2',null,row.title||'وظیفه'))},
    h('div',{className:'modal-scroll task-content'},
      h('div',{className:'task-pair'},group('پیگیری',fact('موعد پیگیری',value('due_at')),fact('مسئول',ws.team.find(p=>p.id===row.assignee)?.name),fact('وضعیت',value('status')),fact('اولویت',value('priority'))),
      group('ارتباط‌ها',fact('شخص مرتبط',value('contact_id')),fact('فایل مرتبط',value('listing_id')))),
      h('section',null,h('h3',null,'نتیجه یا توضیحات'),h('p',null,row.result||'هنوز توضیحی ثبت نشده است.')),
      h('section',null,h('h3',null,'سوابق مرتبط · '+F.format(related.length)),related.length?related.map(([kind,item])=>h('button',{key:kind.key+':'+item.id,type:'button',onClick:()=>open(kind.key,item)},kind.single+' | '+Ee(kind.key,item,ws.data))):h('p',null,'هنوز سابقه‌ای برای این وظیفه ثبت نشده است.'))),
    (canEdit||sub)&&h('div',{className:'mp-foot'},canEdit&&button('ویرایش وظیفه',()=>edit('tasks',row),true),sub&&h('div',null,button('تعریف زیرکار',()=>create('tasks',{parent_id:row.id,assignee:'',due_at:row.due_at,contact_id:row.contact_id,listing_id:row.listing_id})))))
}
