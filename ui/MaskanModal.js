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
globalThis.maskanFeedback=async(setInline,message,kind='error')=>{
 const owner=document.activeElement?.closest('dialog.mm-shell[open]');
 setInline(message);
 if(message&&owner){await new Promise(resolve=>setTimeout(resolve,0));if(!owner.isConnected||[...owner.querySelectorAll('[role=alert],[role=status],.error')].some(n=>n.closest('dialog')===owner&&n.textContent.includes(message)))return}
 if(message)return maskanMessage({kind,message,...(kind==='error'?{action:'متوجه شدم',cancel:''}:{})});
};
// Mirror declarative feedback into one stable action bar. Keep nested dialogs independent.
function attachFooterMessages(dialog){
 if(!dialog)return;
 const own=n=>n.closest('dialog')===dialog;
 const bar=document.createElement('aside'),fallback=document.createElement('footer');
 bar.className='mm-notice';bar.dir='rtl';fallback.className='mp-foot mm-notice-fallback';
 let items=[],index=0,fieldErrors=[],sources=[],host;
 function part(tag,text,label){const n=document.createElement(tag);n.textContent=text;if(label){n.type='button';n.title=label;n.setAttribute('aria-label',label)}bar.append(n);return n}
 const preview=part('span','');preview.setAttribute('role','status');preview.className='mm-preview';
 const detail=part('button','…','نمایش متن کامل پیام'),prev=part('button','‹','پیام قبلی'),count=part('small',''),next=part('button','›','پیام بعدی');
 detail.onclick=()=>maskanMessage({kind:'info',title:'متن کامل پیام',message:items[index],action:'بستن',cancel:''});
 const digits=new Intl.NumberFormat('fa-IR');
 function paint(){preview.textContent=items[index]||'';count.textContent=digits.format(index+1)+' از '+digits.format(items.length);prev.hidden=next.hidden=count.hidden=items.length<2;bar.hidden=!items.length}
 prev.onclick=()=>{index=(index+items.length-1)%items.length;paint()};next.onclick=()=>{index=(index+1)%items.length;paint()};
 function sync(){observer.disconnect();const nodes=[...dialog.querySelectorAll('[role=alert],[role=status],.error,.notice')].filter(n=>own(n)&&!bar.contains(n)&&!n.closest('[hidden]')&&!n.matches('.mm-refresh-status:has(.mm-refresh-dots)'));
 sources.filter(n=>!nodes.includes(n)).forEach(n=>n.removeAttribute('data-mm-source'));sources=nodes;nodes.forEach(n=>n.setAttribute('data-mm-source',''));
 const texts=nodes.flatMap(n=>n.matches('.ce-errors')?[...n.children].map(c=>c.textContent):[n.textContent]);const old=items[index];items=[...new Set([...fieldErrors,...texts].map(t=>t.trim()).filter(Boolean))];index=Math.max(0,items.indexOf(old));
 const foot=[...dialog.querySelectorAll('footer,.mp-foot')].filter(n=>own(n)&&n!==fallback&&!n.closest('.mp-body,.modal-scroll,[hidden]')).at(-1)||fallback;
 if(host!==foot){host?.classList.remove('mm-notice-host');host=foot}if(foot===fallback){if(!fallback.parentNode)dialog.append(fallback)}else fallback.remove();host.classList.add('mm-notice-host');if(bar.parentNode!==host)host.prepend(bar);paint();observer.observe(dialog,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['hidden','open']})}
 function invalid(e){if(!own(e.target))return;e.preventDefault();const label=e.target.labels?.[0]?.textContent.trim().slice(0,80);fieldErrors.push((label?label+' — ':'')+e.target.validationMessage);sync()}
 function clear(e){if(own(e.target)&&fieldErrors.length){fieldErrors=[];sync()}}
 const observer=new MutationObserver(sync);dialog.addEventListener('invalid',invalid,true);dialog.addEventListener('input',clear,true);sync();return ()=>{observer.disconnect();dialog.removeEventListener('invalid',invalid,true);dialog.removeEventListener('input',clear,true);sources.forEach(n=>n.removeAttribute('data-mm-source'));bar.remove();fallback.remove();host?.classList.remove('mm-notice-host')}
}

