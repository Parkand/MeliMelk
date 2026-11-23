function MaskanPropertyForm({frame,row,groups,fields,renderField,team,admin,assignee,setAssignee,save,busy,dirty,error}) {
  const h=O.default.createElement;
  const section=(title,children)=>h('section',{key:title,className:'ms-card'},h('h3',null,title),h('div',{className:'form-grid'},children));
  return h(MaskanModal,{frame,title:row?'ویرایش شناسنامهٔ ملک':'ثبت ملک',expand:true,size:'wide',dirty,blocked:busy},
    h('form',{dir:'rtl',onSubmit:save,className:'te-form'},h('div',{className:'modal-scroll ms-sections'},
      ...groups.map(([title,,keys])=>section(title,keys.map(k=>renderField(fields.find(f=>f.key===k))))),
      section('توضیحات و مسئول پرونده',[...fields.filter(f=>f.type==='long').map(renderField),admin&&h('label',{key:'assignee'},'مسئول پرونده',h('select',{value:assignee,onChange:e=>setAssignee(e.target.value)},team.filter(u=>u.active).map(u=>h('option',{key:u.id,value:u.id},u.name))))]),
      error&&h('p',{role:'alert',className:'error'},error)),h('footer',{className:'mp-foot'},h('button',{className:'primary',type:'submit',disabled:busy},busy?'در حال ذخیره…':'ذخیرهٔ ملک'))));
}
