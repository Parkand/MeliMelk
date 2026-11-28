  function personSummary(h,v,ws,accordion=false) {
    const pf=v.profile||{},roles=pf.roles||(v.category==='both'?['owner','customer']:[v.category]),names=Object.fromEntries(ws.data.contacts.map(x=>[x.id,x.name]));
    const full = [pf.first, pf.last].filter(Boolean).join(" ") || v.name;
    const title = [pf.salutation, full].filter(Boolean).join(" ") || "پروندهٔ شخص جدید";
    const text = [pf.job && `حوزهٔ فعالیت: ${pf.job}`, pf.position && `سمت: ${pf.position}`, pf.company && `محل کار: ${pf.company}`].filter(Boolean).join(" • ");
    const facts = [
      ["نام نمایشی", v.name !== full && v.name], ["نام آشنا در دفتر", pf.alias], ["نقش‌ها",roles.map(k=>pcRoles[k]).filter(Boolean).join("، ")],
      ["موبایل اصلی",v.phone], ["راه‌های تماس دیگر",[...(v.methods||[]),...(v.socialMethods||[])].filter((item,index,all)=>all.indexOf(item)===index).filter(m=>m.value).map(m=>[m.label || pcMethods[m.kind],m.value].filter(Boolean).join(": ")).join("؛ ")],
      ["ترجیح تماس",[pf.preferred,pf.time].filter(Boolean).join("، ")], ["محدوده",[pf.city,pf.area].filter(Boolean).join("، ")],
      ["تحصیلات",[pf.education,pf.major].filter(Boolean).join("، ")], ["جنسیت",pf.gender], ["شناسهٔ تکمیلی",pf.identifier], ["منبع آشنایی",v.source],
      ["روابط",(v.links||[]).filter(l=>names[l.id]).map(l=>[names[l.id],l.draft ?? relText(l.kind)].filter(Boolean).join(" — ")).join("؛ ")],
      ["مشاور پیگیر",ws.team.find(x=>String(x.id)===String(v.assignee))?.name], ["برچسب‌ها",pf.tags], ["یادداشت داخلی",v.note]
    ].filter(([,value])=>value && String(value).trim());
    const list = h("dl",null,...facts.map(([label,value])=>h("div",{key:label},h("dt",null,label),h("dd",null,h("bdi",null,value)))));
    if (accordion) return h("details",{key:v.id,className:"pc-review",open:true,dir:"rtl"},
      h("summary",null,h("strong",null,"خلاصهٔ اطلاعات مشتری"),text && h("span",null,text)),list);
    return h("article",{className:"ce-summary ce-wide",dir:"rtl"}, h("small",null,"پروندهٔ اشخاص  /  مرور اطلاعات"),
      h("h3",null,title), text && h("p",null,text),
      !full && !text && h("p",null,"با تکمیل فرم، اطلاعات شخص اینجا نمایش داده می‌شود."),
      list);
  }
