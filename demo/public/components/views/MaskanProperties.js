function MaskanProperties({ws,open,create}) {
  const R=A.default,h=R.createElement,model=ne.properties;
  const [query,Q]=R.useState(''),[kind,K]=R.useState(''),[group,G]=R.useState('');
  const fields=R.useMemo(()=>model.columns.map(key=>model.fields.find(f=>f.key===key)),[model]);
  const columns=R.useMemo(()=>[...fields.map(f=>({field:f.key,title:f.label})),{title:'پرونده',action:'details',caption:'جزئیات'}],[fields]);
  const choices=model.fields.find(f=>f.key==='kind').choices;
  const data=R.useMemo(()=>ws.data.properties.filter(p=>(!kind||p.kind===kind)&&(!query||bo(model.fields.map(f=>Xe(f,p[f.key],ws.data)).join(' ')).includes(bo(query)))).map(p=>({id:p.id,...Object.fromEntries(fields.map(f=>[f.key,Xe(f,p[f.key],ws.data)]))})),[ws.data,fields,kind,query,model]);
  const select=(label,value,set,items)=>h('select',{'aria-label':label,value,onChange:e=>set(e.target.value)},items.map(([v,l])=>h('option',{key:v,value:v},l)));
  const toolbar=getRows=>h('div',{className:'tools'},h('label',{className:'search'},h('input',{'aria-label':'جست‌وجوی ملک',placeholder:'جست‌وجو در بانک املاک…',value:query,onChange:e=>Q(e.target.value)})),select('نوع ملک',kind,K,[['','همهٔ انواع ملک'],...Object.entries(choices)]),select('گروه‌بندی',group,G,[['','بدون گروه‌بندی'],['kind','گروه: نوع ملک'],['district','گروه: محله']]),h('button',{onClick:()=>Yi('properties',[fields.map(f=>f.label),...getRows().map(row=>fields.map(f=>{const v=String(row[f.key]??'');return /^\s*[=+@-]/.test(v)?"'"+v:v;}))])},'CSV'),(query||kind)?h('button',{onClick:()=>{Q('');K('');}},'پاک‌کردن فیلترها'):null);
  return h('div',{className:'maskan-properties'},h('button',{className:'primary desk-create-fab',onClick:()=>create('properties')},'＋ ثبت ملک'),h(MaskanDataGrid,{columns,data,group,toolbar,label:'بانک املاک',empty:'ملکی برای نمایش وجود ندارد',countLabel:n=>F.format(n)+' ملک',onAction:(_,r)=>{const p=ws.data.properties.find(p=>p.id===r.id);if(p)open('properties',p);}}));
}
