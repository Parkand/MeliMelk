function MaskanContacts({ws,open,create}) {
  const React=A.default, h=React.createElement, host=React.useRef(null), grid=React.useRef(null), ready=React.useRef(false);
  const latest=React.useRef(); latest.current={open,rows:ws.data.contacts};
  const [query,Q]=React.useState(''), [role,R]=React.useState(''), [group,G]=React.useState('');
  const norm=v=>String(v??'').normalize('NFKC').replace(/[۰-۹]/g,c=>c.charCodeAt(0)-1776).replace(/[٠-٩]/g,c=>c.charCodeAt(0)-1632).replace(/ي/g,'ی').replace(/ك/g,'ک').trim().toLowerCase();
  const choices=ne.contacts.fields.find(f=>f.key==='category').choices;
  const data=React.useMemo(()=>ws.data.contacts.filter(r=>(!role||r.category===role)&&norm([r.name,r.phone,choices[r.category],r.source,r.note].join(' ')).includes(norm(query))).map(r=>({id:r.id,name:r.name,phone:r.phone,category:choices[r.category]||'نامشخص',source:r.source||'نامشخص'})),[ws.data.contacts,query,role]);
  const state=React.useRef(); state.current={data,group};
  React.useEffect(()=>{
    const text=v=>document.createTextNode(String(v??''));
    const coll=new Intl.Collator('fa',{numeric:true}), col=(title,field)=>({title,field,minWidth:125,formatter:c=>text(c.getValue()),sorter:(a,b)=>coll.compare(a??'',b??'')});
    const table=new globalThis.Tabulator(host.current,{index:'id',textDirection:'rtl',height:'min(65vh, 650px)',layout:'fitColumns',data:state.current.data,placeholder:'مشتری برای نمایش وجود ندارد',groupStartOpen:true,groupHeader:(v,n)=>{const el=document.createElement('strong');el.textContent=v+' ('+F.format(n)+')';return el;},columns:[col('نام و نام خانوادگی','name'),col('موبایل','phone'),col('نقش اصلی','category'),col('منبع آشنایی','source'),{title:'پرونده',width:100,headerSort:false,formatter:cell=>{const btn=document.createElement('button');btn.type='button';btn.className='link';btn.textContent='جزئیات';btn.onclick=()=>{const current=latest.current.rows.find(r=>r.id===cell.getRow().getData().id);if(current)latest.current.open('contacts',current);};return btn;}}]});
    grid.current=table;table.on('tableBuilt',()=>{if(grid.current!==table)return;ready.current=true;table.replaceData(state.current.data);table.setGroupBy(state.current.group||false);});return()=>{grid.current=null;ready.current=false;table.destroy();};
  },[]);
  React.useEffect(()=>{if(ready.current)grid.current.replaceData(data);},[data]);
  React.useEffect(()=>{if(ready.current)grid.current.setGroupBy(group||false);},[group]);
  const select=(title,value,set,items)=>h('select',{'aria-label':title,value,onChange:e=>set(e.target.value)},items.map(([v,l])=>h('option',{key:v,value:v},l)));
  return h(React.Fragment,null,h('button',{className:'primary desk-create-fab',onClick:()=>create('contacts')},'＋ ثبت شخص'),h('section',{className:'panel ledger',dir:'rtl'},h('div',{className:'tools',style:{flexWrap:'wrap'}},h('label',{className:'search'},h('input',{'aria-label':'جست‌وجوی مشتری',placeholder:'نام، موبایل یا منبع آشنایی…',value:query,onChange:e=>Q(e.target.value)})),select('فیلتر نقش',role,R,[['','همهٔ نقش‌ها'],...Object.entries(choices)]),select('گروه‌بندی',group,G,[['','بدون گروه‌بندی'],['category','گروه: نقش اصلی'],['source','گروه: منبع آشنایی']]),h('button',{onClick:()=>{const rows=grid.current?.getData('active')??data;Yi('contacts',[['نام و نام خانوادگی','موبایل','نقش اصلی','منبع آشنایی'],...rows.map(r=>[r.name,r.phone,r.category,r.source].map(v=>/^[\s]*[=+@-]/.test(v)?"'"+v:v))]);}},'CSV'),(query||role)?h('button',{onClick:()=>{Q('');R('');}},'پاک‌کردن فیلترها'):null),h('div',{ref:host,'aria-label':'فهرست مشتری‌ها'}),h('div',{className:'pager','aria-live':'polite'},data.length?F.format(data.length)+' مشتری':ws.data.contacts.length?'مشتری مطابق این جست‌وجو پیدا نشد.':'هنوز مشتری ثبت نشده است.')));
}
