function MaskanPersonCard({person,ws,related,canEdit,close,nested,edit,create,open}){
 const R=O.default,h=R.createElement,ref=R.useRef(null),fields=ne.contacts.fields,display=k=>{const f=fields.find(v=>v.key===k);return f&&person[k]!=null&&person[k]!==''?Xe(f,person[k],ws.data):'—'};
 R.useEffect(()=>{const el=ref.current;el.showModal();return ()=>el.close()},[]);
 const paths={edit:'M4 20l4-1 12-12-4-4L4 15z M14 5l4 4',close:'M6 6l12 12M18 6L6 18',back:'M5 12h14m-6-6 6 6-6 6',task:'M4 5h16v15H4z M8 12l3 3 5-6',demand:'M5 3h14v18H5z M8 9h8m-8 5h5',left:'m14 6-6 6 6 6'};
 const icon=k=>h('svg',{viewBox:'0 0 24 24',width:19,height:19,fill:'none',stroke:'currentColor',strokeWidth:1.65,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true},h('path',{d:paths[k]}));
 const btn=(text,k,fn,cls='',only=false)=>h('button',{type:'button',className:cls,onClick:fn,title:text,'aria-label':text},icon(k),!only&&text);
 const facts=[['موبایل',display('phone'),'ltr'],['منبع آشنایی',display('source')],['مسئول پرونده',ws.team.find(p=>p.id===person.assignee)?.name||'—'],...fields.filter(f=>!['name','phone','category','source','note'].includes(f.key)).map(f=>[f.label,display(f.key)])];
 return h('dialog',{ref,className:'mperson',dir:'rtl','aria-labelledby':'mp-name',onCancel:e=>{e.preventDefault();close()}},
 h('div',{className:'mp-head'},h('div',null,h('small',null,'پروندهٔ شخص'),h('h2',{id:'mp-name'},person.name||'بدون نام'),h('span',null,display('category'))),btn(nested?'بازگشت':'بستن',nested?'back':'close',close,'mp-close')),
 h('div',{className:'mp-body'},h('dl',null,facts.map(([label,value,dir])=>h('div',{key:label},h('dt',null,label),h('dd',null,h('bdi',{dir},value))))),person.note&&h('section',{className:'mp-note'},h('h3',null,'یادداشت'),h('p',null,person.note)),
 h('section',{className:'mp-history'},h('h3',null,'سوابق مرتبط ',h('small',null,F.format(related.length))),related.length?related.map(([kind,row])=>h('button',{type:'button',key:kind.key+':'+row.id,onClick:()=>open(kind.key,row)},h('span',null,kind.single),h('b',null,Ee(kind.key,row,ws.data)),icon('left'))):h('p',null,'هنوز سابقه‌ای برای این شخص ثبت نشده است.'))),
 h('div',{className:'mp-foot'},canEdit&&btn('ویرایش شخص','edit',()=>edit('contacts',person),'mp-edit',true),h('div',null,btn('ثبت پیگیری','task',()=>create('tasks',{contact_id:person.id})),btn('ثبت تقاضا','demand',()=>create('demands',{contact_id:person.id})))));
}
