function Jb({ k: t, ws: e, open: l, create: a }) {
  return t === "properties" ? A.default.createElement(MaskanProperties,{ws:e,open:l,create:a}) : A.default.createElement(MaskanOtherRecords,{k:t,ws:e,open:l,create:a});
}
function MaskanOtherRecords({ k: t, ws: e, open: l, create: a }) {
  let n = ne[t],
    i = e.data,
    [s, o] = (0, A.useState)(""),
    [u, r] = (0, A.useState)(""),
    [c, h] = (0, A.useState)(0),
    f =
      n.fields.find((g) => g.key === "status" || g.key === "stage") ??
      n.fields.find((g) => g.choices),
    d = n.columns.map((g) => n.fields.find((m) => m.key === g)),
    y = i[t].filter(
      (g) =>
        (!u || ['deals','tasks','visits'].includes(t) || g[f?.key] === u) &&
        (!s ||
          bo(
            n.fields.map((m) => Xe(m, g[m.key], i)).join(" ") +
              " " +
              (e.team.find((m) => m.id === g.assignee)?.name ?? ""),
          ).includes(bo(s))),
    ),
    v = Math.max(1, Math.ceil(y.length / 25)),
    b = Math.min(c, v - 1),
    p = (g, m) => g.reduce((_, x) => _ + BigInt(x[m]), 0n);
  if(t === 'deals') return A.default.createElement(DealListGrid,{db:i,rows:y,fields:d,status:f,query:s,filter:u,setQuery:o,setFilter:r,open:l,create:a});
  if(t === 'visits') return A.default.createElement(VisitListGrid,{db:i,rows:y,fields:d,status:f,query:s,filter:u,setQuery:o,setFilter:r,open:l,create:a});
  if(t === 'tasks') return A.default.createElement(TaskListGrid,{db:i,rows:y,fields:d,status:f,query:s,filter:u,setQuery:o,setFilter:r,open:l,create:a});
  if(t === "demands") return A.default.createElement(DemandGrid,{db:i,rows:y,fields:d,query:s,filter:u,setQuery:o,setFilter:r,open:l,create:a});
  return t === "contacts"
    ? A.default.createElement(MaskanContacts, { ws: e, open: l, create: a })
    : t === "listings"
      ? A.default.createElement(am, {
          b: i,
          rows: y,
          fields: d,
          selector: f,
          query: s,
          filter: u,
          idx: b,
          pages: v,
          open: l,
          create: a,
          onQuery: (g) => {
            (o(g), h(0));
          },
          onFilter: (g) => {
            (r(g), h(0));
          },
          onPage: h,
        })
      : A.default.createElement(
          A.default.Fragment,
          null,
          t !== "tasks" &&
            A.default.createElement(
              "div",
              { className: "page-title" },
              A.default.createElement(
                "div",
                null,
                A.default.createElement(
                  "small",
                  null,
                  "\u0639\u0645\u0644\u06CC\u0627\u062A \u062F\u0641\u062A\u0631 / \u0641\u0647\u0631\u0633\u062A",
                ),
                A.default.createElement("h1", null, n.label),
              ),
            ),
          A.default.createElement(
            "button",
            { className: "primary desk-create-fab", onClick: () => a(t) },
            A.default.createElement(j, { name: "plus" }),
            "\u062B\u0628\u062A ",
            n.single,
          ),
          ["contracts", "payments"].includes(t) &&
            A.default.createElement(
              "div",
              { className: "finance" },
              [
                [
                  "\u06A9\u0645\u06CC\u0633\u06CC\u0648\u0646 \u062A\u0648\u0627\u0641\u0642\u200C\u0634\u062F\u0647",
                  p(i.contracts, "commission"),
                ],
                [
                  "\u0648\u0635\u0648\u0644\u200C\u0634\u062F\u0647",
                  p(i.payments, "amount"),
                ],
                [
                  "\u0645\u0627\u0646\u062F\u0647 \u0648\u0635\u0648\u0644",
                  p(i.contracts, "commission") - p(i.payments, "amount"),
                ],
              ].map(([g, m]) =>
                A.default.createElement(
                  "div",
                  { key: g },
                  A.default.createElement("small", null, g),
                  A.default.createElement(
                    "b",
                    null,
                    F.format(m),
                    " ",
                    A.default.createElement(
                      "small",
                      null,
                      "\u062A\u0648\u0645\u0627\u0646",
                    ),
                  ),
                ),
              ),
            ),
          A.default.createElement(
            "div",
            { className: "panel ledger" },
            t === "tasks" &&
              A.default.createElement(
                "header",
                { className: "task-head" },
                A.default.createElement(j, { name: "tasks" }),
                A.default.createElement(
                  "strong",
                  null,
                  "\u0641\u0647\u0631\u0633\u062A \u067E\u06CC\u06AF\u06CC\u0631\u06CC\u200C\u0647\u0627",
                ),
              ),
            A.default.createElement(
              "div",
              { className: "tools" },
              A.default.createElement(
                "label",
                { className: "search" },
                A.default.createElement(j, { name: "search" }),
                A.default.createElement("input", {
                  "aria-label": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648",
                  placeholder:
                    "\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u062F\u0631 \u0627\u06CC\u0646 \u0641\u0647\u0631\u0633\u062A\u2026",
                  value: s,
                  onChange: (g) => {
                    (o(g.target.value), h(0));
                  },
                }),
              ),
              f &&
                A.default.createElement(
                  "select",
                  {
                    "aria-label": "\u0641\u06CC\u0644\u062A\u0631",
                    value: u,
                    onChange: (g) => {
                      (r(g.target.value), h(0));
                    },
                  },
                  A.default.createElement(
                    "option",
                    { value: "" },
                    "\u0647\u0645\u0647\u0654 ",
                    f.label,
                  ),
                  Object.entries(f.choices).map(([g, m]) =>
                    A.default.createElement("option", { key: g, value: g }, m),
                  ),
                ),
              A.default.createElement(
                "button",
                {
                  onClick: () =>
                    Yi(n.key, [
                      d.map(
                        (g) =>
                          g.label +
                          (g.type === "money"
                            ? " (\u062A\u0648\u0645\u0627\u0646)"
                            : ""),
                      ),
                      ...y.map((g) => d.map((m) => Xe(m, g[m.key], i))),
                    ]),
                },
                A.default.createElement(j, { name: "down", size: 16 }),
                " CSV",
              ),
            ),
            A.default.createElement(
              "div",
              { className: "scroll" },
              A.default.createElement(
                "table",
                { className: "desk-grid" },
                A.default.createElement(
                  "thead",
                  null,
                  A.default.createElement(
                    "tr",
                    null,
                    d.map((g) =>
                      A.default.createElement(
                        "th",
                        { key: g.key },
                        g.label,
                        g.type === "money"
                          ? " (\u062A\u0648\u0645\u0627\u0646)"
                          : "",
                      ),
                    ),
                    A.default.createElement(
                      "th",
                      null,
                      "\u067E\u0631\u0648\u0646\u062F\u0647",
                    ),
                  ),
                ),
                A.default.createElement(
                  "tbody",
                  null,
                  y.slice(b * 25, (b + 1) * 25).map((g) =>
                    A.default.createElement(
                      "tr",
                      { key: g.id },
                      d.map((m, _) =>
                        A.default.createElement(
                          "td",
                          { key: m.key },
                          _ === 0
                            ? A.default.createElement(Gi, {
                                kind: t,
                                title: Xe(m, g[m.key], i),
                                onClick: () => l(t, g),
                              })
                            : m.choices
                              ? A.default.createElement(
                                  "span",
                                  { className: "pill p-" + g[m.key] },
                                  Xe(m, g[m.key], i),
                                )
                              : Xe(m, g[m.key], i),
                        ),
                      ),
                      A.default.createElement(
                        "td",
                        null,
                        A.default.createElement(
                          "button",
                          { className: "link", onClick: () => l(t, g) },
                          "\u062C\u0632\u0626\u06CC\u0627\u062A ",
                          A.default.createElement(j, {
                            name: "arrow",
                            size: 14,
                          }),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            !y.length &&
              A.default.createElement(
                re,
                null,
                i[t].length
                  ? "\u0645\u0648\u0631\u062F\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F."
                  : "\u0647\u0646\u0648\u0632 \u0631\u06A9\u0648\u0631\u062F\u06CC \u0646\u062F\u0627\u0631\u06CC\u062F\u061B \u0627\u0632 \u062F\u06A9\u0645\u0647\u0654 \u062B\u0628\u062A \u0634\u0631\u0648\u0639 \u06A9\u0646\u06CC\u062F.",
              ),
            A.default.createElement(
              "div",
              { className: "pager" },
              A.default.createElement(
                "span",
                null,
                F.format(y.length),
                " \u0645\u0648\u0631\u062F \xB7 \u0635\u0641\u062D\u0647 ",
                F.format(b + 1),
                " \u0627\u0632 ",
                F.format(v),
              ),
              A.default.createElement(
                "button",
                { disabled: !b, onClick: () => h(b - 1) },
                "\u0642\u0628\u0644\u06CC",
              ),
              A.default.createElement(
                "button",
                { disabled: b + 1 >= v, onClick: () => h(b + 1) },
                "\u0628\u0639\u062F\u06CC",
              ),
            ),
          ),
        );
}

function DealListGrid({db,rows,fields,status,query,setQuery,open,create}) {
  const R=A.default,E=R.createElement,[group,setGroup]=R.useState(''),fmt=new Intl.NumberFormat('fa-IR');
  const states=Object.entries(status.choices),counts=new Map();
  const [selected,setSelected]=R.useState([]);
  const toggle=k=>setSelected(prev=>prev.includes(k)?prev.filter(v=>v!==k):[...prev,k]);
  if(selected.length) rows=rows.filter(r=>selected.includes(r.stage));
  for(const row of db.deals) counts.set(row.stage,1+(counts.get(row.stage)||0));
  const columns=R.useMemo(()=>[...fields.map(f=>({field:f.key,title:f.label})),{action:'details',title:'پرونده',caption:'جزئیات'}],[]);
  const data=rows.map(record=>({...Object.fromEntries(fields.map(f=>[f.key,Xe(f,record[f.key],db)])),id:record.id,record}));
  const cards=E('section',{className:'mc-kpis',style:{gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,9rem),1fr))'},'aria-label':'تعداد پرونده‌ها به تفکیک مرحله'},states.map(([key,label])=>E('div',{key,role:'button',tabIndex:0,'aria-pressed':selected.includes(key),style:{cursor:'pointer'},onClick:()=>toggle(key),onKeyDown:e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(!e.repeat)toggle(key)}}},E('span',{className:'mc-k-icon','aria-hidden':true,style:selected.includes(key)?{outline:'2px solid var(--accent,currentColor)',outlineOffset:'2px'}:undefined},E(j,{name:'deals'})),E('small',null,label),E('strong',null,fmt.format(counts.get(key)||0)+' پرونده'))));
  const options=items=>items.map(([value,label])=>E('option',{key:value,value},label));
  const toolbar=getRows=>E('div',{className:'tools'},E('label',{className:'search'},E('input',{type:'search',value:query,placeholder:'جست‌وجو در پرونده‌ها…','aria-label':'جست‌وجوی پرونده',onChange:e=>setQuery(e.target.value)})),E('select',{value:selected.length>1?'multiple':selected[0]||'','aria-label':'مرحلهٔ معامله',onChange:e=>setSelected(e.target.value?[e.target.value]:[])},selected.length>1?E('option',{value:'multiple',disabled:true},fmt.format(selected.length)+' مرحله انتخاب شده'):null,options([['','همهٔ مراحل'],...states])),E('select',{value:group,'aria-label':'گروه‌بندی',onChange:e=>setGroup(e.target.value)},options([['','بدون گروه‌بندی'],['stage','گروه: مرحله']])),E('button',{onClick:()=>Yi('deals',[fields.map(f=>f.label),...getRows().map(row=>fields.map(f=>/^\s*[=+@-]/.test(row[f.key])?"'"+row[f.key]:row[f.key]))])},'CSV'),(query||selected.length||group)?E('button',{onClick:()=>{setQuery('');setSelected([]);setGroup('')}},'پاک‌کردن فیلترها'):null,E('button',{className:'primary',onClick:()=>create('deals')},'＋ ثبت پرونده'));
  return E('section',{className:'lf lf-grid-page demand-page'},cards,E(MaskanDataGrid,{columns,data,toolbar,group,label:'فهرست پرونده‌های معامله',empty:'پرونده‌ای برای نمایش نیست',countLabel:n=>fmt.format(n)+' پرونده',onAction:(_,r)=>open('deals',r.record)}));
}

function VisitListGrid({db,rows,fields,status,query,filter,setQuery,setFilter,open,create}) {
  const E=A.default.createElement, fmt=new Intl.NumberFormat('fa-IR');
  const states=Object.entries(status.choices), counts=new Map();
  for(const row of rows) counts.set(row[status.key],(counts.get(row[status.key])||0)+1);
  const kpi=MaskanDataGrid.useKpi();
  const columns=A.default.useMemo(()=>[...fields.map(f=>({field:f.key,title:f.label})),{action:'details',title:'پرونده',caption:'جزئیات'}],[]);
  const data=rows.filter(r=>kpi.accepts(k=>k===r[status.key])).map(record=>({...Object.fromEntries(fields.map(f=>[f.key,Xe(f,record[f.key],db)])),id:record.id,record}));
  const summary=E('section',{className:'mc-kpis',style:{gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,9rem),1fr))'},'aria-label':'تعداد بازدیدها بر اساس وضعیت'},states.map(([key,title])=>E('div',{key,...kpi.card(key)},E('span',{style:kpi.icon(key),className:'mc-k-icon','aria-hidden':true},E(j,{name:'visits'})),E('small',null,title),E('strong',null,fmt.format(counts.get(key)||0)+' بازدید'))));
  const toolbar=get=>E('div',{className:'tools',dir:'rtl'},E('input',{type:'search',style:{flex:'1 1 12rem',minWidth:0},value:query,placeholder:'جست‌وجو در بازدیدها…','aria-label':'جست‌وجوی بازدید',onChange:e=>setQuery(e.target.value)}),E('select',{value:kpi.keys.length>1?'@':kpi.keys[0]||'','aria-label':'وضعیت بازدید',onChange:e=>kpi.set(e.target.value?[e.target.value]:[])},kpi.keys.length>1?E('option',{value:'@',disabled:true},fmt.format(kpi.keys.length)+' وضعیت انتخاب شده'):null,E('option',{value:''},'همهٔ وضعیت‌ها'),states.map(([key,title])=>E('option',{key,value:key},title))),E('button',{onClick:()=>Yi('visits',[fields.map(f=>f.label),...get().map(row=>fields.map(f=>/^\s*[=+@-]/.test(row[f.key])?"'"+row[f.key]:row[f.key]))])},'CSV'),E('button',{className:'primary',onClick:()=>create('visits')},'＋ ثبت بازدید'));
  return E('section',{className:'lf lf-grid-page demand-page'},summary,E(MaskanDataGrid,{columns,data,toolbar,label:'برنامهٔ بازدید',empty:'بازدیدی برای نمایش نیست',countLabel:n=>fmt.format(n)+' بازدید',onAction:(_,row)=>open('visits',row.record)}));
}

function TaskListGrid({db,rows,fields,status,query,filter,setQuery,setFilter,open,create}) {
  const E=A.default.createElement, fmt=new Intl.NumberFormat('fa-IR');
  const kpi=MaskanDataGrid.useKpi();
  const columns=A.default.useMemo(()=>[...fields.map(f=>({field:f.key,title:f.label})),{action:'details',title:'پرونده',caption:'جزئیات'}],[]);
  const data=rows.filter(r=>kpi.accepts(k=>k===r[status.key])).map(record=>({...Object.fromEntries(fields.map(f=>[f.key,Xe(f,record[f.key],db)])),id:record.id,record}));
  const toolbar=get=>E('div',{className:'tools'},E('input',{className:'demand-search',value:query,placeholder:'جست‌وجو در پیگیری‌ها…','aria-label':'جست‌وجوی وظیفه',onChange:e=>setQuery(e.target.value)}),E('select',{value:kpi.keys.length>1?'@':kpi.keys[0]||'','aria-label':'وضعیت وظیفه',onChange:e=>kpi.set(e.target.value?[e.target.value]:[])},kpi.keys.length>1?E('option',{value:'@',disabled:true},fmt.format(kpi.keys.length)+' وضعیت انتخاب شده'):null,E('option',{value:''},'همهٔ وضعیت‌ها'),Object.entries(status.choices).map(([value,title])=>E('option',{key:value,value},title))),E('button',{onClick:()=>Yi('tasks',[fields.map(f=>f.label),...get().map(row=>fields.map(f=>/^\s*[=+@-]/.test(row[f.key])?"'"+row[f.key]:row[f.key]))])},'خروجی CSV'),E('button',{className:'primary',onClick:()=>create('tasks')},'＋ ثبت وظیفه'));
  return E('section',{className:'lf lf-grid-page demand-page'},E('section',{className:'mc-kpis',style:{gridTemplateColumns:'repeat(5,minmax(0,1fr))'},'aria-label':'خلاصهٔ نتایج پیگیری'},Object.entries(status.choices).map(([value,label],i)=>E('div',{key:value,...kpi.card(value)},E('span',{style:kpi.icon(value),className:'mc-k-icon','aria-hidden':true},E('svg',{viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round'},E('path',{d:['M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18 M12 7v5l3 2','M4 5h16v12H9l-5 4z','M5 12l4 4L20 5','M6 5h12 M6 19h12 M8 5v3l8 8v3 M16 5v3l-8 8v3','M5 6h14v14H5z M9 3v5 M15 3v5'][i%5]}))),E('small',null,label),E('strong',null,fmt.format(rows.filter(r=>r[status.key]===value).length))))),E(MaskanDataGrid,{columns,data,toolbar,label:'فهرست پیگیری‌ها',empty:'وظیفه‌ای برای نمایش نیست',countLabel:n=>fmt.format(n)+' وظیفه',onAction:(_,row)=>open('tasks',row.record)}));
}

function DemandGrid({db, rows, fields, query, filter, setQuery, setFilter, open, create}) {
  const R=A.default, E=R.createElement, labels=ne.demands.fields, fmt=new Intl.NumberFormat('fa-IR');
  const kpi=MaskanDataGrid.useKpi();
  const columns=R.useMemo(()=>[...fields.map(f=>({field:f.key,title:f.label})),{action:'details',title:'پرونده',caption:'جزئیات'}],[]);
  const data=rows.map(record=>({...Object.fromEntries(fields.map(f=>[f.key,Xe(f,record[f.key],db)])),id:record.id,record}));
  const leaders={};
  const cards=[['kind','نوع تقاضا','demands'],['district','محله','properties'],['status','وضعیت','check']].map(([key,title,icon])=>{
    const counts=new Map(); for(const row of data){const val=String(row[key]||'').trim()||'نامشخص';counts.set(val,(counts.get(val)||0)+1)}
    const entries=Array.from(counts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'fa'));
    leaders[key]=entries[0]?.[0];
    const text=entries.length?entries[0][0]+' · '+fmt.format(entries[0][1]):'بدون تقاضا';
    return E('div',{key,...kpi.card(key,!!entries.length),title:entries.map(([k,v])=>k+': '+fmt.format(v)).join('\n')},E('span',{style:kpi.icon(key),className:'ls-k-icon','aria-hidden':true},E(j,{name:icon})),E('small',null,'پرتکرارترین '+title),E('strong',null,text));
  });
  const toolbar=get=>E('div',{className:'tools'},E('input',{className:'demand-search',value:query,placeholder:'جست‌وجو در تقاضاها…','aria-label':'جست‌وجوی تقاضا',onChange:e=>setQuery(e.target.value)}),E('select',{value:filter,'aria-label':'وضعیت تقاضا',onChange:e=>setFilter(e.target.value)},E('option',{value:''},'همهٔ وضعیت‌ها'),Object.entries(labels.find(f=>f.key==='status').choices).map(([k,v])=>E('option',{key:k,value:k},v))),E('button',{onClick:()=>Yi('demands',[fields.map(f=>f.label),...get().map(row=>fields.map(f=>/^\s*[=+@-]/.test(row[f.key])?"'"+row[f.key]:row[f.key]))])},'خروجی CSV'),E('button',{className:'primary',onClick:()=>create('demands')},'＋ ثبت تقاضا'));
  return E('section',{className:'lf lf-grid-page demand-page'},E('div',{className:'ls-kpis','aria-label':'شاخص‌های تقاضا'},cards),E(MaskanDataGrid,{columns,data:data.filter(r=>kpi.accepts(k=>(String(r[k]||'').trim()||'نامشخص')===leaders[k])),toolbar,label:'فهرست تقاضاها',empty:'تقاضایی برای نمایش نیست',countLabel:n=>fmt.format(n)+' تقاضا',onAction:(_,row)=>open('demands',row.record)}));
}
