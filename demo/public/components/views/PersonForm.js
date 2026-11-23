function pcForm({ frame, row, ws, preset = {}, close, nested, onDone }) {
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
    })),
    [base] = R.useState(v),
    [tab, T] = R.useState(0),
    [err, E] = R.useState(""),
    [attempt, tried] = R.useState(false),
    picker = R.useRef(null),
    [busy, B] = R.useState(false),
    dirty = JSON.stringify(base) !== JSON.stringify(v),
    put = (key, val) => set((p) => ({ ...p, [key]: val })),
    pf = v.profile || {},
    pr = (k, val) =>
      set((p) => ({ ...p, profile: { ...p.profile, [k]: val } })),
    label = (s, input) => h("label", { key: s }, s, input),
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
    select = (value, fn, dict) =>
      h(
        "select",
        { value: value || "", onChange: (e) => fn(e.target.value) },
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
    cancel = () => {
      if (!busy && (!dirty || confirm("تغییرات ذخیره نشده است. خارج می‌شوید؟")))
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
      E(ex.message);
    } finally {
      B(false);
    }
  }
  async function save(e) {
    e.preventDefault();
    if (busy) return;
    tried(true);
    if (!v.name?.trim() || !v.phone?.trim()) {
      T(0);
      E("");
      return;
    }
    if (!e.currentTarget.reportValidity()) return;
    B(true);
    E("");
    try {
      const category =
        roles.includes("owner") && roles.includes("customer")
          ? "both"
          : roles.find((s) => s !== "referrer") || null;
      const { incoming, ...body } = v;
      body.links = v.links.map(({ draft, kind, id }) => ({
        id,
        kind: draft === undefined ? kind : relEncode(draft),
      }));
      const result = await sl(
        "records/contacts" + (row ? "/" + row.id : ""),
        row ? "PUT" : "POST",
        { ...body, category, profile: { ...pf, roles } },
      );
      await onDone(result.id);
    } catch (ex) {
      E(ex.message);
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
        "div",
        { key: k },
        h("strong", null, s + " · " + rows.length),
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
  return h(
    mmDialog,
    {
      frame,
      nested,
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
          "header",
          { className: "pc-id" },
          pf.photo
            ? h("img", {
                src: pf.photo,
                alt: "تصویر مشتری",
                width: 56,
                height: 56,
              })
            : h("b", null, v.name?.trim().slice(0, 1) || "＋"),
          h(
            "div",
            null,
            h("strong", null, v.name || "شخص جدید"),
            h("small", null, display || "پروندهٔ مشتری"),
          ),
          h("input",{type:"file",hidden:true,ref:picker,accept:"image/png,image/jpeg,image/webp",onChange:photo}),
          h("button",{type:"button",title:"تغییر تصویر","aria-label":"تغییر تصویر",onClick:()=>picker.current.click()},"✎"),
          pf.photo && h("button",{type:"button",title:"حذف تصویر","aria-label":"حذف تصویر",onClick:()=>pr("photo","")},"×"),
        ),
        h(
          "nav",
          { "aria-label": "بخش‌های پرونده" },
          [
            "اطلاعات ضروری",
            "مشخصات فردی",
            "راه‌های ارتباط",
            "آشنایی و روابط",
            "پیگیری و سوابق",
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
          null,
          ...(tab === 0
            ? [
                ...[["name", "نام نمایشی", "نام نمایشی را وارد کنید."], ["phone", "موبایل اصلی", "موبایل اصلی را وارد کنید."]].map(([key, caption, message]) => {
                  const bad = attempt && !v[key]?.trim();
                  return h("label", {key}, caption + " *", h("input", {type:key === "phone" ? "tel" : "text", dir:key === "phone" ? "ltr" : "rtl", value:v[key] || "", maxLength:240, "aria-required":true,"aria-invalid":bad,onChange:e=>put(key,e.target.value)}),bad && h("small",{role:"alert"},message));
                }),
                h(
                  "div",
                  {className:"ce-wide"},
                  h("strong", null, "نقش‌ها"),
                  ...Object.entries(pcRoles).map(([k, s]) =>
                    label(
                      s,
                      h("input", {
                        type: "checkbox",
                        checked: roles.includes(k),
                        onChange: (e) =>
                          pr(
                            "roles",
                            e.target.checked
                              ? [...roles, k]
                              : roles.filter((x) => x !== k),
                          ),
                      }),
                    ),
                  ),
                ),

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
                    h("div",{className:"ce-bar"},h("strong",null,"راه‌های تماس"),button("＋ افزودن",()=>put("methods",[...v.methods,{kind:"mobile",value:""}]))),
                    ...list("methods", v.methods, (m, change) => [
                      label(
                        "نوع",
                        select(m.kind, (x) => change("kind", x), pcMethods),
                      ),
                      label(
                        "مقدار",
                        h("input", {
                          dir: "ltr",
                          value: m.value,
                          maxLength: 240,
                          onChange: (e) => change("value", e.target.value),
                        }),
                      ),
                      label(
                        "برچسب",
                        h("input", {
                          value: m.label || "",
                          maxLength: 60,
                          onChange: (e) => change("label", e.target.value),
                        }),
                      ),
                    ]),
                    ...[
                      ["preferred", "روش تماس ترجیحی"],
                      ["time", "زمان مناسب تماس"],
                      ["city", "شهر"],
                      ["area", "محله"],
                    ].map(([k, s]) => field(k, s, true)),
                  ]
                : tab === 3
                  ? [
                      h(
                        "datalist",
                        { id: "rel-" + (row?.id || "new") },
                        ...[
                          ...new Set([
                            ...Object.values(pcKinds),
                            ...(ws.data.relationNames || []),
                            ...ws.data.contacts.flatMap((c) =>
                              (c.links || [])
                                .filter((l) => l.kind.startsWith("custom:"))
                                .map((l) => relText(l.kind)),
                            ),
                          ]),
                        ].map((s) => h("option", { key: s, value: s })),
                      ),
                      h("strong",{className:"ce-wide"},"آشنایی"),
                      field("source", "منبع آشنایی"),
                      h(
                        "small",
                        null,
                        "شخص انتخابی چه نسبتی با صاحب این پرونده دارد؟",
                      ),
                      h("strong",{className:"ce-wide"},"روابط"),
                      ...list("links", v.links, (l, change) => [
                        label(
                          "پروندهٔ مرتبط",
                          select(l.id, (x) => change("id", x), {
                            "": "انتخاب شخص",
                            ...names,
                          }),
                        ),
                        label(
                          "نوع رابطه",
                          h("input", {
                            list: "rel-" + (row?.id || "new"),
                            required: true,
                            maxLength: 48,
                            value: l.draft ?? relText(l.kind),
                            placeholder: "انتخاب یا نوشتن رابطه",
                            onChange: (e) => change("draft", e.target.value),
                          }),
                        ),
                      ]),
                      button("افزودن ارتباط", () =>
                        put("links", [
                          ...v.links,
                          {
                            kind: v.links.some((l) => l.kind === "referrer")
                              ? "partner"
                              : "referrer",
                            id: "",
                          },
                        ]),
                      ),
                      ...pcSummary({ incoming: row?.incoming }, ws).map(
                        ([s, n]) => h("p", { key: s + n }, s + ": " + n),
                      ),
                    ]
                  : [
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
                      h("div",{className:"ce-stats"},history("tasks", "پیگیری"),
                      history("demands", "تقاضا"),
                      history("visits", "بازدید"),
                      history("deals", "معامله")),
                    ]),
        ),
      ),
      err && h("p", { role: "alert" }, err),
      h(
        "footer",
        null,
        h(
          "button",
          { type: "submit", disabled: busy },
          busy ? "در حال ذخیره…" : "✓ ذخیره و بستن",
        ),
        button("انصراف", cancel),
      ),
    ),
  );
}
