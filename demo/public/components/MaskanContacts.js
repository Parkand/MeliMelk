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
 const kpi=MaskanDataGrid.useKpi();
  const choices=ne.contacts.fields.find(f=>f.key==='category').choices;
 const norm=v=>String(v??'').normalize('NFKC').replace(/[۰-۹]/g,c=>c.charCodeAt(0)-1776).replace(/[٠-٩]/g,c=>c.charCodeAt(0)-1632).replace(/ي/g,'ی').replace(/ك/g,'ک').trim().toLowerCase();
 const data=React.useMemo(()=>ws.data.contacts.filter(r=>Boolean(r.archived)===(shelf==='archive')&&(!role||r.category===role)&&norm([r.name,r.phone,choices[r.category],r.source,r.note].join(' ')).includes(norm(q))).map(r=>({kpiValues:[r.category,norm(String(r.source||'').trim().replace(/\s+/g,' ')),String(r.assignee)],id:r.id,name:r.name,first:r.profile?.first,photo:r.profile?.photo,phone:r.phone,category:choices[r.category]||'نامشخص',source:r.source||'نامشخص'})),[ws.data.contacts,q,role,shelf]);
 const cards=React.useMemo(()=>{
   const buckets=[new Map(),new Map(),new Map()], staff=new Map((ws.team||[]).map(x=>[String(x.id),x.name]));
   function add(i,key,name){if(!key||!name||name==='نامشخص')return;const m=buckets[i],entry=m.get(key)||{key,name,n:0};entry.n++;m.set(key,entry);}
   for(const r of ws.data.contacts){if(Boolean(r.archived)!==(shelf==='archive'))continue;
     add(0,r.category,choices[r.category]);const source=String(r.source||'').trim().replace(/\s+/g,' ');add(1,norm(source),source);add(2,String(r.assignee),staff.get(String(r.assignee)));
   }
   return buckets.map(m=>Array.from(m.values()).sort((a,b)=>b.n-a.n||a.name.localeCompare(b.name,'fa'))[0]);
 },[ws.data.contacts,ws.team,shelf,choices]);
 const summary=h('section',{className:'mc-kpis','aria-label':'شاخص‌های مشتریان'},['نقش غالب','منبع آشنایی غالب','مشاور با بیشترین مشتری'].map((label,i)=>{const item=cards[i];return h('div',{key:label,...kpi.card(i,!!item)},h('span',{style:kpi.icon(i),className:'mc-k-icon','aria-hidden':true},h('svg',{viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7},h('path',{d:['M16 21v-2a6 6 0 0 0-12 0v2 M14 7a4 4 0 1 1-8 0 4 4 0 1 1 8 0','M3 6h18v12H3z M3 6l9 7 9-7','M3 15v-3a9 9 0 0 1 18 0v5l-4 3h-4 M3 12h4v6H3z M17 12h4v6h-4z'][i]}))),h('small',null,label),h('strong',{title:item?.name},item?item.name+' · '+F.format(item.n)+' مشتری':'—'));}));
 const select=(title,value,set,items)=>h('select',{'aria-label':title,value,onChange:e=>set(e.target.value)},items.map(([v,l])=>h('option',{key:v,value:v},l)));
 const toolbar=getRows=>h('div',{className:'tools'},h('label',{className:'search'},h('input',{'aria-label':'جست‌وجوی مشتری',placeholder:'نام، موبایل یا منبع آشنایی…',value:q,onChange:e=>Q(e.target.value)})),select('وضعیت پرونده',shelf,v=>{setShelf(v);kpi.set([])},[['active','مشتریان فعال'],['archive','بایگانی‌شده‌ها']]),select('فیلتر نقش',role,R,[['','همهٔ نقش‌ها'],...Object.entries(choices)]),select('گروه‌بندی',group,G,[['','بدون گروه‌بندی'],['category','گروه: نقش اصلی'],['source','گروه: منبع آشنایی']]),h('button',{onClick:()=>Yi('contacts',[maskanContactColumns.filter(c=>c.field).map(c=>c.title),...getRows().map(r=>[r.name,r.phone,r.category,r.source].map(v=>/^\s*[=+@-]/.test(v)?"'"+v:v))])},'CSV'),q||role||kpi.keys.length?h('button',{onClick:()=>{Q('');R('');kpi.set([]);}},'پاک‌کردن فیلترها'):null,h('button',{type:'button',className:'primary',onClick:()=>create('contacts')},'＋ ثبت شخص'));
 return h(React.Fragment,null,summary,h(MaskanDataGrid,{columns:maskanContactColumns,data:data.filter(r=>kpi.accepts(i=>r.kpiValues[i]===cards[i]?.key)),group,toolbar,label:'فهرست مشتری‌ها',empty:'مشتری برای نمایش وجود ندارد',countLabel:n=>n?F.format(n)+' مشتری':ws.data.contacts.length?'مشتری مطابق این جست‌وجو پیدا نشد.':'هنوز مشتری ثبت نشده است.',onAction:(_,r)=>{const item=ws.data.contacts.find(v=>v.id===r.id);if(item)open('contacts',item);}}));
}
return MaskanContacts;
};
