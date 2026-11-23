// Shared view. Keep column definitions and row actions in the calling page.
function MaskanDataGrid({data,group,columns,onAction,toolbar,label,empty,countLabel}) {
  const React=A.default,h=React.createElement,host=React.useRef(null),table=React.useRef(null),built=React.useRef(false),latest=React.useRef(null);
  latest.current={data,group,onAction};
  React.useEffect(()=>{
    const initial=latest.current,compare=new Intl.Collator('fa',{numeric:true});
    const defs=columns.map(c=>c.action?{title:c.title,width:c.width||100,headerSort:false,formatter:cell=>{const b=document.createElement('button');b.type='button';b.className='link';b.textContent=c.caption;b.onclick=()=>latest.current.onAction(c.action,cell.getRow().getData());return b;}}:{title:c.title,field:c.field,minWidth:c.minWidth||125,formatter:cell=>document.createTextNode(String(cell.getValue()??'')),sorter:(a,b)=>compare.compare(a??'',b??'')});
    const t=new globalThis.Tabulator(host.current,{index:'id',textDirection:'rtl',layout:'fitColumns',height:'min(65vh, 650px)',data:initial.data,columns:defs,groupBy:initial.group||false,groupStartOpen:true,placeholder:empty,groupHeader:(v,n)=>{const b=document.createElement('strong');b.textContent=v+' ('+F.format(n)+')';return b;}});
    table.current=t;t.on('tableBuilt',()=>{if(table.current!==t)return;built.current=true;const s=latest.current;if(s.data!==initial.data)t.replaceData(s.data);if(s.group!==initial.group)t.setGroupBy(s.group||false);});
    return ()=>{built.current=false;table.current=null;t.destroy();};
  },[columns,empty]);
  React.useEffect(()=>{if(built.current)table.current.replaceData(data);},[data]);
  React.useEffect(()=>{if(built.current)table.current.setGroupBy(group||false);},[group]);
  return h('section',{className:'panel ledger maskan-grid',dir:'rtl'},toolbar(()=>table.current?.getData('active')??data),h('div',{ref:host,'aria-label':label}),h('div',{className:'pager','aria-live':'polite'},countLabel(data.length)));
}
