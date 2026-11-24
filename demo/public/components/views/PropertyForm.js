function PropertyPointMap({lat,lon,pick,busy}) {
  const h=O.default.createElement, host=O.useRef(null), instance=O.useRef(null), marker=O.useRef(null), action=O.useRef(null);
  const [offline,status]=O.useState(false);
  const point=(a,b)=>String(a??'').trim()!==''&&String(b??'').trim()!==''&&Number.isFinite(+a)&&Number.isFinite(+b)&&Math.abs(+a)<=90&&Math.abs(+b)<=180?[+a,+b]:null;
  action.current=p=>{if(!busy)pick(p.lat.toFixed(6),(((p.lng+180)%360+360)%360-180).toFixed(6))};
  O.useEffect(()=>{const L=window.L;const key=document.querySelector('meta[name="neshan-web-key"]')?.content;if(!L||!key){status(true);return}const initial=point(lat,lon);let m;try{m=new L.Map(host.current,{key,maptype:'dreamy',poi:false,traffic:false,center:initial||[32.4,53.7],zoom:initial?16:5,scrollWheelZoom:false,zoomControl:false});}catch{status(true);return}instance.current=m;
    L.control.zoom({zoomInTitle:'بزرگ‌نمایی',zoomOutTitle:'کوچک‌نمایی'}).addTo(m);
    m.eachLayer(layer=>{layer.on('tileerror',()=>status(true)).on('tileload',()=>status(false))});
    m.on('click',e=>action.current(e.latlng));const obs=new ResizeObserver(()=>m.invalidateSize({pan:false}));obs.observe(host.current);return()=>{obs.disconnect();m.remove();instance.current=null;marker.current=null};},[]);
  O.useEffect(()=>{const m=instance.current,p=point(lat,lon);if(!m)return;if(!p){marker.current?.remove();marker.current=null;return}if(!marker.current){marker.current=window.L.marker(p,{draggable:true,title:'موقعیت ملک',icon:window.L.divIcon({className:'pr-map-pin',iconSize:[18,18],iconAnchor:[9,9]})}).on('dragend',e=>action.current(e.target.getLatLng())).addTo(m)}else marker.current.setLatLng(p);if(busy)marker.current.dragging.disable();else marker.current.dragging.enable();if(!m.getBounds().contains(p))m.panTo(p);},[lat,lon,busy]);
  return h('div',{className:'full pr-map-wrap'},h('p',null,'برای انتخاب موقعیت روی نقشه بزنید. برای اصلاح، نشانگر را بکشید و سپس انتخاب را تأیید کنید.'),h('div',{ref:host,style:{height:'clamp(200px,45dvh,480px)',width:'100%',position:'relative'},className:'pr-point-map',dir:'ltr',role:'region','aria-label':'نقشهٔ انتخاب موقعیت ملک'}),offline&&h('small',{role:'status'},'نقشه کامل بارگیری نشد. کلید وب، دامنهٔ مجاز و اتصال اینترنت را بررسی کنید؛ ورود دستی مختصات همچنان ممکن است.'));
}
function MaskanPropertyForm({frame,row,groups,fields,renderField,address,lat,lon,pick,team,admin,assignee,setAssignee,save,busy,dirty,error}) {
  const h=O.default.createElement;
  const [draft,setDraft]=O.useState(null),entry=O.useMemo(()=>({}),[]);
  const close=()=>setDraft(null);
  function groupField(key){const input=renderField(fields.find(f=>f.key===key));return key!=='address'?[input]:[input,h('button',{type:'button',key:'open-map',disabled:busy,onClick:()=>setDraft({lat,lon,address:address||''})},'انتخاب آدرس روی نقشهٔ نشان')];}
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
    draft&&h(MaskanModal,{frame:{entry,back:close,all:close},title:'انتخاب آدرس روی نقشهٔ نشان',expand:true},
      h('div',{className:'mp-body modal-scroll',style:{padding:'1rem',overflowY:'auto'}},h(PropertyPointMap,{lat:draft.lat,lon:draft.lon,busy:false,pick:(lat,lon)=>setDraft(d=>({...d,lat,lon}))}),h('label',null,'نشانی ملک',h('textarea',{value:draft.address,onChange:e=>setDraft({...draft,address:e.target.value})}))),
      h('footer',{className:'mp-foot'},h('button',{type:'button',className:'primary',disabled:![draft.lat,draft.lon].every(v=>v!=null&&String(v).trim()!==''&&Number.isFinite(+v))||Math.abs(+draft.lat)>90||Math.abs(+draft.lon)>180,onClick:()=>{pick(draft.lat,draft.lon,draft.address);close()}},'تأیید و بازگشت به فرم'),h('button',{type:'button',onClick:close},'انصراف'))),
    h('form',{className:'pr-editor',dir:'rtl',onSubmit:submit,noValidate:true},
      h('nav',{'aria-label':'بخش‌های پروندهٔ ملک'},titles.map((s,i)=>h('button',{type:'button',key:s,disabled:busy,'aria-pressed':i===tab,onClick:()=>setTab(i)},s))),
      h('div',{className:'modal-scroll pr-body',ref:pane},error&&h('p',{role:'alert',className:'error'},error),titles.map((s,i)=>h('section',{key:s,'data-pane':i,hidden:i!==tab,'aria-label':s},i<groups.length?groups[i][2].flatMap(groupField):[...fields.filter(f=>f.type==='long').map(renderField),admin&&h('label',{key:'assignee'},'مسئول پرونده',h('select',{value:assignee,onChange:e=>setAssignee(e.target.value)},team.filter(u=>u.active).map(u=>h('option',{key:u.id,value:u.id},u.name))))]))),
      h('footer',{className:'mp-foot'},h('button',{className:'primary',type:'submit',disabled:busy},busy?'در حال ذخیره…':'ذخیرهٔ ملک'),null)));
}
