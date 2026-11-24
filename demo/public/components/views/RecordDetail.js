function DetailPin({lat,lon}) {
 const R=O.default,h=R.createElement,host=R.useRef(null),[failed,fail]=R.useState(false);
 const ok=[lat,lon].every(x=>x!=null&&String(x).trim()!==''&&Number.isFinite(Number(x)))&&Math.abs(lat)<=90&&Math.abs(lon)<=180;
 R.useEffect(()=>{if(!ok)return;let map,observer;try{const L=window.L,key=document.querySelector('meta[name="neshan-web-key"]')?.content;if(!key||!L)throw Error();map=new L.Map(host.current,{key,maptype:'dreamy',center:[+lat,+lon],zoom:16,scrollWheelZoom:false,traffic:false,poi:false});L.marker([+lat,+lon],{icon:L.divIcon({className:'pr-map-pin',iconSize:[18,18],iconAnchor:[9,9]})}).addTo(map);observer=new ResizeObserver(()=>map.invalidateSize());observer.observe(host.current);fail(false)}catch{fail(true)}return()=>{observer?.disconnect();map?.remove()}},[ok,lat,lon]);
 return h('section',null,ok?h(R.Fragment,null,h('div',{ref:host,className:'pd6-map','aria-label':'موقعیت ملک'}),failed&&h('small',null,'نقشه در دسترس نیست'),h('a',{href:'https://neshan.org/maps/@'+Number(lat)+','+Number(lon)+',16.0z,0.0p',target:'_blank',rel:'noopener noreferrer'},'نمایش در نقشه')):'موقعیت ثبت نشده');
}
function Pd6Gallery({value}) {
 const R=O.default,h=R.createElement,{items,cover}=value,[index,set]=R.useState(cover||0),i=Math.max(0,Math.min(index,items.length-1));
 const arrow=(dir,label)=>h('button',{type:'button','aria-label':label,title:label,disabled:i+dir<0||i+dir>=items.length,onClick:()=>set(i+dir)},h('svg',{width:20,height:20,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,'aria-hidden':true},h('path',{d:dir<0?'M9 5l7 7-7 7':'M15 5l-7 7 7 7'})));
 return h('div',null,h('div',{className:'pd6-stage'},items[i]?h('img',{src:items[i],alt:'عکس ملک',referrerPolicy:'no-referrer'}):'بدون عکس',items.length>1&&arrow(-1,'عکس قبلی'),items.length>1&&arrow(1,'عکس بعدی')),items.length>0&&h('small',null,'تصویر '+F.format(i+1)+' از '+F.format(items.length)));
}
function Pd6Body({row:e,model:u,data:r,team,photo,history}){
 const h=O.default.createElement, field=k=>u.fields.find(d=>d.key===k), val=k=>field(k)&&e[k]!=null&&e[k]!==''?Xe(field(k),e[k],r):null, cell=(k,title,suffix='')=>h('div',{key:k,'data-field':k},h('dt',null,title),h('dd',null,k==='assignee'?(team.find(v=>v.id===e.assignee)?.name||'—'):val(k)!=null?String(val(k))+suffix:'—')), coords=[e.latitude,e.longitude], valid=coords.every((v,i)=>v!=null&&String(v).trim()!==''&&Number.isFinite(Number(v))&&Math.abs(Number(v))<=(i?180:90));
 return h('div',{className:'pd6'},h('style',null,`dialog.mm-shell[open][data-size=wide]:has(.pd6),dialog.mm-shell[open][data-size=wide]:has(.pd6)>.modal-scroll{overflow:hidden!important}dialog.mm-shell[open][data-size=wide]:has(.pd6)>.modal-scroll{display:flex!important;flex:1 1 0!important;min-height:0!important;padding:0!important}dialog.mm-shell[open][data-size=wide]:has(.pd6)>footer{overflow:visible!important;height:auto!important;flex:0 0 auto!important;flex-wrap:wrap}dialog.mm-shell[open][data-size=wide]:has(.pd6)>footer button{margin:0}.pd6{--stage:clamp(52px,20dvh,145px);box-sizing:border-box;width:100%;min-height:0;display:grid;grid-template-rows:auto minmax(0,1fr);gap:clamp(6px,2vh,16px);padding:clamp(8px,2vh,18px) clamp(10px,3vw,34px);color:var(--mp-text)}.pd6-media{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(8px,3vw,28px)}.pd6-media>div{min-width:0}.pd6-media b{display:block;margin-bottom:6px;font-weight:550}.pd6-media section{margin:0;padding:0;border:0;display:block}.pd6-stage,.pd6-map{box-sizing:border-box;height:var(--stage)!important;overflow:hidden;border:1px solid var(--mp-line,#d9e1df);border-radius:9px;background:#ebefeb}.pd6-stage{position:relative;display:grid;place-items:center}.pd6-stage img{height:100%;width:100%;min-height:0;object-fit:contain}.pd6-stage button{position:absolute;top:50%;transform:translateY(-50%);display:grid;place-items:center;width:32px;height:32px;min-height:0;padding:0;right:5px}.pd6-stage button:last-child{right:auto;left:5px}.pd6-media small,.pd6-media section>a{display:inline-block;font-size:.85em;margin-top:4px}.pd6-scroll{min-height:0;overflow:auto;overscroll-behavior:contain;background:var(--mp-soft,#f5f8f5);border:1px solid var(--mp-line,#d9e1df);border-radius:10px;padding:0 clamp(10px,2vw,22px);overflow-wrap:anywhere}.pd6-scroll{container-type:inline-size}.pd6 .pd7-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));align-content:start;gap:0 12px;margin:0;padding:4px 0}.pd7-facts>div{min-width:0;padding:4px 0;border-bottom:1px solid var(--mp-line,#ddd);line-height:1.35}.pd7-facts dt{font-size:.82em}.pd7-facts dd{margin:1px 0 0;font-weight:550}.pd7-facts{direction:rtl}.pd7-facts>[data-field=address],.pd7-facts>[data-field=note]{grid-column:span 3}.pd7-facts>[data-field=assignee]{grid-column-start:1}.pd6-coords{display:inline-block;margin-inline:6px;font-size:.75em;font-weight:400;opacity:.72}@container(max-width:480px){.pd6 .pd7-facts{grid-template-columns:repeat(2,minmax(0,1fr))}.pd7-facts>[data-field=address],.pd7-facts>[data-field=note]{grid-column:span 1}}.pd6 .property-history{margin:8px 0}@media(max-height:450px){.pd6{--stage:48px;gap:4px;padding-block:4px}.pd6-media b{margin:0}.pd6-lead{padding:4px 0}}`),h('div',{className:'pd6-media'},h('div',null,h('b',null,'گالری ملک'),h(Pd6Gallery,{value:galleryOf(e)})),h('div',null,h('b',null,'موقعیت ملک',valid&&h('bdi',{dir:'ltr',className:'pd6-coords'},coords.map(Number).join(', '))),h(DetailPin,{lat:e.latitude,lon:e.longitude}))),h('div',{className:'pd6-scroll',role:'region','aria-label':'خلاصه و جزئیات ملک',tabIndex:0},h('dl',{className:'pd7-facts'},cell('kind','نوع ملک'),cell('owner_id','مالک'),cell('title','نام یا کد داخلی ملک'),cell('built_year','سال ساخت'),cell('area','مساحت',' متر مربع'),cell('rooms','تعداد اتاق'),cell('floor_count','تعداد طبقات ساختمان'),cell('unit_floor','طبقهٔ واحد'),cell('district','محله'),cell('address','نشانی'),cell('elevator','آسانسور'),cell('storage_room','انباری'),cell('parking','پارکینگ'),cell('assignee','مسئول'),cell('note','یادداشت')),history));
}
function Yb({
  frame,
  k: t,
  row: e,
  ws: l,
  close: a,
  edit: n,
  create: i,
  open: s,
  nested: o,
  refresh,
}) {
  function photoLink(value){if(typeof value!=='string')return null;let url;try{url=new URL(value)}catch{return null}return /^https:\/\//i.test(value)&&url.protocol==='https:'&&!url.username&&!url.password&&!/[\s\\]/.test(value)?url:null;}
  const gallery=['photo_url','photo_url_2','photo_url_3'];
  function renderPhoto(d){const photo=photoLink(e[d.key]);return photo ? O.default.createElement('a',{href:photo.href,target:'_blank',rel:'noopener noreferrer',dir:'auto'},d.label+' ('+photo.hostname+')') : 'ثبت نشده';}
  let u = t==='properties'?physicalPropertyModel():ne[t],
    r = l.data,
    c =
      (l.user.role === "admin" ||
        e.assignee === l.user.id ||
        (t === "tasks" &&
          l.user.role === "office_manager" &&
          e.creator_id === l.user.id &&
          l.targets.includes(e.assignee))) &&
      !["contracts", "payments"].includes(t) &&
      !(
        (t === "deals" && e.stage === "won") ||
        (t === "listings" && e.status === "closed")
      ),
    h = Object.values(ne).flatMap((d) =>
      r[d.key]
        .filter((y) =>
          d.fields.some((v) => v.target === t && y[v.key] === e.id),
        )
        .map((y) => [d, y]),
    ),
    f = t === "demands" ? Bb(e, r.listings, r.properties) : [];
  if (t === "tasks") return O.default.createElement(TaskDetail, {frame, row:e, ws:l, related:h, canEdit:c, edit:n, create:i, open:s});
  if (t === "contacts")
    return O.default.createElement(MaskanPersonCard, {
      frame,
      refresh: refresh,
      person: e,
      ws: l,
      related: h,
      canEdit: c,
      close: a,
      nested: o,
      edit: n,
      create: i,
      open: s,
    });
  const history=O.default.createElement(
      "section",
      {
        className: "property-history",
        "aria-label":
          "\u0633\u0648\u0627\u0628\u0642 \u0645\u0631\u062A\u0628\u0637",
      },
      O.default.createElement(
        "h3",
        null,
        "\u0633\u0648\u0627\u0628\u0642 \u0645\u0631\u062A\u0628\u0637 ",
        O.default.createElement("small", null, F.format(h.length)),
      ),
      h.length
        ? h.map(([d, y]) =>
            O.default.createElement(
              "button",
              {
                type: "button",
                key: d.key + ":" + y.id,
                onClick: () => s(d.key, y),
              },
              O.default.createElement(j, { name: d.key }),
              O.default.createElement(
                "span",
                null,
                O.default.createElement("small", null, d.single),
                O.default.createElement("b", null, Ee(d.key, y, r)),
              ),
              O.default.createElement("i", { "aria-hidden": "true" }, "\u2039"),
            ),
          )
        : O.default.createElement(
            "p",
            null,
            "\u0647\u0646\u0648\u0632 \u0633\u0627\u0628\u0642\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 ",
            u.single,
            " \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.",
          ),
    );
  return O.default.createElement(
    mmDialog,
    {
      frame,
      icon: t,
      title: u.single + " | " + Ee(t, e, r),
      nested: o,
      close: a,
    },
    t==='properties'?O.default.createElement(Pd6Body,{key:e.id,row:e,model:u,data:r,team:l.team,photo:renderPhoto,history}):
    O.default.createElement(
      "div",
      { className: "detail-grid property-facts" },
      u.fields.map((d) =>
        O.default.createElement(
          "div",
          { key: d.key, "data-tone": $d(d), "data-fact": d.key },
          O.default.createElement(
            "small",
            null,
            O.default.createElement(Qr, { field: d.key, f: d }),
            d.label,
          ),
          O.default.createElement(
            "strong",
            null,
            t==='properties' && gallery.includes(d.key) ? renderPhoto(d) : t==='properties' && ['elevator','storage_room'].includes(d.key) && !e[d.key] ? 'نامشخص' : Xe(d, e[d.key], r),
            d.type === "money" && e[d.key] != null
              ? " \u062A\u0648\u0645\u0627\u0646"
              : "",
          ),
        ),
      ),
      O.default.createElement(
        "div",
        null,
        O.default.createElement(
          "small",
          null,
          O.default.createElement(Qr, { field: "assignee" }),
          "\u0645\u0633\u0626\u0648\u0644",
        ),
        O.default.createElement(
          "strong",
          null,
          l.team.find((d) => d.id === e.assignee)?.name,
        ),
      ),
      t === "contracts" &&
        O.default.createElement(
          "div",
          { "data-tone": "spec" },
          O.default.createElement(
            "small",
            null,
            O.default.createElement(j, { name: "payments" }),
            "\u0645\u0627\u0646\u062F\u0647\u0654 \u06A9\u0645\u06CC\u0633\u06CC\u0648\u0646",
          ),
          O.default.createElement(
            "strong",
            null,
            F.format(
              e.commission -
                r.payments
                  .filter((d) => d.contract_id === e.id)
                  .reduce((d, y) => d + y.amount, 0),
            ),
            " \u062A\u0648\u0645\u0627\u0646",
          ),
        ),
    ),
    t === "demands" &&
      O.default.createElement(
        "section",
        { className: "property-history" },
        O.default.createElement(
          "h3",
          null,
          "\u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u0645\u0646\u0637\u0628\u0642 (",
          F.format(f.length),
          ")",
        ),
        O.default.createElement(
          "p",
          { className: "hint" },
          "\u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644 \u0645\u0637\u0627\u0628\u0642 \u0634\u0631\u0648\u0637 \u062B\u0628\u062A\u200C\u0634\u062F\u0647\u060C \u0628\u0647 \u062A\u0631\u062A\u06CC\u0628 \u0622\u062E\u0631\u06CC\u0646 \u062A\u0623\u06CC\u06CC\u062F.",
        ),
        f.map((d) =>
          O.default.createElement(
            "button",
            { key: d.id, onClick: () => s("listings", d) },
            O.default.createElement(j, { name: "listings" }),
            O.default.createElement("span", null, Ee("listings", d, r)),
            O.default.createElement("i", { "aria-hidden": "true" }, "\u2039"),
          ),
        ),
        !f.length &&
          O.default.createElement(
            re,
            null,
            "\u0641\u0627\u06CC\u0644\u06CC \u0645\u0646\u0637\u0628\u0642 \u0628\u0627 \u0627\u06CC\u0646 \u0634\u0631\u0627\u06CC\u0637 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.",
          ),
      ),
    t!=='properties' && history,
    O.default.createElement(
      "footer",
      null,
      t === "tasks" &&
        Kd(e, l).length > 0 &&
        O.default.createElement(
          "button",
          {
            onClick: () =>
              i("tasks", {
                parent_id: e.id,
                assignee: "",
                due_at: e.due_at,
                contact_id: e.contact_id,
                listing_id: e.listing_id,
              }),
          },
          "\u062A\u0639\u0631\u06CC\u0641 \u0632\u06CC\u0631\u06A9\u0627\u0631",
        ),
      t === "properties" && O.default.createElement("button", {onClick: () => i("listings", {property_id:e.id})}, "عرضهٔ این ملک"),
      c &&
        O.default.createElement(
          "button",
          { className: "primary", onClick: () => n(t, e) },
          "\u0648\u06CC\u0631\u0627\u06CC\u0634 ",
          u.single,
        ),
      t === "contacts" &&
        O.default.createElement(
          O.default.Fragment,
          null,
          O.default.createElement(
            "button",
            { onClick: () => i("tasks", { contact_id: e.id }) },
            "\u062B\u0628\u062A \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
          ),
          O.default.createElement(
            "button",
            { onClick: () => i("demands", { contact_id: e.id }) },
            "\u062B\u0628\u062A \u062A\u0642\u0627\u0636\u0627",
          ),
        ),
      t === "listings" &&
        e.status === "active" &&
        O.default.createElement(
          O.default.Fragment,
          null,
          O.default.createElement(
            "button",
            { onClick: () => i("visits", { listing_id: e.id }) },
            "\u062A\u0646\u0638\u06CC\u0645 \u0628\u0627\u0632\u062F\u06CC\u062F",
          ),
          O.default.createElement(
            "button",
            { onClick: () => i("deals", { listing_id: e.id }) },
            "\u0634\u0631\u0648\u0639 \u0645\u0630\u0627\u06A9\u0631\u0647",
          ),
        ),
      t === "deals" &&
        l.user.role === "admin" &&
        !["won", "lost"].includes(e.stage) &&
        O.default.createElement(
          "button",
          { onClick: () => i("contracts", { deal_id: e.id }) },
          "\u062B\u0628\u062A \u0642\u0631\u0627\u0631\u062F\u0627\u062F",
        ),
      t === "contracts" &&
        O.default.createElement(
          "button",
          { onClick: () => i("payments", { contract_id: e.id }) },
          "\u062B\u0628\u062A \u062F\u0631\u06CC\u0627\u0641\u062A",
        ),
    ),
  );
}
