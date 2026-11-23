const createMaskanPersonCard = (O,ne,Xe,sl,pcSummary,MaskanModal,F,Ee,personSummary) => {
function MaskanPersonCard({frame,refresh,person,ws,related,canEdit,close,nested,edit,create,open}){
 const R=O.default,h=R.createElement,fields=ne.contacts.fields,display=k=>{const f=fields.find(v=>v.key===k);return f&&person[k]!=null&&person[k]!==''?Xe(f,person[k],ws.data):'—'};
 const [busy,setBusy]=R.useState(false),[err,setErr]=R.useState('');async function toggle(){if(busy||!confirm(person.archived?`«${person.name}» به فهرست فعال برگردد؟`:`«${person.name}» بایگانی شود؟ شخص و تمام سوابق او حفظ می‌شوند.`))return;setBusy(true);setErr('');try{await sl('contact-archive/'+encodeURIComponent(person.id),'PUT',{archived:!person.archived,version:person.version});if(!await refresh())throw Error('تغییر ثبت شد؛ برای دیدن نتیجه صفحه را تازه کنید.');close()}catch(e){setErr(e.message)}finally{setBusy(false)}}
 const paths={folder:'M3 6h7l2 2h9v12H3z',archive:'M3 4h18v5H3z M5 9v11h14V9 M10 13h4',edit:'M4 20l4-1 12-12-4-4L4 15z M14 5l4 4',close:'M6 6l12 12M18 6L6 18',back:'M5 12h14m-6-6 6 6-6 6',task:'M4 5h16v15H4z M8 12l3 3 5-6',demand:'M5 3h14v18H5z M8 9h8m-8 5h5',left:'m14 6-6 6 6 6'};
 const icon=k=>h('svg',{viewBox:'0 0 24 24',width:19,height:19,fill:'none',stroke:'currentColor',strokeWidth:1.65,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true},h('path',{d:paths[k]}));
 const btn=(text,k,fn,cls='',only=false)=>h('button',{type:'button',className:cls,disabled:busy,onClick:fn,title:text,'aria-label':text},icon(k),!only&&text);
 return h(MaskanModal,{frame,title:person.name||'پروندهٔ شخص',size:'wide',expand:true,blocked:busy,heading:h('div',{className:'pc-card-heading'},h('div',{className:'pc-card-avatar'},h('span',{'aria-hidden':true},Array.from((person.name||'').trim())[0]||'•'),person.profile?.photo&&h('img',{key:person.profile.photo,src:person.profile.photo,alt:'تصویر '+(person.name||'شخص'),onError:e=>e.currentTarget.hidden=true})),h('small',null,icon('folder'),'پروندهٔ شخص'),h('h2',{id:'mp-name'},person.name||'بدون نام'))},
 h('div',{className:'mp-body pc-file-body'},h('div',{className:'pc-details'},personSummary(h,person,ws),person.archived&&h('small',null,'بایگانی‌شده'), ...pcSummary({...person,methods:[],links:[]},ws).map(([k,n],i)=>h('p',{key:i},k+': '+n))),
 h('section',{className:'mp-history'},h('h3',null,'سوابق مرتبط ',h('small',null,F.format(related.length))),h('div',{className:'mp-scroll',tabIndex:0,'aria-label':'فهرست سوابق مرتبط'},related.length?related.map(([kind,row])=>h('button',{type:'button',key:kind.key+':'+row.id,onClick:()=>open(kind.key,row)},h('span',null,kind.single),h('b',null,Ee(kind.key,row,ws.data)),icon('left'))):h('p',null,'هنوز سابقه‌ای برای این شخص ثبت نشده است.')))),err&&h('p',{role:'alert'},err),
 h('div',{className:'mp-foot'},canEdit&&btn('ویرایش شخص','edit',()=>edit('contacts',person),'mp-edit',true),canEdit&&btn(person.archived?'بازگرداندن':'بایگانی','archive',toggle,'mp-archive'),!person.archived&&h('div',null,btn('ثبت پیگیری','task',()=>create('tasks',{contact_id:person.id})),btn('ثبت تقاضا','demand',()=>create('demands',{contact_id:person.id})))));
}


/* MASKAN_PERSON_END */
return MaskanPersonCard;
};
