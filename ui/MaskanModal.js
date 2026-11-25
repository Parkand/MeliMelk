globalThis.maskanMessage=(()=>{
 const presets={
   confirm:['تأیید عملیات','تأیید','انصراف','!'],
   success:['عملیات موفق','تأیید','','✓'],
   error:['خطا','تلاش مجدد','انصراف','×'],
   validation:['اطلاعات ناقص است','بازگشت به فرم','','!'],
   info:['پیام سیستم','متوجه شدم','','i'],
   danger:['تأیید حذف','حذف','انصراف','!']
 };
 let queue=Promise.resolve();
 function open(options){return new Promise(resolve=>{
   const {kind='info',message='',title,action,cancel}=options, defaults=presets[kind]||presets.info;
   const dialog=document.createElement('dialog');
   const element=(tag,value,parent)=>{const node=document.createElement(tag);node.textContent=value;parent.append(node);return node};
   dialog.className='mm-message';dialog.dataset.kind=kind;dialog.dir='rtl';
   dialog.setAttribute('role','alertdialog');dialog.setAttribute('aria-labelledby','mm-message-title');dialog.setAttribute('aria-describedby','mm-message-body');
   const heading=element('header','',dialog),icon=element('span',defaults[3],heading);
   icon.setAttribute('aria-hidden','true');element('h2',title||defaults[0],heading).id='mm-message-title';
   element('p',message,dialog).id='mm-message-body';
   const footer=element('footer','',dialog);
   function button(label,value){const node=element('button',label,footer);node.type='button';node.onclick=()=>dialog.close(value);return node}
   const primary=button(action||defaults[1],'yes');primary.className='mm-primary';
   const secondary=cancel??defaults[2],safe=secondary?button(secondary,'no'):primary;
   safe.autofocus=true;dialog.onclose=()=>{dialog.remove();resolve(dialog.returnValue==='yes')};
   document.body.append(dialog);dialog.showModal();safe.focus();
 })}
 return options=>{const result=queue.then(()=>open(options));queue=result.catch(()=>{});return result};
})();
const createMaskanModal = (O) => {
const refreshContext=O.default.createContext(null);
function refreshStatus(R,error){return R.createElement('span',{className:'mm-refresh-status',role:error?'alert':'status'},error||'در حال بازخوانی',!error&&R.createElement('span',{className:'mm-refresh-dots','aria-hidden':true},...[0,1,2].map(i=>R.createElement('i',{key:i,style:{animationDelay:(i*.13)+'s'}}))))}
const mmViews=new WeakMap();
function mmScope(entry,all,back){return {entry,all,back}}
function MaskanModal({frame,title,heading,children,size='wide',expand=false,blocked=false,dirty=false,legacy=false,external,session,extra={}} ){
 const R=O.default,h=R.createElement,local=R.useRef(null),ref=external||local,view=R.useMemo(()=>{let v=mmViews.get(frame.entry);if(!v){v={big:false,scroll:[]};mmViews.set(frame.entry,v)}return v},[frame.entry]);const [big,setBig]=R.useState(view.big);
 R.useLayoutEffect(()=>{if(external){setBig(false);return}let el=ref.current;el.showModal();const areas=()=>Array.from(el.querySelectorAll('.mp-body,.mp-scroll,.modal-scroll'));areas().forEach((n,i)=>n.scrollTop=view.scroll[i]||0);const save=()=>{view.scroll=areas().map(n=>n.scrollTop)};el.addEventListener('scroll',save,true);return ()=>{el.removeEventListener('scroll',save,true);el.close()}},[view,session]);
 const api=R.useContext(refreshContext),[feedback,setFeedback]=R.useState(null),lock=R.useRef(false);
 async function reload(){if(blocked||lock.current||!api)return;if(dirty&&!await maskanMessage({kind:'confirm',message:'تغییرات ذخیره نشده‌اند. بازخوانی شود؟'}))return;lock.current=true;try{for(;;){setFeedback('busy');try{await api();break}catch(error){setFeedback(null);if(!await maskanMessage({kind:'error',title:'بازخوانی ناموفق بود',message:error.message||'ارتباط با سرور برقرار نشد.'}))break}}}finally{setFeedback(null);lock.current=false}}
 const leave=async fn=>{if(!lock.current&&!blocked&&(!dirty||await maskanMessage({kind:'confirm',title:'خروج بدون ذخیره؟',message:'تغییرات این فرم ذخیره نشده‌اند.'})))fn()};const btn=(role,label,path,fn,pressed)=>h('button',{type:'button',className:'mm-control','data-action':role,disabled:blocked,title:label,'aria-label':label,'aria-pressed':pressed,onClick:fn},h('svg',{width:19,height:19,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true},h('path',{d:path})));
 return h('dialog',{...extra,ref,...(feedback==='busy'?{inert:''}:{}),dir:'rtl','aria-label':title,className:'mperson mm-shell '+(extra.className||'')+(legacy?' studio-dialog mm-child':'')+(big?' mm-big':''),'data-size':size==='calendar'?'calendar':'wide',onCancel:e=>{e.preventDefault();leave(frame.entry.prev?frame.back:frame.all)}},h('div',{className:'mp-head'},heading||h('h2',null,title),h('div',{className:'mm-controls'},feedback&&refreshStatus(R,feedback==='busy'?null:feedback),api&&btn('refresh',feedback&&feedback!=='busy'?'تلاش دوباره':'بازخوانی','M20 7v5h-5 M20 12a8 8 0 1 0-2 5',reload),btn('close','بستن','M6 6l12 12M18 6L6 18',()=>leave(frame.all)),frame.entry.prev&&btn('back','بازگشت','M4 12h15m-6-6 6 6-6 6',()=>leave(frame.back)),expand&&btn('resize',big?'اندازهٔ قبلی':'بزرگ‌کردن',big?'M5 10h5V5m9 9h-5v5':'M4 10V4h6m10 10v6h-6',()=>{view.big=!big;setBig(!big)},big))),children)
}
MaskanModal.RefreshContext=refreshContext;
MaskanModal.refreshStatus=refreshStatus;
return {MaskanModal,mmScope};
};

globalThis.createMaskanModal=createMaskanModal;
