const createMaskanContacts = (A,ne,Yi,MaskanDataGrid,F) => {
function contactAvatar(cell){
 const row=cell.getRow().getData(),box=document.createElement('span');
 box.className='mc-avatar';box.setAttribute('aria-hidden','true');
 box.textContent=Array.from(row.first?.trim()||row.name?.trim()||'—')[0];
 if(row.photo){const img=document.createElement('img');img.alt='';img.decoding='async';img.onerror=()=>img.remove();img.src=row.photo;box.append(img);}
 return box;
}
const maskanContactColumns=[{title:'تصویر',display:contactAvatar,width:58},{title:'نام و نام خانوادگی',field:'name'},{title:'موبایل',field:'phone'},{title:'نقش اصلی',field:'category'},{title:'منبع آشنایی',field:'source'},{title:'پرونده',action:'details',caption:'جزئیات'}];
function MaskanContacts({ws,open,create}) {
 const React=A.default,h=React.createElement, [q,Q]=React.useState(''),[role,R]=React.useState(''),[group,G]=React.useState(''),[shelf,setShelf]=React.useState('active');
 const choices=ne.contacts.fields.find(f=>f.key==='category').choices;
 const norm=v=>String(v??'').normalize('NFKC').replace(/[۰-۹]/g,c=>c.charCodeAt(0)-1776).replace(/[٠-٩]/g,c=>c.charCodeAt(0)-1632).replace(/ي/g,'ی').replace(/ك/g,'ک').trim().toLowerCase();
 const data=React.useMemo(()=>ws.data.contacts.filter(r=>Boolean(r.archived)===(shelf==='archive')&&(!role||r.category===role)&&norm([r.name,r.phone,choices[r.category],r.source,r.note].join(' ')).includes(norm(q))).map(r=>({id:r.id,name:r.name,first:r.profile?.first,photo:r.profile?.photo,phone:r.phone,category:choices[r.category]||'نامشخص',source:r.source||'نامشخص'})),[ws.data.contacts,q,role,shelf]);
 const select=(title,value,set,items)=>h('select',{'aria-label':title,value,onChange:e=>set(e.target.value)},items.map(([v,l])=>h('option',{key:v,value:v},l)));
 const toolbar=getRows=>h('div',{className:'tools'},h('label',{className:'search'},h('input',{'aria-label':'جست‌وجوی مشتری',placeholder:'نام، موبایل یا منبع آشنایی…',value:q,onChange:e=>Q(e.target.value)})),select('وضعیت پرونده',shelf,setShelf,[['active','مشتریان فعال'],['archive','بایگانی‌شده‌ها']]),select('فیلتر نقش',role,R,[['','همهٔ نقش‌ها'],...Object.entries(choices)]),select('گروه‌بندی',group,G,[['','بدون گروه‌بندی'],['category','گروه: نقش اصلی'],['source','گروه: منبع آشنایی']]),h('button',{onClick:()=>Yi('contacts',[maskanContactColumns.filter(c=>c.field).map(c=>c.title),...getRows().map(r=>[r.name,r.phone,r.category,r.source].map(v=>/^\s*[=+@-]/.test(v)?"'"+v:v))])},'CSV'),q||role?h('button',{onClick:()=>{Q('');R('');}},'پاک‌کردن فیلترها'):null);
 return h(React.Fragment,null,h('button',{className:'primary desk-create-fab',onClick:()=>create('contacts')},'＋ ثبت شخص'),h(MaskanDataGrid,{columns:maskanContactColumns,data,group,toolbar,label:'فهرست مشتری‌ها',empty:'مشتری برای نمایش وجود ندارد',countLabel:n=>n?F.format(n)+' مشتری':ws.data.contacts.length?'مشتری مطابق این جست‌وجو پیدا نشد.':'هنوز مشتری ثبت نشده است.',onAction:(_,r)=>{const item=ws.data.contacts.find(v=>v.id===r.id);if(item)open('contacts',item);}}));
}
return MaskanContacts;
};
