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
  const section=(title,children)=>h('section',{key:title,className:'ms-card'},h('h3',null,title),h('div',{className:'form-grid'},children));
  return h(MaskanModal,{frame,title:row?'ویرایش شناسنامهٔ ملک':'ثبت ملک',expand:true,size:'wide',dirty,blocked:busy},
    h('form',{dir:'rtl',onSubmit:save,className:'te-form'},h('div',{className:'modal-scroll ms-sections'},
      ...groups.map(([title,,keys])=>section(title,keys.flatMap(groupField))),
      section('توضیحات و مسئول پرونده',[...fields.filter(f=>f.type==='long').map(renderField),admin&&h('label',{key:'assignee'},'مسئول پرونده',h('select',{value:assignee,onChange:e=>setAssignee(e.target.value)},team.filter(u=>u.active).map(u=>h('option',{key:u.id,value:u.id},u.name))))]),
      error&&h('p',{role:'alert',className:'error'},error)),h('footer',{className:'mp-foot'},h('button',{className:'primary',type:'submit',disabled:busy},busy?'در حال ذخیره…':'ذخیرهٔ ملک'))));
}
