const createMaskanModal = (O) => {
const mmViews=new WeakMap();
function mmScope(entry,all,back){return {entry,all,back}}
function MaskanModal({frame,title,heading,children,size='medium',expand=false,blocked=false,dirty=false,legacy=false,external,session,extra={}} ){
 const R=O.default,h=R.createElement,local=R.useRef(null),ref=external||local,view=R.useMemo(()=>{let v=mmViews.get(frame.entry);if(!v){v={big:false,scroll:[]};mmViews.set(frame.entry,v)}return v},[frame.entry]);const [big,setBig]=R.useState(view.big);
 R.useLayoutEffect(()=>{if(external){setBig(false);return}let el=ref.current;el.showModal();const areas=()=>Array.from(el.querySelectorAll('.mp-body,.mp-scroll,.modal-scroll'));areas().forEach((n,i)=>n.scrollTop=view.scroll[i]||0);const save=()=>{view.scroll=areas().map(n=>n.scrollTop)};el.addEventListener('scroll',save,true);return ()=>{el.removeEventListener('scroll',save,true);el.close()}},[view,session]);
 const leave=fn=>{if(!blocked&&(!dirty||window.confirm('تغییرات ذخیره نشده‌اند. بدون ذخیره خارج می‌شوید؟')))fn()};const btn=(role,label,path,fn,pressed)=>h('button',{type:'button',className:'mm-control','data-action':role,disabled:blocked,title:label,'aria-label':label,'aria-pressed':pressed,onClick:fn},h('svg',{width:19,height:19,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true},h('path',{d:path})));
 return h('dialog',{...extra,ref,dir:'rtl','aria-label':title,className:'mperson mm-shell '+(extra.className||'')+(legacy?' studio-dialog mm-child':'')+(big?' mm-big':''),'data-size':size,onCancel:e=>{e.preventDefault();leave(frame.entry.prev?frame.back:frame.all)}},h('div',{className:'mp-head'},heading||h('h2',null,title),h('div',{className:'mm-controls'},btn('close','بستن','M6 6l12 12M18 6L6 18',()=>leave(frame.all)),frame.entry.prev&&btn('back','بازگشت','M4 12h15m-6-6 6 6-6 6',()=>leave(frame.back)),expand&&btn('resize',big?'اندازهٔ قبلی':'بزرگ‌کردن',big?'M5 10h5V5m9 9h-5v5':'M4 10V4h6m10 10v6h-6',()=>{view.big=!big;setBig(!big)},big))),children)
}
return {MaskanModal,mmScope};
};
