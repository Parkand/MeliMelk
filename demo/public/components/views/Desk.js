function om({ section: t = "home" }) {
  let [e, l] = (0, U.useState)(!1);
  (0, U.useEffect)(() => {
    try {
      l(localStorage.getItem("desk-icon-rail") === "1");
    } catch {}
  }, []);
  function a() {
    l(!e);
    try {
      localStorage.setItem("desk-icon-rail", e ? "0" : "1");
    } catch {}
  }
  let n = Zr(),
    [i, s] = (0, U.useState)(null),
    [o, u] = (0, U.useState)(null),
    [r, c] = (0, U.useState)(!1),
    [h, f] = (0, U.useState)(""),
    [d, y] = (0, U.useState)(""),
    v = (0, U.useCallback)(async () => {
      f("");
      try {
        let S = await sl("workspace");
        if (!Fr(t, S.user.role)) {
          location.replace("/desk/home");
          return;
        }
        return (s(S), S);
      } catch (S) {
        S.status === 401
          ? location.replace("/login")
          : f(
              t === "home" && !/[آ-ی]/.test(S.message)
                ? "\u062F\u0631\u06CC\u0627\u0641\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062F\u0641\u062A\u0631 \u0645\u0645\u06A9\u0646 \u0646\u0634\u062F. \u0627\u062A\u0635\u0627\u0644 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646\u06CC\u062F."
                : S.message,
            );
      }
    }, [t]);
  ((0, U.useEffect)(() => {
    v();
  }, [v]),
    (0, U.useEffect)(() => {
      if (!d) return;
      let S = setTimeout(() => y(""), 3600);
      return () => clearTimeout(S);
    }, [d]));
  const [pageBusy,setPageBusy]=U.useState(false), refreshLock=U.useRef(false);
  async function manualRefresh(modal=false){
    if(refreshLock.current)throw new Error('بازخوانی دیگری در جریان است.');
    refreshLock.current=true;if(!modal)setPageBusy(true);
    try {
      const fresh=await sl('workspace');
      if(!Fr(t,fresh.user.role)){location.replace('/desk/home');return}
      const row=o?.row && fresh.data[o.k]?.find(item=>item.id===o.row.id);
      if(modal&&o?.row&&!row)throw new Error('این رکورد دیگر در دسترس نیست.');
      s(fresh);f('');
      if(modal&&o?.type==='editor')u(current=>current===o?{...o,row,revision:(o.revision||0)+1}:current);
    }catch(err){if(err.status===401)location.replace('/login');if(modal)throw err;f(err.message||'بازخوانی ناموفق بود.')}finally{refreshLock.current=false;if(!modal)setPageBusy(false)}
  }
  let b = (S) => u((k) => ({ ...S, prev: k })),
    p = () => u((S) => S?.prev ?? null),
    g = (S) => {
      location.href = "/desk/" + S;
    },
    m = (S, k) => b({ type: "detail", k: S, row: k }),
    _ = (S, k = {}) => b({ type: "editor", k: S, preset: k }),
    x = (S, k) => b({ type: "editor", k: S, row: k }),
    M = { ws: i, go: g, open: m, create: _ };
  async function T(S) {
    let k = o.k;
    y(
      "\u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.",
    );
    let K = (await v())?.data[k]?.find((q) => q.id === S);
    u((q) =>
      q !== o
        ? q
        : K
          ? {
              type: "detail",
              k,
              row: K,
              prev:
                q.prev?.k === k && q.prev?.row?.id === S ? q.prev.prev : q.prev,
            }
          : (q.prev ?? null),
    );
  }
  async function N() {
    try {
      (await sl("logout", "POST", {}), location.replace("/login"));
    } catch (S) {
      f(S.message);
    }
  }
  if (!i)
    return U.default.createElement(
      "main",
      { className: "loading" },
      U.default.createElement(po, null),
      U.default.createElement(
        "p",
        { role: "status" },
        h ||
          "\u062F\u0631 \u062D\u0627\u0644 \u062F\u0631\u06CC\u0627\u0641\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062F\u0641\u062A\u0631\u2026",
      ),
      h &&
        U.default.createElement(
          "button",
          { onClick: v },
          "\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647",
        ),
    );
  let E = [
    [
      "\u0645\u06CC\u0632 \u06A9\u0627\u0631",
      ["home", "tasks", "visits", "workflow"],
    ],
    [
      "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062F\u0641\u062A\u0631",
      ["contacts", "properties", "listings", "demands"],
    ],
    [
      "\u0645\u0639\u0627\u0645\u0644\u0647 \u0648 \u0645\u0627\u0644\u06CC",
      ["deals", "contracts", "payments", "reports"],
    ],
    ["\u0645\u062F\u06CC\u0631\u06CC\u062A", ["team", "audit"]],
  ];
  return U.default.createElement(MaskanModal.RefreshContext.Provider,{value:()=>manualRefresh(true)},U.default.createElement(
    "div",
    {
      className: "shell",
      "data-rail": e,
      "data-desk": t,
      onInvalidCapture: ["home", "tasks"].includes(t) ? iE : void 0,
      onChangeCapture: ["home", "tasks"].includes(t)
        ? (S) => S.target.setCustomValidity?.("")
        : void 0,
    },
    r &&
      U.default.createElement("button", {
        className: "veil",
        "aria-label": "\u0628\u0633\u062A\u0646 \u0645\u0646\u0648",
        onClick: () => c(!1),
      }),
    U.default.createElement(
      "aside",
      { className: r ? "sidebar show" : "sidebar" },
      U.default.createElement(po, null),
      U.default.createElement(
        "button",
        {
          type: "button",
          className: "icon rail-switch",
          title: e
            ? "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0645\u0646\u0648"
            : "\u062C\u0645\u0639 \u06A9\u0631\u062F\u0646 \u0645\u0646\u0648",
          "aria-label": e
            ? "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0645\u0646\u0648"
            : "\u062C\u0645\u0639 \u06A9\u0631\u062F\u0646 \u0645\u0646\u0648",
          "aria-controls": "desk-navigation",
          "aria-expanded": !e,
          onClick: a,
        },
        U.default.createElement(j, { name: "menu" }),
      ),
      U.default.createElement(
        "nav",
        {
          id: "desk-navigation",
          "aria-label": "\u0645\u0646\u0648\u06CC \u062F\u0641\u062A\u0631",
        },
        E.map(
          ([S, k]) =>
            k.some((B) => Fr(B, i.user.role)) &&
            U.default.createElement(
              "div",
              { key: S },
              U.default.createElement("small", null, S),
              k
                .filter((B) => Fr(B, i.user.role))
                .map((B) =>
                  U.default.createElement(
                    "a",
                    {
                      key: B,
                      title: e ? Xi[B] : void 0,
                      "aria-label": Xi[B],
                      href: "/desk/" + B,
                      className: t === B ? "selected" : "",
                      "aria-current": t === B ? "page" : void 0,
                    },
                    U.default.createElement(j, {
                      name: B === "workflow" ? "tasks" : B,
                    }),
                    U.default.createElement(
                      "span",
                      { className: "rail-label" },
                      Xi[B],
                    ),
                  ),
                ),
            ),
        ),
      ),
    ),
    U.default.createElement(
      "div",
      { className: "workspace" },
      U.default.createElement(
        "header",
        { className: "topbar" },
        U.default.createElement(
          "button",
          {
            className: "icon menu-btn",
            "aria-label": "\u0645\u0646\u0648\u06CC \u062F\u0641\u062A\u0631",
            onClick: () => c(!r),
          },
          U.default.createElement(j, { name: "menu" }),
        ),
        U.default.createElement(
          "h1",
          { className: "desk-page-name" },
          t === "home" && i.user.role !== "agent"
            ? "\u0645\u06CC\u0632 \u0645\u062F\u06CC\u0631\u06CC\u062A \u062F\u0641\u062A\u0631"
            : Xi[t],
        ),
        U.default.createElement("span", { className: "spacer" }),
        U.default.createElement("small", null, Tt(zt().slice(0, 10))),
        U.default.createElement(
          "button",
          {
            className: "icon",
            title: "\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC",
            "aria-label":
              "\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC",
            onClick: () => manualRefresh(), disabled:pageBusy,
          },
          U.default.createElement(j, { name: "refresh" }),
        ),
        pageBusy&&U.default.createElement('div',{className:'mm-page-refresh'},MaskanModal.refreshStatus(U.default)),
        U.default.createElement(tm, {
          user: i.user,
          appearance: n,
          password: (S) => u({ type: "password", restore: S }),
          logout: N,
        }),
      ),
      U.default.createElement(
        "main",
        { className: "content" },
        h &&
          U.default.createElement(
            "p",
            { className: "error", role: "alert" },
            h,
            " ",
            U.default.createElement(
              "button",
              { onClick: v },
              "\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647",
            ),
          ),
        t === "workflow"
          ? U.default.createElement(Rh, null)
          : t === "home"
            ? i.user.role === "agent"
              ? U.default.createElement(Kb, { ...M })
              : U.default.createElement(Zd, { ...M })
            : Object.hasOwn(ne, t)
              ? U.default.createElement(Jb, { key: t, k: t, ...M })
              : t === "reports"
                ? U.default.createElement(Ib, { ...M })
                : t === "team"
                  ? U.default.createElement(Fb, { ws: i, load: v })
                  : U.default.createElement(Wb, { ...M }),
      ),
    ),
    o?.type === "detail" &&
      U.default.createElement(Yb, {
        frame: mmScope(o, () => u(null), p),
        refresh: v,
        key: o.row.id,
        k: o.k,
        row: i.data[o.k].find((S) => S.id === o.row.id) ?? o.row,
        ...M,
        close: p,
        nested: !!o.prev,
        edit: x,
      }),
    o?.type === "editor" &&
      U.default.createElement(pcDispatch, {
        frame: mmScope(o, () => u(null), p),
        key: o.k + (o.row?.id ?? "new") + ':' + (o.revision||0),
        k: o.k,
        ws: i,
        row: o.row,
        preset: o.preset,
        onDone: T,
        close: p,
        nested: !!o.prev,
      }),
    o?.type === "password" &&
      U.default.createElement(sE, {
        all: () => u(null),
        close: () => {
          (u(null), o.restore?.());
        },
      }),
    d &&
      U.default.createElement(
        "div",
        { className: "toast", role: "status" },
        U.default.createElement(j, { name: "check" }),
        d,
      ),
  ));
}