function pcForm(props){
  const [serial,advance]=O.useState(0);
  return O.default.createElement(CustomerEntry,{...props,key:serial,row:serial?null:props.row,preset:serial?{}:props.preset,onNew:props.onNew||(()=>advance(value=>value+1))});
}
function CustomerEntry({ frame, row, ws, preset = {}, close, nested, onDone,onNew }) {
  const R = O.default,
    h = R.createElement,
    [v, set] = R.useState(() => ({
      name: "",
      phone: "",
      category: "",
      source: "",
      note: "",
      assignee: ws.user.id,
      methods: [],
      links: [],
      profile: {},
      ...preset,
      ...row,
      methods:[...(row?.methods??preset.methods??[]),...(row?.socialMethods??preset.socialMethods??[])],socialMethods:[],
    })),
    [base] = R.useState(v),
    [tab, T] = R.useState(0),
    [err, E] = R.useState(""),
    [attempt, tried] = R.useState(false),
    errorId = R.useId(),
    [searchRow,setSearchRow]=R.useState(null),
    [searchText,setSearchText]=R.useState(""),
    [suggestionRow,setSuggestionRow]=R.useState(null),
    picker = R.useRef(null),
    [busy, B] = R.useState(false),
    dirty = JSON.stringify(base) !== JSON.stringify(v),
    put = (key, val) => set((p) => ({ ...p, [key]: val })),
    pf = v.profile || {},
    pr = (k, val) =>
      set((p) => ({ ...p, profile: { ...p.profile, [k]: val } })),
    label = (s, input) => h("label", { key: s },tab===1?h("span",{className:"ce-caption"},h(j,{name:({"تحصیلات":"contracts","رشتهٔ تحصیلی":"contracts","شغل":"tasks","سمت":"team","محل کار":"properties","شناسهٔ تکمیلی":"contracts","شهر":"properties","محله":"listings"})[s]||"contacts"}),s):s,input),
    field = (k, s, profile = false, type = "text", extra = {}) =>
      label(
        s,
        h("input", {
          type,
          value: (profile ? pf : v)[k] || "",
          onChange: (e) => (profile ? pr : put)(k, e.target.value),
          maxLength: 240,
          ...extra,
        }),
      ),
    opts = (dict) =>
      Object.entries(dict).map(([k, s]) =>
        h("option", { value: k, key: k }, s),
      ),
    select = (value, fn, dict, accessibleName) =>
      h(
        "select",
        { value: value || "", "aria-label":accessibleName, onChange: (e) => fn(e.target.value) },
        opts(dict),
      ),
    button = (s, fn) => h("button", { type: "button", onClick: fn }, s),
    names = Object.fromEntries(
      ws.data.contacts
        .filter((x) => x.id !== row?.id)
        .map((x) => [x.id, x.name]),
    ),
    list = (key, items, make) =>
      items.map((item, i) =>
        h(
          "div",
          { key: i, className: "pc-line" },
          ...make(item, (f, val) =>
            put(
              key,
              items.map((x, j) => (j === i ? { ...x, [f]: val } : x)),
            ),
          ),
          h("button",{type:"button",title:"حذف ردیف","aria-label":"حذف ردیف",onClick:() =>
            put(
              key,
              items.filter((_, j) => j !== i),
            )}, "×",
          ),
        ),
      ),
    cancel = async () => {
      if (!busy && (!dirty || await maskanMessage({kind:'confirm',title:'خروج بدون ذخیره؟',message:'تغییرات این فرم ذخیره نشده‌اند.'})))
        close();
    },
    roles =
      pf.roles ||
      (v.category === "both"
        ? ["customer", "owner"]
        : v.category
          ? [v.category]
          : []),
    display = [pf.salutation, pf.last || v.name].filter(Boolean).join(" ");
  // Feedback is rendered by the shared modal via ce-errors, not a second popup.
  const maskanFeedback=(set,text)=>set(text);
  async function photo(e) {
    const f = e.target.files[0];
    if (!f) return;
    B(true);
    try {
      if (
        !["image/jpeg", "image/png", "image/webp"].includes(f.type) ||
        f.size > 4000000
      )
        throw Error("تصویر JPEG، PNG یا WebP تا ۴ مگابایت انتخاب کنید.");
      const img = await createImageBitmap(f);
      try {
        const c = document.createElement("canvas");
        c.width = c.height = 112;
        const d = Math.min(img.width, img.height);
        c.getContext("2d").drawImage(
          img,
          (img.width - d) / 2,
          (img.height - d) / 2,
          d,
          d,
          0,
          0,
          112,
          112,
        );
        const value = c.toDataURL("image/jpeg", 0.62);
        if (value.length >= 14000) throw Error("تصویر ساده‌تری انتخاب کنید.");
        pr("photo", value);
        E("");
      } finally {
        img.close();
      }
    } catch (ex) {
      maskanFeedback(E,ex.message);
    } finally {
      B(false);
    }
  }
  const normalizeSearch=value=>String(value??"").normalize("NFKC").replace(/ي/g,"ی").replace(/ك/g,"ک").replace(/[۰-۹]/g,digit=>"۰۱۲۳۴۵۶۷۸۹".indexOf(digit)).replace(/[\s\u200c-]/g,"").toLowerCase();
  const matches=searchRow===null?[]:ws.data.contacts.filter(person=>person.id!==row?.id&&[person.name,person.phone].some(value=>normalizeSearch(value).includes(normalizeSearch(searchText))));
  async function save(e) {
    e.preventDefault();
    if (busy) return;
    const another=e.nativeEvent?.submitter?.value==="new";
    tried(true);
    if (!v.name?.trim() || !v.phone?.trim()) {
      T(0);
      await maskanFeedback(E,"نام و شماره تماس را کامل کنید.","validation");
      return;
    }
    const links=v.links.filter(link=>link.id||(link.draft??relText(link.kind))?.trim());
    if (links.some(link=>!link.id)) { T(3); await maskanFeedback(E,'پروندهٔ مرتبط را انتخاب کنید.','validation'); return; }
    if (links.some(l => !(l.draft ?? relText(l.kind))?.trim())) { T(3); await maskanFeedback(E,'عنوان ارتباط را کامل کنید.','validation'); return; }
    B(true);
    E("");
    try {
      const category =
        roles.includes("owner") && roles.includes("customer")
          ? "both"
          : roles.find((s) => s !== "referrer") || null;
      const { incoming, ...body } = v;
      const contactRows=v.methods.filter(item=>item.value?.trim()||item.label?.trim());
      if(contactRows.some(item=>!item.value?.trim())){T(2);E("مقدار راه ارتباطی را وارد کنید.");return}
      const standard=item=>["mobile","land","email"].includes(item.kind);
      body.methods=contactRows.filter(standard);
      body.socialMethods=contactRows.filter(item=>!standard(item));
      body.links = links.map(({ draft, kind, id }) => ({
        id,
        kind: draft === undefined ? kind : relEncode(draft),
      }));
      const result = await sl(
        "records/contacts" + (row ? "/" + row.id : ""),
        row ? "PUT" : "POST",
        { ...body, category, profile: { ...pf, roles } },
      );
      if(another) await onNew(result.id); else await onDone(result.id, {name:v.name.trim(), phone:v.phone.trim()});
    } catch (ex) {
      maskanFeedback(E,ex.message);
    } finally {
      B(false);
    }
  }
  const personal = [
      ["first", "نام"],
      ["last", "نام خانوادگی"],
      ["alias", "نام آشنا در دفتر"],
      ["major", "رشتهٔ تحصیلی"],
      ["job", "شغل"],
      ["position", "سمت"],
      ["company", "محل کار"],
      ["identifier", "شناسهٔ تکمیلی"],
      ["city","شهر"],["area","محله"],
    ],
    choice = (k, s, arr) =>
      label(
        s,
        select(pf[k], (x) => pr(k, x), {
          "": "تعیین نشده",
          ...Object.fromEntries(arr.map((x) => [x, x])),
        }),
      ),
    history = (k, s) => {
      const rows = (ws.data[k] || []).filter(
        (x) => row && x.contact_id === row.id,
      );
      return h(
        "details",
        { key: k },
        h("summary", null, s + " · " + rows.length),
        ...rows.map((x) =>
          h(
            "p",
            { key: x.id },
            [
              x.title || x.district || x.note || s,
              x.due_at || x.follow_on || x.updated_at?.slice(0, 10),
            ]
              .filter(Boolean)
              .join(" — "),
          ),
        ),
      );
    };
  const messages = [...new Set([
    attempt && !v.name?.trim() && "نام نمایشی را وارد کنید.",
    attempt && !v.phone?.trim() && "موبایل اصلی را وارد کنید.",
    attempt && v.links.some(l => !(l.draft ?? relText(l.kind))?.trim()) && "نوع رابطه را در تب آشنایی و روابط مشخص کنید.", err
  ].filter(Boolean))];

  return h(
    mmDialog,
    {
      frame,
      nested,
      heading: h("div",{className:"cl-identity"},
        h("div",{className:"cl-avatar"},pf.photo ? h("img",{src:pf.photo,alt:"تصویر مشتری"}) : h("svg",{width:34,height:34,viewBox:"0 0 32 32",fill:"none",stroke:"currentColor","aria-hidden":true},h("circle",{cx:16,cy:10,r:6}),h("path",{d:"M3 29c1-13 25-13 26 0"})),
          h("input",{hidden:true,type:"file",ref:picker,accept:"image/png,image/jpeg,image/webp",onChange:photo}),
          h("button",{className:"cl-camera",type:"button",disabled:busy,title:"تغییر تصویر","aria-label":"تغییر تصویر",onClick:()=>picker.current.click()},h("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","aria-hidden":true},h("path",{d:"M2 7h5l2-3h6l2 3h5v14H2z"}),h("circle",{cx:12,cy:13,r:4})))),
        h("div",null,h("strong",null,v.name || "شخص جدید"),h("small",null,display || "پروندهٔ مشتری")),
        pf.photo && h("button",{type:"button",disabled:busy,onClick:()=>pr("photo","")},"حذف تصویر")),
      icon: "contacts",
      title: row ? "ویرایش پرونده" : "ایجاد مشتری جدید",
      dirty,
      blocked: busy,
      close: frame ? close : cancel,
    },
    h(
      "form",
      { onSubmit: save, noValidate:true, dir: "rtl", className: "customer-editor" },
      h(
        "fieldset",
        { className: "pc-form", disabled: busy },
        h(
          "nav",
          { "aria-label": "بخش‌های پرونده" },
          [
            "اطلاعات ضروری",
            "مشخصات فردی",
            "راه‌های ارتباط",
            "آشنایی و روابط",
            "پیگیری و سوابق",
            "خلاصهٔ پرونده",
          ].map((s, i) =>
            h(
              "button",
              {
                type: "button",
                key: s,
                "aria-pressed": tab === i,
                onClick: () => T(i),
              },
              s,
            ),
          ),
        ),
        h(
          "section",
          {className:tab===4?"ce-follow-compact":undefined},
          ...(tab === 5 ? [personSummary(h,v,ws)] : tab === 0
            ? [
                ...[["name", "نام نمایشی", "نام نمایشی را وارد کنید."], ["phone", "موبایل اصلی", "موبایل اصلی را وارد کنید."]].map(([key, caption, message]) => {
                  const bad = attempt && !v[key]?.trim();
                  return h("label", {key}, caption + " *", h("input", {type:key === "phone" ? "tel" : "text", dir:key === "phone" ? "ltr" : "rtl", value:v[key] || "", maxLength:240, "aria-required":true,"aria-invalid":bad,"aria-describedby":bad ? errorId : undefined,onChange:e=>put(key,e.target.value)}));
                }),
                h("div",{className:"ce-wide ce-roles"},h("strong",null,"نقش‌ها"),...Object.entries(pcRoles).map(([key,name])=>h("button",{type:"button",key,"data-role":key,"aria-pressed":roles.includes(key),onClick:()=>pr("roles",roles.includes(key)?roles.filter(role=>role!==key):[...roles,key])},h(j,{name:({owner:"properties",customer:"contacts",partner:"team",referrer:"tasks"})[key]}),name))),

              ]
            : tab === 1
              ? [
                  ...personal.slice(0,2).map(([k,s])=>field(k,s,true)),
                  field("salutation", "نحوهٔ خطاب", true, "text", {
                    list: "pc-salute",
                  }),
                  h(
                    "datalist",
                    { id: "pc-salute" },
                    ...opts(
                      Object.fromEntries(
                        [
                          "آقای",
                          "جناب آقای",
                          "خانم",
                          "سرکار خانم",
                          "جناب مهندس",
                          "آقای مهندس",
                          "خانم مهندس",
                          "آقای دکتر",
                          "جناب آقای دکتر",
                          "خانم دکتر",
                          "سرکار خانم دکتر",
                        ].map((s) => [s, s]),
                      ),
                    ),
                  ),
                  choice("gender", "جنسیت", ["زن", "مرد", "سایر"]),
                  choice("education", "تحصیلات", [
                    "دیپلم",
                    "کاردانی",
                    "کارشناسی",
                    "کارشناسی ارشد",
                    "دکتری",
                    "سایر",
                  ]),
                  ...personal.slice(2).map(([k, s]) => field(k, s, true)),
                ]
              : tab === 2
                ? [
                    h("div",{className:"ce-wide cr-relations ce-methods"},h("h3",null,"راه‌های تماس"),h("div",{className:"ce-method-row cr-head","aria-hidden":true},h("span",null,"نوع"),h("span",null,"مقدار"),h("span",null,"برچسب")),
                      ...(v.methods.length?v.methods:[{kind:"mobile",value:""}]).map((item,index,rows)=>{
                        const change=(key,value)=>put("methods",rows.map((other,pos)=>pos===index?{...other,[key]:value}:other));
                        const marks={mobile:"☎",land:"☏",email:"✉",telegram:"➤",whatsapp:"✆",instagram:"◎",rubika:"◈",bale:"ب",eitaa:"ا",linkedin:"in",soroush:"س",igap:"iG",signal:"◌",x:"𝕏",facebook:"f",youtube:"▶",website:"🌐",other:"⋯"};
                        const choices=Object.fromEntries(Object.entries(pcMethods).map(([key,name])=>[key,marks[key]+"  "+name]));
                        return h("div",{key:index,className:"cr-row ce-method-row"},select(item.kind,value=>change("kind",value),choices,"نوع راه ارتباطی"),
                          h("input",{"aria-label":"مقدار راه ارتباطی",dir:"ltr",value:item.value||"",maxLength:240,placeholder:({mobile:"09…",land:"021…",email:"name@example.com",website:"https://…",whatsapp:"+98…"})[item.kind]||"@username / link",onChange:event=>change("value",event.target.value)}),
                          h("input",{"aria-label":"برچسب",value:item.label||"",maxLength:60,placeholder:"اختیاری",onChange:event=>change("label",event.target.value)}),
                          h("div",{className:"cr-actions"},h("button",{type:"button",className:"cr-minus",title:"حذف ردیف","aria-label":"حذف ردیف",disabled:!v.methods.length,onClick:()=>put("methods",rows.filter((_,pos)=>pos!==index))},"−"),h("button",{type:"button",className:"cr-plus",title:"افزودن ردیف","aria-label":"افزودن ردیف",onClick:()=>put("methods",[...rows.slice(0,index+1),{kind:"mobile",value:""},...rows.slice(index+1)])},"+")));
                      })),
                    ...[
                      ["preferred", "روش تماس ترجیحی"],
                      ["time", "زمان مناسب تماس"],
                    ].map(([k, s]) => field(k, s, true)),
                  ]
                : tab === 3
                  ? [
                      h("div",{className:"ce-wide cr-source"},field("source","منبع آشنایی"),h("small",null,"شخص انتخابی چه نسبتی با صاحب این پرونده دارد؟")),
                      h("div",{className:"ce-wide cr-relations"},
                        h("h3",null,"روابط"),
                        h("div",{className:"cr-row cr-head","aria-hidden":true},h("span",null,"پروندهٔ مرتبط"),h("span",null,"نوع رابطه")),
                        ...(v.links.length?v.links:[{id:"",draft:""}]).map((link,index)=>{
                          const rows=v.links.length?v.links:[link];
                          const change=(key,value)=>put("links",rows.map((item,pos)=>pos===index?{...item,[key]:value}:item));
                          const action=(caption,symbol,style,run,disabled=false)=>h("button",{type:"button",className:style,title:caption,"aria-label":caption,disabled,onClick:run},symbol);
                          return h("div",{className:"cr-row",key:index},
                            h("div",{className:"cr-person"},select(link.id,value=>change("id",value),{"":"انتخاب شخص",...names},"پروندهٔ مرتبط"),action("جست‌وجوی مشتری",h("svg",{width:17,height:17,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,"aria-hidden":true},h("circle",{cx:10,cy:10,r:6}),h("path",{d:"m15 15 6 6"})),"cr-find",()=>{setSearchText("");setSearchRow(index)})),
                            h("div",{className:"cr-kind"},h("input",{"aria-label":"نوع رابطه",maxLength:48,value:link.draft??relText(link.kind),placeholder:"انتخاب یا نوشتن رابطه",onClick:()=>setSuggestionRow(index),onFocus:()=>setSuggestionRow(index),onBlur:event=>{if(!event.currentTarget.parentNode.contains(event.relatedTarget))setSuggestionRow(null)},onChange:event=>change("draft",event.target.value),onKeyDown:event=>{if(event.key==="Escape"&&suggestionRow===index){event.stopPropagation();setSuggestionRow(null)}}}),
                              suggestionRow===index&&h("div",{className:"cr-options",onBlur:event=>{if(!event.currentTarget.parentNode.contains(event.relatedTarget))setSuggestionRow(null)}},[...new Set([...Object.values(pcKinds),...(ws.data.relationNames||[]),...ws.data.contacts.flatMap(person=>(person.links||[]).filter(item=>item.kind.startsWith("custom:")).map(item=>relText(item.kind)))])].map(name=>h("button",{key:name,type:"button",onMouseDown:event=>event.preventDefault(),onClick:()=>{change("draft",name);setSuggestionRow(null)}},name)))),
                            h("div",{className:"cr-actions"},action("حذف همین رابطه","−","cr-minus",()=>{setSuggestionRow(null);put("links",v.links.filter((_,pos)=>pos!==index))},!v.links.length),action("افزودن رابطه در ردیف بعد","+","cr-plus",()=>{setSuggestionRow(null);put("links",[...rows.slice(0,index+1),{id:"",draft:""},...rows.slice(index+1)])})),
                            searchRow===index&&h("dialog",{className:"cr-picker","aria-label":"جست‌وجوی مشتری",ref:dialog=>{if(dialog&&!dialog.open){dialog.showModal();dialog.querySelector("input")?.focus()}},onCancel:event=>{event.preventDefault();event.stopPropagation();setSearchRow(null)},onKeyDown:event=>{event.stopPropagation();if(event.key==="Enter"&&event.target.tagName==="INPUT")event.preventDefault()}},
                              h("header",null,h("strong",null,"جست‌وجوی مشتری"),action("بستن","×","cr-close",()=>setSearchRow(null))),
                              h("input",{type:"search","aria-label":"نام یا شماره تماس",placeholder:"نام یا شماره تماس",value:searchText,onChange:event=>setSearchText(event.target.value)}),
                              h("div",{className:"cr-results"},matches.length?matches.map(person=>h("button",{key:person.id,type:"button",onClick:()=>{change("id",person.id);setSearchRow(null)}},person.name,h("small",{dir:"ltr"},person.phone))):"مشتری پیدا نشد.")));
                        })),
                      ...pcSummary({ incoming: row?.incoming }, ws).map(
                        ([s, n]) => h("p", { key: s + n }, s + ": " + n),
                      ),
                    ]
                  : [
                      h("h3",{className:"ce-wide"},"تنظیمات پیگیری"),
                      ws.user.role === "admin"
                        ? label(
                            "مشاور پیگیر",
                            select(
                              v.assignee,
                              (x) => put("assignee", x),
                              Object.fromEntries(
                                ws.team
                                  .filter((x) => x.active !== 0)
                                  .map((x) => [x.id, x.name]),
                              ),
                            ),
                          )
                        : h(
                            "p",
                            null,
                            "مشاور پیگیر: " +
                              (ws.team.find((x) => x.id === v.assignee)?.name ||
                                ws.user.name),
                          ),
                      field("tags", "برچسب‌ها", true),
                      label(
                        "یادداشت داخلی",
                        h("textarea", {
                          value: v.note || "",
                          maxLength: 3000,
                          onChange: (e) => put("note", e.target.value),
                        }),
                      ),
                      h("h3",{className:"ce-wide"},"خلاصهٔ سوابق"),
                      h("div",{className:"ce-stats"},history("tasks", "پیگیری"),
                      history("demands", "تقاضا"),
                      history("visits", "بازدید"),
                      history("deals", "معامله")),
                    ]),
        ),
      ),
      h(
        "footer",
        null,
        button("انصراف", cancel),
        h("button",{type:"submit",value:"new",className:"ce-save-new",disabled:busy},"ذخیره و جدید"),
        h("button",{type:"submit",value:"close",className:"primary ce-save-close",disabled:busy},busy?"در حال ذخیره…":"✓ ذخیره و بستن"),
        h("div", {className:"ce-errors", id:errorId, role:"alert", dir:"rtl"},
          ...messages.map(text => h("span",{key:text},text))),
      ),
    ),
  );
}
