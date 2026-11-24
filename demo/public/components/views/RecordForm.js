function jb({
  frame,
  k: t,
  row: e,
  preset: l = {},
  ws: a,
  onDone: n,
  close: i,
  nested: s,
}) {
  let o = t==='properties'?physicalPropertyModel():ne[t],
    u = zt().slice(0, 10),
    [r, c] = (0, O.useState)(() =>
      Object.assign(
        Object.fromEntries(
          o.fields.map((E) => [
            E.key,
            E.choices
              ? Object.keys(E.choices)[0]
              : ["signed_on", "paid_on", "verified"].includes(E.key)
                ? u
                : "",
          ]),
        ),
        { assignee: a.user.id },
        e,
        l,
      ),
    ),
    [h, f] = (0, O.useState)(!1),
    [d, y] = (0, O.useState)(""),
    [v, b] = (0, O.useState)(""),
    [p, g] = (0, O.useState)(""),
    [m, _] = (0, O.useState)(!1),
    x = (E, S) => c((k) => ({ ...k, [E]: S })),
    M = async (E) => {
      E.preventDefault();
      let S = E.currentTarget.querySelector('[data-missing="yes"]');
      if (S) {
        (g(
          "\u0644\u0637\u0641\u0627\u064B \u062A\u0627\u0631\u06CC\u062E \u0627\u0644\u0632\u0627\u0645\u06CC \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F.",
        ),
          S.focus());
        return;
      }
      (_(!0), g(""));
      try {
        let k = await sl(
          "records/" + t + (e ? "/" + e.id : ""),
          e ? "PUT" : "POST",
          { ...r, ...(h ? { followup: { title: d, due_at: v } } : {}) },
        );
        await n(k.id);
      } catch (k) {
        g(k.message);
      } finally {
        _(!1);
      }
    };
  const [ownerMode,setOwnerMode]=O.useState(''), [query,setQuery]=O.useState(''), [added,setAdded]=O.useState([]);
  const [taskTab,setTaskTab]=O.useState(0);
  function T(E) {
    if (
      t === "tasks" &&
      !qr(e, a.user) &&
      !["status", "result"].includes(E.key)
    )
      return O.default.createElement(
        "div",
        { key: E.key },
        O.default.createElement("small", null, E.label),
        O.default.createElement("p", null, Xe(E, r[E.key], a.data)),
      );
    if (R4(t, E, r.kind)) return null;
    let S = r[E.key] ?? "",
      k =
        E.required ||
        (t === "deals" && E.key === "follow_on" && r.stage !== "lost") ||
        (E.key === "result" && ["done", "help"].includes(r.status)) ||
        (E.key === "feedback" && r.status === "done"),
      B = {
        value: S,
        required: k,
        onChange: (q) => x(E.key, q.target.value),
        name: E.key,
        disabled: !!(
          e &&
          t === "listings" &&
          ["property_id", "kind"].includes(E.key)
        ),
      },
      K;
    if(t==='properties' && E.key==='owner_id'){
      const el=O.default.createElement, people=[...added.filter(p=>!a.data.contacts.some(q=>q.id===p.id)),...a.data.contacts].filter(p=>!p.archived||p.id===S);
      const norm=v=>String(v??'').normalize('NFKC').replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[۰-۹]/g,d=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[\s\u200c-]/g,'').toLowerCase();
      const matches=people.filter(p=>[p.name,p.phone].some(v=>norm(v).includes(norm(query))));
      const btn=(text,fn,props={})=>el('button',{type:'button',disabled:m,onClick:fn,...props},text);
      return el('div',{key:E.key,className:'pr-owner-field'},el('div',{className:'pr-owner-actions'},el('label',null,E.label,btn(people.find(p=>p.id===S)?.name||'انتخاب مالک',()=>{setQuery('');setOwnerMode('search')})),btn(el('svg',{width:20,height:20,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,'aria-hidden':true},el('circle',{cx:10,cy:10,r:6}),el('path',{d:'m15 15 6 6'})),()=>{setQuery('');setOwnerMode(ownerMode==='search'?'':'search')},{className:'pr-owner-toggle',title:'جست‌وجوی مالک','aria-label':'جست‌وجوی مالک','aria-expanded':ownerMode==='search'}),btn('＋',()=>setOwnerMode('create'),{title:'افزودن مالک','aria-label':'افزودن مالک'})),ownerMode==='search'&&el(PropertyOwnerDialog,{close:()=>setOwnerMode('')},el('input',{autoFocus:true,'aria-label':'جست‌وجوی مالک با نام یا موبایل',placeholder:'نام یا موبایل',value:query,onChange:ev=>setQuery(ev.target.value),onKeyDown:ev=>{if(ev.key==='Enter')ev.preventDefault()}}),el('div',{className:'pr-owner-results'},matches.length?matches.map(p=>btn([p.name,p.phone].filter(Boolean).join(' — '),()=>{x(E.key,p.id);setOwnerMode('')},{key:p.id})):'شخصی پیدا نشد.')));
    }
    if(t==='properties'&&['parking','storage_room','elevator'].includes(E.key))return O.default.createElement('div',{key:E.key,className:'pr-switch-field'},O.default.createElement('span',null,E.label),O.default.createElement('button',{type:'button',role:'switch','aria-label':E.label,'aria-checked':S==='yes',disabled:m,onClick:()=>x(E.key,S==='yes'?'no':'yes')},S==='yes'?'دارد':S==='no'?'ندارد':'نامشخص'));
    if (E.type === "ref") {
      let q = a.data[E.target];
      if (E.target === "contacts")
        q = q.filter((y) => !y.archived || y.id === e?.[E.key]);
      (E.key === "deal_id" &&
        (q = q.filter(
          (Y) =>
            !["won", "lost"].includes(Y.stage) &&
            a.data.listings.find((bt) => bt.id === Y.listing_id)?.status ===
              "active",
        )),
        E.key === "listing_id" &&
          ["visits", "deals"].includes(t) &&
          (q = q.filter((Y) => Y.status === "active" || S === Y.id)),
        (K = O.default.createElement(
          O.default.Fragment,
          null,
          O.default.createElement(
            "select",
            { ...B },
            O.default.createElement(
              "option",
              { value: "" },
              "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F",
            ),
            q.map((Y) =>
              O.default.createElement(
                "option",
                { key: Y.id, value: Y.id },
                Ee(E.target, Y, a.data),
              ),
            ),
          ),
          !q.length &&
            O.default.createElement(
              "small",
              null,
              "\u0627\u0628\u062A\u062F\u0627 \u06CC\u06A9 \u0645\u0648\u0631\u062F \u062F\u0631 \xAB",
              ne[E.target].label,
              "\xBB \u062B\u0628\u062A \u06A9\u0646\u06CC\u062F.",
            ),
        )));
    } else if (E.choices)
      K = O.default.createElement(
        "select",
        { ...B },
        Object.entries(E.choices)
          .filter(
            ([q]) =>
              !(
                (t === "tasks" && q === "cancelled" && !qr(e, a.user)) ||
                (t === "deals" && q === "won") ||
                (t === "listings" && q === "closed")
              ),
          )
          .map(([q, Y]) =>
            O.default.createElement("option", { key: q, value: q }, Y),
          ),
      );
    else {
      if (["date", "datetime"].includes(E.type))
        return O.default.createElement(
          "div",
          { key: E.key, className: "pd-field" },
          O.default.createElement(
            "span",
            { className: "fact-caption", "data-tone": $d(E) },
            O.default.createElement(Qr, { field: E.key, f: E }),
            E.label,
            k ? " *" : "",
          ),
          O.default.createElement(Xr, {
            label: E.label,
            required: k,
            value: S,
            timed: E.type === "datetime",
            change: (q) => x(E.key, q),
          }),
        );
      E.type === "long"
        ? (K = O.default.createElement("textarea", {
            ...B,
            rows: "3",
            maxLength: "3000",
          }))
        : (K = O.default.createElement(
            O.default.Fragment,
            null,
            O.default.createElement("input", {
              ...B,
              dir: ["number", "date", "datetime", "phone", "money"].includes(
                E.type,
              )
                ? "ltr"
                : "rtl",
              type:
                { datetime: "datetime-local", date: "date", phone: "tel" }[
                  E.type
                ] ?? "text",
              inputMode: ["money", "number"].includes(E.type)
                ? "numeric"
                : void 0,
              ...(t==='properties' && ['latitude','longitude'].includes(E.key) ? {dir:"ltr",placeholder:E.key==='latitude'?"35.6892":"51.3890"} : {}),
              maxLength: ['photo_url','photo_url_2','photo_url_3'].includes(E.key) ? 2048 : 240,
              ...(['photo_url','photo_url_2','photo_url_3'].includes(E.key)?{type:'url',dir:'ltr',placeholder:'https://example.com/photo.jpg'}:{}),
            }),
            ["date", "datetime"].includes(E.type) &&
              S &&
              O.default.createElement(
                "small",
                null,
                Tt(S, E.type === "datetime"),
              ),
          ));
    }
    return O.default.createElement(
      "label",
      { key: E.key, className: E.type === "long" ? "full" : "" },
      O.default.createElement(
        "span",
        { className: "fact-caption", "data-tone": $d(E) },
        O.default.createElement(Qr, { field: E.key, f: E }),
        E.label,
        E.type === "money" ? " (\u062A\u0648\u0645\u0627\u0646)" : "",
        k ? " *" : "",
      ),
      K,
    );
  }
  let N =
    t === "properties"
      ? [
          [
            "\u0647\u0648\u06CC\u062A \u0648 \u0645\u0627\u0644\u06A9\u06CC\u062A",
            "properties",
            ["title", "kind", "owner_id"],
          ],
          [
            "\u0645\u0648\u0642\u0639\u06CC\u062A \u0648 \u0646\u0634\u0627\u0646\u06CC",
            "home",
            ["district", "address", "latitude", "longitude"],
          ],
          ["گالری ملک", "properties", ["photo_url", "photo_url_2", "photo_url_3"]],
          [
            "\u0645\u0634\u062E\u0635\u0627\u062A \u0648 \u0627\u0645\u06A9\u0627\u0646\u0627\u062A",
            "demands",
            ["area", "rooms", "parking", "built_year", "unit_floor", "floor_count", "elevator", "storage_room"],
          ],
        ]
      : [
          [
            "\u0627\u0637\u0644\u0627\u0639\u0627\u062A " + o.single,
            t,
            o.fields.filter((E) => E.type !== "long").map((E) => E.key),
          ],
        ];
  const baseline = O.useRef(r);
  const mmDirty =
    JSON.stringify(baseline.current) !== JSON.stringify(r) || h || !!d || !!v;
  const mmCancel = () => {
    if (!m && (!frame || !mmDirty || confirm("بدون ذخیره خارج می‌شوید؟"))) i();
  };
  const localEntry=O.useRef({prev:s}).current;
  if(t==='properties') return O.default.createElement(O.default.Fragment,null,O.default.createElement(MaskanPropertyForm,{frame:frame||{entry:localEntry,back:i,all:i},row:e,groups:N,gallery:galleryOf(r),changeGallery:g=>x('galleryDraft',g),work:_,fields:o.fields,renderField:T,address:r.address,lat:r.latitude,lon:r.longitude,pick:(latitude,longitude,address)=>c(prev=>({...prev,latitude,longitude,address})),team:a.team,admin:a.user.role==='admin',assignee:r.assignee,setAssignee:value=>x('assignee',value),save:M,busy:m,dirty:mmDirty,error:p}),ownerMode==='create'&&O.default.createElement(pcForm,{ws:a,nested:true,preset:{category:'owner'},close:()=>setOwnerMode(''),onDone:(id,person)=>{setAdded(prev=>[...prev,{...person,id}]);x('owner_id',id);setOwnerMode('')}}));
  if(t==='tasks'){
    const el=O.default.createElement, field=key=>{const spec=o.fields.find(z=>z.key===key);return spec && T(spec)}, keys=['title','contact_id','listing_id','due_at','priority','status'], tabs=['اطلاعات وظیفه','واگذاری و پیگیری'];
    function taskIcon({index}){return el(j,{name:index?'contacts':'tasks'})}
    function submit(ev){ev.preventDefault();const form=ev.currentTarget, bad=form.querySelector(':invalid,[data-missing="yes"]');if(!bad)return M(ev);const pane=bad.closest('[data-step]');if(pane)setTaskTab(Number(pane.dataset.step));requestAnimationFrame(()=>{bad.focus();if(bad.dataset.missing)g('لطفاً تاریخ الزامی را انتخاب کنید.');else bad.reportValidity()})}
    return el(MaskanModal,{frame:frame||{entry:localEntry,back:i,all:i},title:e?'ویرایش وظیفه':'ثبت وظیفه',heading:el('div',{className:'te-identity'},el(j,{name:'tasks'}),el('div',null,el('strong',null,e?'ویرایش وظیفه':'ثبت وظیفه'),el('small',null,e?.title||'پروندهٔ جدید وظیفه'))),expand:true,size:'wide',blocked:m,dirty:mmDirty,extra:{className:'te13 task22'}},
      el('form',{onSubmit:submit,noValidate:true,className:'te-form'},el('nav',{'aria-label':'بخش‌های وظیفه'},tabs.map((s,j)=>el('button',{key:s,type:'button','aria-pressed':taskTab===j,onClick:()=>setTaskTab(j)},el(taskIcon,{index:j}),s))),el('div',{className:'modal-scroll te-body'},el('h3',{className:'te-section-title'},el(taskIcon,{index:taskTab}),tabs[taskTab]),el('section',{className:'te-grid task-info','data-step':0,hidden:taskTab!==0},...keys.map(field),...o.fields.filter(z=>!keys.includes(z.key)&&z.key!=='result').map(T)),el('section',{className:'te-grid','data-step':1,hidden:taskTab!==1},field('result'),el(Jd,{ws:a,row:e,form:r,set:c}),el('div',{className:'te-follow'},
        el('label',{className:'te-toggle'},el('input',{type:'checkbox',checked:h,onChange:event=>f(event.target.checked)}),'هم‌زمان وظیفهٔ پیگیری بعدی ساخته شود'),
        h&&el('label',null,'عنوان پیگیری بعدی',el('input',{required:true,value:d,onChange:event=>y(event.target.value)})),h&&el('div',{className:'pd-field'},'موعد پیگیری بعدی *',el(Xr,{label:'موعد پیگیری بعدی',timed:true,value:v,change:b,required:true})))),p&&el('p',{role:'alert',className:'error'},p)),
      el('footer',{className:'mp-foot'},el('button',{type:'submit',className:'primary',disabled:m},el(j,{name:'check'}),m?'در حال ذخیره…':'ذخیره'),el('button',{type:'button',disabled:m,onClick:mmCancel},'انصراف'))));
  }
  return O.default.createElement(
    mmDialog,
    {
      frame,
      dirty: mmDirty,
      blocked: m,
      icon: t,
      title:
        (e ? "\u0648\u06CC\u0631\u0627\u06CC\u0634 " : "\u062B\u0628\u062A ") +
        o.single,
      nested: s,
      close: () => !m && i(),
    },
    O.default.createElement(
      "form",
      { onSubmit: M, className: t === "tasks" && e ? "task-edit" : undefined },
      O.default.createElement(
        "div",
        { className: "ms-sections" },
        N.map(([E, S, k], B) =>
          O.default.createElement(
            "section",
            { key: E, className: "ms-card" },
            O.default.createElement(
              "h3",
              null,
              t === "properties" && !e
                ? O.default.createElement(Wd, { kind: S })
                : O.default.createElement(j, { name: S }),
              E,
              O.default.createElement("small", null, F.format(B + 1)),
            ),
            O.default.createElement(
              "div",
              { className: "form-grid" },
              k.map((K) => T(o.fields.find((q) => q.key === K))),
            ),
          ),
        ),
        O.default.createElement(
          "section",
          { className: "ms-card" },
          O.default.createElement(
            "h3",
            null,
            t === "properties" && !e
              ? O.default.createElement(Wd, { kind: "contracts" })
              : O.default.createElement(j, { name: "contracts" }),
            "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0648 \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
            O.default.createElement("small", null, F.format(N.length + 1)),
          ),
          O.default.createElement(
            "div",
            { className: "form-grid" },
            o.fields.filter((E) => E.type === "long").map(T),
            t === "tasks"
              ? O.default.createElement(Jd, { ws: a, row: e, form: r, set: c })
              : a.user.role === "admin" &&
                  O.default.createElement(
                    "label",
                    null,
                    "\u0645\u0633\u0626\u0648\u0644",
                    O.default.createElement(
                      "select",
                      {
                        value: r.assignee,
                        onChange: (E) => x("assignee", E.target.value),
                      },
                      a.team
                        .filter((E) => E.active)
                        .map((E) =>
                          O.default.createElement(
                            "option",
                            { key: E.id, value: E.id },
                            E.name,
                          ),
                        ),
                    ),
                  ),
            ["tasks", "visits", "deals"].includes(t) &&
              O.default.createElement(
                "label",
                { className: "full inline" },
                O.default.createElement("input", {
                  type: "checkbox",
                  checked: h,
                  onChange: (E) => f(E.target.checked),
                }),
                "\u0647\u0645\u200C\u0632\u0645\u0627\u0646 \u0648\u0638\u06CC\u0641\u0647\u0654 \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0628\u0639\u062F\u06CC \u0633\u0627\u062E\u062A\u0647 \u0634\u0648\u062F",
              ),
            h &&
              O.default.createElement(
                O.default.Fragment,
                null,
                O.default.createElement(
                  "label",
                  null,
                  "\u0639\u0646\u0648\u0627\u0646 \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0628\u0639\u062F\u06CC",
                  O.default.createElement("input", {
                    value: d,
                    onChange: (E) => y(E.target.value),
                    required: !0,
                  }),
                ),
                O.default.createElement(
                  "div",
                  { className: "pd-field" },
                  "\u0645\u0648\u0639\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0628\u0639\u062F\u06CC *",
                  O.default.createElement(Xr, {
                    label:
                      "\u0645\u0648\u0639\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0628\u0639\u062F\u06CC",
                    timed: !0,
                    value: v,
                    change: b,
                    required: !0,
                  }),
                ),
              ),
          ),
        ),
      ),
      ["contracts", "payments"].includes(t) &&
        O.default.createElement(
          "p",
          { className: "notice" },
          "\u0627\u06CC\u0646 \u0633\u0646\u062F \u0628\u0639\u062F \u0627\u0632 \u062B\u0628\u062A \u0646\u0647\u0627\u06CC\u06CC \u0642\u0627\u0628\u0644 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0646\u06CC\u0633\u062A.",
          t === "contracts"
            ? " \u0628\u0627 \u062B\u0628\u062A \u0642\u0631\u0627\u0631\u062F\u0627\u062F\u060C \u0641\u0627\u06CC\u0644 \u0639\u0631\u0636\u0647 \u0628\u0633\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."
            : "",
        ),
      O.default.createElement(
        "p",
        { className: "hint" },
        "\u062A\u0627\u0631\u06CC\u062E\u200C\u0647\u0627 \u0634\u0645\u0633\u06CC \u0648 \u0633\u0627\u0639\u062A\u200C\u0647\u0627 \u0628\u0647 \u0648\u0642\u062A \u062A\u0647\u0631\u0627\u0646 \u0647\u0633\u062A\u0646\u062F.",
      ),
      p &&
        O.default.createElement("p", { role: "alert", className: "error" }, p),
      O.default.createElement(
        "footer",
        t === "tasks" && e ? {className:"mp-foot"} : null,
        O.default.createElement(
          "button",
          { className: "primary", disabled: m },
          O.default.createElement(j, { name: "check" }),
          m
            ? "\u062F\u0631 \u062D\u0627\u0644 \u0630\u062E\u06CC\u0631\u0647\u2026"
            : "\u0630\u062E\u06CC\u0631\u0647",
        ),
        O.default.createElement(
          "button",
          { type: "button", onClick: mmCancel, disabled: m },
          "\u0627\u0646\u0635\u0631\u0627\u0641",
        ),
      ),
    ),
  );
}
