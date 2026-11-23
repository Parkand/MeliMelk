function MaskanPropertyForm({frame,row,groups,fields,renderField,district,team,admin,assignee,setAssignee,save,busy,dirty,error}) {
  const h=O.default.createElement;
  const [city,setCity]=O.useState('');
  const clean=value=>String(value??'').trim().replace(/\s+/g,' ');
  const neighborhood=clean(district), query=[...new Set([neighborhood,clean(city)].filter(Boolean))].join('، ');
  function groupField(key){
    const input=renderField(fields.find(f=>f.key===key));
    if(key!=='district') return [input];
    return [input,
      h('label',{key:'map-city'},'شهر (اختیاری، فقط برای نقشه)',h('input',{type:'text',value:city,maxLength:120,disabled:busy,onChange:e=>setCity(e.target.value)})),
      h('div',{key:'district-search'},h('button',{type:'button',disabled:busy||!neighborhood,onClick:()=>window.open('https://www.openstreetmap.org/search?query='+encodeURIComponent(query),'_blank','noopener,noreferrer')},'جست‌وجو روی نقشه'),
        h('small',{style:{display:'block'}},neighborhood?'جست‌وجو در OpenStreetMap: '+query:'برای جست‌وجو، نام محله را وارد کنید.'))];
  }
  const [tab,setTab]=O.useState(0);
  const pane=O.useRef(null);
  const titles=[...groups.map(g=>g[0]),'توضیحات و مسئول پرونده'];
  const title=row?'ویرایش شناسنامهٔ ملک':'ثبت ملک';
  function submit(event){
    event.preventDefault();
    const invalid=Array.from(event.currentTarget.elements).find(el=>el.willValidate&&!el.validity.valid);
    if(invalid){setTab(Number(invalid.closest('[data-pane]').dataset.pane));requestAnimationFrame(()=>{invalid.focus();invalid.reportValidity()});return}
    return save(event);
  }
  O.useEffect(()=>{if(pane.current)pane.current.scrollTop=0},[tab]);
  return h(MaskanModal,{frame,title,heading:h('div',{className:'pr-identity'},h(j,{name:'properties'}),h('div',null,h('strong',null,title),h('small',null,row?.title||'پروندهٔ جدید ملک'))),expand:true,size:'wide',dirty,blocked:busy,extra:{className:'pr-shell'}},
    h('form',{className:'pr-editor',dir:'rtl',onSubmit:submit,noValidate:true},
      h('nav',{'aria-label':'بخش‌های پروندهٔ ملک'},titles.map((s,i)=>h('button',{type:'button',key:s,disabled:busy,'aria-pressed':i===tab,onClick:()=>setTab(i)},s))),
      h('div',{className:'modal-scroll pr-body',ref:pane},titles.map((s,i)=>h('section',{key:s,'data-pane':i,hidden:i!==tab,'aria-label':s},i<groups.length?groups[i][2].flatMap(groupField):[...fields.filter(f=>f.type==='long').map(renderField),admin&&h('label',{key:'assignee'},'مسئول پرونده',h('select',{value:assignee,onChange:e=>setAssignee(e.target.value)},team.filter(u=>u.active).map(u=>h('option',{key:u.id,value:u.id},u.name))))]))),
      h('footer',{className:'mp-foot'},h('button',{className:'primary',type:'submit',disabled:busy},busy?'در حال ذخیره…':'ذخیرهٔ ملک'),error&&h('p',{role:'alert',className:'error'},error))));
}
