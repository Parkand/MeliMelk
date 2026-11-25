function MaskanProperties({ws,open,create}) {
  const R=A.default,h=R.createElement,model=ne.properties;
  const [query,Q]=R.useState(''),[kind,K]=R.useState(''),[group,G]=R.useState('');
  const kpi=MaskanDataGrid.useKpi();
  const fields=R.useMemo(()=>model.columns.map(key=>model.fields.find(f=>f.key===key)),[model]);
  const columns=R.useMemo(()=>[...fields.map(f=>({field:f.key,title:f.label})),{title:'پرونده',action:'details',caption:'جزئیات'}],[fields]);
  const choices=model.fields.find(f=>f.key==='kind').choices;
  const data=R.useMemo(()=>ws.data.properties.filter(p=>(!kind||p.kind===kind)&&(!query||bo(model.fields.map(f=>Xe(f,p[f.key],ws.data)).join(' ')).includes(bo(query)))).map(p=>({rawDistrict:p.district,id:p.id,...Object.fromEntries(fields.map(f=>[f.key,Xe(f,p[f.key],ws.data)]))})),[ws.data,fields,kind,query,model]);
  const metrics=R.useMemo(()=>{
    const all=ws.data.properties, districts=new Map();
    for(const p of all){const name=String(p.district||'').trim().replace(/\s+/g,' '),key=bo(name);if(!key)continue;const item=districts.get(key)||{name,count:0};item.count++;districts.set(key,item);}
    let top;for(const item of districts.values())if(!top||item.count>top.count||(item.count===top.count&&item.name.localeCompare(top.name,'fa')<0))top=item;
    return [['کل املاک',all.length,'M3 21h18M5 21V5l10-2v18M15 10h4v11M8 8h3M8 12h3M8 16h3'],['محله‌های تحت پوشش',districts.size,'M12 22s8-8 8-14a8 8 0 0 0-16 0c0 6 8 14 8 14z M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0'],['محله متمرکز',top?.name||'—','M3 12h18 M12 3v18 M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0']];
  },[ws.data.properties]);
  const summary=h('section',{className:'mp-kpis','aria-label':'خلاصه بانک املاک'},metrics.map(([label,value,path],i)=>h('div',{key:label,...kpi.card(i)},h('i',{style:kpi.icon(i),'aria-hidden':true},h('svg',{viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round'},h('path',{d:path}))),h('strong',null,label),h('b',{title:String(value)},typeof value==='number'?F.format(value):value))));
  const select=(label,value,set,items)=>h('select',{'aria-label':label,value,onChange:e=>set(e.target.value)},items.map(([v,l])=>h('option',{key:v,value:v},l)));
  const toolbar=getRows=>h('div',{className:'tools'},h('label',{className:'search'},h('input',{'aria-label':'جست‌وجوی ملک',placeholder:'جست‌وجو در بانک املاک…',value:query,onChange:e=>Q(e.target.value)})),select('نوع ملک',kind,K,[['','همهٔ انواع ملک'],...Object.entries(choices)]),select('گروه‌بندی',group,G,[['','بدون گروه‌بندی'],['kind','گروه: نوع ملک'],['district','گروه: محله']]),h('button',{onClick:()=>Yi('properties',[fields.map(f=>f.label),...getRows().map(row=>fields.map(f=>{const v=String(row[f.key]??'');return /^\s*[=+@-]/.test(v)?"'"+v:v;}))])},'CSV'),(query||kind||kpi.keys.length)?h('button',{onClick:()=>{Q('');K('');kpi.set([]);}},'پاک‌کردن فیلترها'):null,h('button',{type:'button',className:'primary',onClick:()=>create('properties')},'＋ ثبت ملک'));
  return h('div',{className:'maskan-properties'},summary,h(MaskanDataGrid,{columns,data:data.filter(r=>kpi.accepts(i=>{const d=bo(String(r.rawDistrict||'').trim().replace(/\s+/g,' '));return i===0||!!d&&(i===1||d===bo(metrics[2][1]))})),group,toolbar,label:'بانک املاک',empty:'ملکی برای نمایش وجود ندارد',countLabel:n=>F.format(n)+' ملک',onAction:(_,r)=>{const p=ws.data.properties.find(p=>p.id===r.id);if(p)open('properties',p);}}));
}