const createMaskanModal = (O) => {
const refreshContext=O.default.createContext(null);
function refreshStatus(R,error){return R.createElement('span',{className:'mm-refresh-status',role:error?'alert':'status'},error||'در حال بازخوانی',!error&&R.createElement('span',{className:'mm-refresh-dots','aria-hidden':true},...[0,1,2].map(i=>R.createElement('i',{key:i,style:{animationDelay:(i*.13)+'s'}}))))}
const mmViews=new WeakMap();
function mmScope(entry,all,back){return {entry,all,back}}
function MaskanModal({frame,title,heading,children,size='wide',expand=false,blocked=false,dirty=false,legacy=false,external,session,extra={}} ){
 const R=O.default,h=R.createElement,local=R.useRef(null),ref=external||local,view=R.useMemo(()=>{let v=mmViews.get(frame.entry);if(!v){v={big:false,scroll:[]};mmViews.set(frame.entry,v)}return v},[frame.entry]);const [big,setBig]=R.useState(view.big);
 R.useLayoutEffect(()=>{if(external){setBig(false);return}let el=ref.current;el.showModal();const areas=()=>Array.from(el.querySelectorAll('.mp-body,.mp-scroll,.modal-scroll'));areas().forEach((n,i)=>n.scrollTop=view.scroll[i]||0);const save=()=>{view.scroll=areas().map(n=>n.scrollTop)};el.addEventListener('scroll',save,true);return ()=>{el.removeEventListener('scroll',save,true);el.close()}},[view,session]);
 R.useLayoutEffect(()=>attachFooterMessages(ref.current),[ref,view,session]);
 const api=R.useContext(refreshContext),[feedback,setFeedback]=R.useState(null),lock=R.useRef(false);
 async function reload(){if(blocked||lock.current||!api)return;if(dirty&&!await maskanMessage({kind:'confirm',message:'تغییرات ذخیره نشده‌اند. بازخوانی شود؟'}))return;lock.current=true;setFeedback('busy');try{await api();setFeedback(null)}catch(error){setFeedback(error.message||'ارتباط با سرور برقرار نشد.')}finally{lock.current=false}}
 const leave=async fn=>{if(!lock.current&&!blocked&&(!dirty||await maskanMessage({kind:'confirm',title:'خروج بدون ذخیره؟',message:'تغییرات این فرم ذخیره نشده‌اند.'})))fn()};const btn=(role,label,path,fn,pressed)=>h('button',{type:'button',className:'mm-control','data-action':role,disabled:blocked,title:label,'aria-label':label,'aria-pressed':pressed,onClick:fn},h('svg',{width:19,height:19,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true},h('path',{d:path})));
 return h('dialog',{...extra,ref,...(feedback==='busy'?{inert:''}:{}),dir:'rtl','aria-label':title,className:'mperson mm-shell '+(extra.className||'')+(legacy?' studio-dialog mm-child':'')+(big?' mm-big':''),'data-size':size==='calendar'?'calendar':'wide',onCancel:e=>{e.preventDefault();leave(frame.entry.prev?frame.back:frame.all)}},h('div',{className:'mp-head'},heading||h('h2',null,title),h('div',{className:'mm-controls'},feedback&&refreshStatus(R,feedback==='busy'?null:feedback),api&&btn('refresh',feedback&&feedback!=='busy'?'تلاش دوباره':'بازخوانی','M20 7v5h-5 M20 12a8 8 0 1 0-2 5',reload),btn('close','بستن','M6 6l12 12M18 6L6 18',()=>leave(frame.all)),frame.entry.prev&&btn('back','بازگشت','M4 12h15m-6-6 6 6-6 6',()=>leave(frame.back)),expand&&btn('resize',big?'اندازهٔ قبلی':'بزرگ‌کردن',big?'M5 10h5V5m9 9h-5v5':'M4 10V4h6m10 10v6h-6',()=>{view.big=!big;setBig(!big)},big))),children)
}
MaskanModal.RefreshContext=refreshContext;
MaskanModal.refreshStatus=refreshStatus;
return {MaskanModal,mmScope};
};

globalThis.createMaskanModal=createMaskanModal;
