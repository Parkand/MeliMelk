function Zd({ ws: t, open: e, create: l }) {
  let a = D.default.useRef(null),
    [n, i] = (0, D.useState)({ title: "", items: [] });
  function s(w, Q, lt = !1) {
    (i((ge) => ({
      title: w,
      items: Q,
      agent: lt,
      session: (ge.session || 0) + 1,
    })),
      a.current.showModal());
  }
  let [o, u] = (0, D.useState)(!1),
    [r, c] = (0, D.useState)("");
  D.default.useEffect(() => {
    let w = matchMedia("(max-width:800px)"),
      Q = () => {
        w.matches && c("");
      };
    return (
      w.addEventListener("change", Q),
      () => w.removeEventListener("change", Q)
    );
  }, []);
  let h = (w, Q) => {
      let lt = r === w,
        ge =
          (lt
            ? "\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0686\u06CC\u062F\u0645\u0627\u0646 \u0639\u0627\u062F\u06CC: "
            : "\u06AF\u0633\u062A\u0631\u0634: ") + Q;
      return D.default.createElement(
        "button",
        {
          className: "desk-expand",
          type: "button",
          title: ge,
          "aria-label": ge,
          "aria-expanded": lt,
          onClick: () => c(lt ? "" : w),
        },
        D.default.createElement(
          "svg",
          {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.7",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
          },
          D.default.createElement("path", {
            d: lt ? "M3 9h6V3m12 12h-6v6" : "M9 3H3v6m12 12h6v-6",
          }),
          D.default.createElement("path", { d: "M4 4l5 5m6 6 5 5" }),
        ),
      );
    },
    [f, d] = (0, D.useState)("week");
  D.default.useLayoutEffect(() => {
    window.matchMedia("(max-width:800px)").matches && d("cards");
  }, []);
  let [y, v] = (0, D.useState)(() => zt().slice(0, 10)),
    [b, p] = (0, D.useState)(""),
    [g, m] = (0, D.useState)(""),
    [_, x] = (0, D.useState)([]),
    [M, T] = (0, D.useState)(""),
    [N, E] = (0, D.useState)(0),
    S = zt(),
    k = M
      ? zt(new Date(Date.now() - (Number(M) - 1) * 864e5)).slice(0, 10)
      : "",
    B = S.slice(0, 10),
    [K, q] = (0, D.useState)(1),
    Y = D.default.useRef(null);
  D.default.useLayoutEffect(() => {
    if (!Y.current) return;
    let w = Y.current,
      Q = () => {
        if (window.matchMedia("(max-width:800px)").matches) {
          q(10);
          return;
        }
        let ge = Math.max(1, Math.floor((w.clientWidth + 8) / 238)),
          Qi = Math.max(1, Math.floor((w.clientHeight + 8) / 179));
        (w.style.setProperty("--columns", ge),
          w.style.setProperty("--rows", Qi),
          q(ge * Qi));
      };
    Q();
    let lt = new ResizeObserver(Q);
    return (lt.observe(w), () => lt.disconnect());
  }, [f]);
  let bt = Ud(t.data.tasks).map(({ root: w, items: Q }) => ({
      root: w,
      items: Q.filter(
        (lt) =>
          (!b ||
            (w.group_id ||
              t.team.find((ge) => ge.id === lt.assignee)?.group_id) === b) &&
          (!g || lt.assignee === g),
      ),
    })),
    Pa = bt
      .map(({ root: w, items: Q }) => ({
        root: w,
        items: Q.filter(
          (lt) =>
            !M || (lt.due_at.slice(0, 10) >= k && lt.due_at.slice(0, 10) <= B),
        ),
      }))
      .filter((w) => w.items.length),
    Ul = new Map();
  for (let { items: w } of Ud(t.data.tasks))
    for (let Q of w)
      Q.status !== "cancelled" &&
        (Ul.has(Q.assignee) || Ul.set(Q.assignee, []),
        Ul.get(Q.assignee).push(Q));
  let Un = (w) => (w === "all" ? !_.length : _.includes(w)),
    Bl = (w) => {
      (x((Q) =>
        w === "all"
          ? []
          : Q.includes(w)
            ? Q.filter((lt) => lt !== w)
            : [...Q, w],
      ),
        E(0));
    },
    Ra = (w) => !_.length || _.some((Q) => _o(w, Q, S)),
    vl = Pa.flatMap((w) => w.items),
    ca = jr(vl, S),
    Ze = Pa.filter((w) => w.items.some(Ra)).sort((w, Q) =>
      w.root.due_at.localeCompare(Q.root.due_at),
    ),
    Vl = Math.max(1, Math.ceil(Ze.length / K)),
    Ce = Math.min(N, Vl - 1),
    So = (w) => (Q) => {
      (w(Q), E(0));
    },
    cm = D.default.createElement(
      "div",
      {
        className: "sv-status-buttons phone-status",
        role: "group",
        "aria-label":
          "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627\u06CC \u0645\u06CC\u0632 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0648\u0636\u0639\u06CC\u062A",
      },
      Object.entries(Xd).map(([w, Q]) => {
        let lt = ol(vl.filter((ge) => _o(ge, w, S)).length);
        return D.default.createElement(
          "button",
          {
            type: "button",
            key: w,
            "aria-label": `${Q}\u060C ${lt} \u06A9\u0627\u0631`,
            "data-tip": Q,
            "data-key": w,
            "aria-pressed": Un(w),
            onClick: () => Bl(w),
          },
          D.default.createElement(j, {
            name: {
              all: "listings",
              open: "tasks",
              waiting: "clock",
              done: "check",
              cancelled: "close",
              late: "audit",
              help: "team",
              onTime: "visits",
            }[w],
            size: 18,
          }),
          D.default.createElement(
            "span",
            { className: "phone-count", "aria-hidden": "true" },
            lt,
          ),
        );
      }),
    );
  return D.default.createElement(
    "div",
    { className: "supervisor sv-fixed", "data-kpi-open": o },
    D.default.createElement(
      "button",
      { className: "primary desk-create-fab", onClick: () => l("tasks") },
      D.default.createElement(j, { name: "plus" }),
      "\u0648\u0627\u06AF\u0630\u0627\u0631\u06CC \u0648\u0638\u06CC\u0641\u0647",
    ),
    cm,
    D.default.createElement(
      "div",
      { id: "desk-kpi-details", className: "stats seven-stats" },
      Object.entries(Xd)
        .filter(([w]) => w !== "all")
        .map(([w, Q]) =>
          D.default.createElement(
            "button",
            {
              type: "button",
              className: "stat",
              "data-tone": w,
              key: w,
              style: { textAlign: "start", cursor: "pointer" },
              "aria-pressed": Un(w),
              onClick: () => Bl(w),
            },
            D.default.createElement(
              "span",
              { className: "k-title" },
              D.default.createElement("i", { "aria-hidden": "true" }, "\u2713"),
              Q,
            ),
            D.default.createElement(
              "b",
              null,
              ol(vl.filter((lt) => _o(lt, w, S)).length),
            ),
            D.default.createElement("small", { className: "k-hint" }, F4[w]),
          ),
        ),
    ),
    D.default.createElement(
      "section",
      {
        className: "viewbar",
        "aria-label":
          "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627 \u0648 \u0646\u0645\u0627\u06CC \u0645\u06CC\u0632",
      },
      D.default.createElement(
        "div",
        { className: "toolbar-right" },
        D.default.createElement(
          "div",
          {
            className: "switcher",
            role: "group",
            "aria-label":
              "\u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0645\u0627",
          },
          [
            [
              "week",
              "\u0632\u0645\u0627\u0646\u200C\u0628\u0646\u062F\u06CC",
              "visits",
            ],
            ["cards", "\u06A9\u0627\u0631\u062A\u200C\u0647\u0627", "cards"],
          ].map(([w, Q, lt]) =>
            D.default.createElement(
              "button",
              {
                key: w,
                title: Q,
                "aria-label": Q,
                "aria-controls": "display",
                "aria-pressed": f === w,
                onClick: () => d(w),
              },
              w === "week"
                ? D.default.createElement(j, { name: lt })
                : D.default.createElement(
                    "svg",
                    {
                      width: "19",
                      height: "19",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "1.7",
                    },
                    [
                      [3, 3],
                      [14, 3],
                      [3, 14],
                      [14, 14],
                    ].map(([ge, Qi]) =>
                      D.default.createElement("rect", {
                        key: ge + "," + Qi,
                        x: ge,
                        y: Qi,
                        width: "7",
                        height: "7",
                        rx: "1.4",
                      }),
                    ),
                  ),
            ),
          ),
        ),
        D.default.createElement(
          "details",
          { className: "flt" },
          D.default.createElement(
            "summary",
            {
              title:
                "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627\u06CC \u06AF\u0631\u0648\u0647\u060C \u0645\u062C\u0631\u06CC \u0648 \u0645\u0648\u0639\u062F",
              "aria-label":
                "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627\u06CC \u0645\u06CC\u0632",
            },
            D.default.createElement(j, { name: "demands" }),
          ),
          D.default.createElement(
            "div",
            null,
            D.default.createElement(Qd, {
              label: "\u06AF\u0631\u0648\u0647",
              value: b,
              set: So(p),
              options: [
                [
                  "",
                  "\u0647\u0645\u0647\u0654 \u06AF\u0631\u0648\u0647\u200C\u0647\u0627 \u0648 \u06A9\u0627\u0631\u0647\u0627\u06CC \u0645\u0633\u062A\u0642\u06CC\u0645",
                ],
                ...t.groups.map((w) => [w.id, w.name]),
              ],
            }),
            D.default.createElement(Qd, {
              label: "\u0645\u062C\u0631\u06CC",
              value: g,
              set: So(m),
              options: [
                [
                  "",
                  "\u0647\u0645\u0647\u0654 \u0645\u062C\u0631\u06CC\u0627\u0646",
                ],
                ...t.team
                  .filter((w) => t.targets.includes(w.id))
                  .map((w) => [w.id, w.name]),
              ],
            }),
            D.default.createElement(Qd, {
              label: "\u0628\u0627\u0632\u0647\u0654 \u0645\u0648\u0639\u062F",
              value: M,
              set: So(T),
              options: [
                [
                  "",
                  "\u0647\u0645\u0647\u0654 \u0645\u0648\u0639\u062F\u0647\u0627",
                ],
                [
                  "7",
                  "\u0647\u0641\u062A \u0631\u0648\u0632 \u0645\u0646\u062A\u0647\u06CC \u0628\u0647 \u0627\u0645\u0631\u0648\u0632",
                ],
                [
                  "30",
                  "\u0633\u06CC \u0631\u0648\u0632 \u0645\u0646\u062A\u0647\u06CC \u0628\u0647 \u0627\u0645\u0631\u0648\u0632",
                ],
              ],
            }),
          ),
        ),
        D.default.createElement(
          "button",
          {
            className: "kpi-reveal",
            type: "button",
            "aria-controls": "desk-kpi-details",
            "aria-expanded": o,
            "aria-label": o
              ? "\u062C\u0645\u0639 \u06A9\u0631\u062F\u0646 \u0634\u0627\u062E\u0635\u200C\u0647\u0627"
              : "\u0646\u0645\u0627\u06CC\u0634 \u0634\u0627\u062E\u0635\u200C\u0647\u0627",
            title: o
              ? "\u062C\u0645\u0639 \u06A9\u0631\u062F\u0646 \u0634\u0627\u062E\u0635\u200C\u0647\u0627"
              : "\u0646\u0645\u0627\u06CC\u0634 \u0634\u0627\u062E\u0635\u200C\u0647\u0627",
            onClick: () => u((w) => !w),
          },
          D.default.createElement(
            "svg",
            {
              width: "18",
              height: "18",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.7",
              "aria-hidden": "true",
            },
            D.default.createElement("rect", {
              x: "3",
              y: "3",
              width: "18",
              height: "18",
              rx: "3",
            }),
            D.default.createElement("path", {
              d: o ? "m8 14 4-4 4 4" : "m8 10 4 4 4-4",
            }),
          ),
        ),
      ),
      cm,
      D.default.createElement(
        "button",
        {
          className: "add",
          title:
            "\u0648\u0627\u06AF\u0630\u0627\u0631\u06CC \u0648\u0638\u06CC\u0641\u0647",
          "aria-label":
            "\u0648\u0627\u06AF\u0630\u0627\u0631\u06CC \u0648\u0638\u06CC\u0641\u0647",
          onClick: () => l("tasks"),
        },
        D.default.createElement(j, { name: "plus" }),
      ),
    ),
    D.default.createElement(
      "div",
      { className: "manager-board", "data-focus": r },
      D.default.createElement(
        "aside",
        { className: "manager-side" },
        D.default.createElement(
          "section",
          { className: "manager-box people" },
          h("people", "\u0645\u0634\u0627\u0648\u0631\u0647\u0627"),
          D.default.createElement(
            "h2",
            null,
            D.default.createElement(j, { name: "team", size: 18 }),
            "\u0645\u0634\u0627\u0648\u0631\u0647\u0627",
          ),
          t.team
            .filter((w) => w.role === "agent")
            .map((w) => {
              let Q = Ul.get(w.id) || [],
                lt = jr(Q, S);
              return D.default.createElement(
                "button",
                {
                  className: "person",
                  key: w.id,
                  "aria-haspopup": "dialog",
                  onClick: () => s(w.name, Q, !0),
                },
                D.default.createElement("b", { dir: "auto" }, w.name),
                D.default.createElement(
                  "small",
                  null,
                  "\u0645\u062D\u0648\u0644\u200C\u0634\u062F\u0647: ",
                  ol(lt.total),
                  " \xB7 \u0627\u0646\u062C\u0627\u0645\u200C\u0634\u062F\u0647: ",
                  ol(lt.done),
                  " \xB7 \u0645\u0627\u0646\u062F\u0647: ",
                  ol(lt.total - lt.done),
                ),
              );
            }),
        ),
        D.default.createElement(
          "section",
          { className: "manager-box" },
          D.default.createElement(
            "h2",
            null,
            "\u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0635\u0645\u06CC\u0645",
          ),
          [
            [
              "help",
              "\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u06A9\u0645\u06A9",
              ca.help,
            ],
            [
              "late",
              "\u0639\u0642\u0628\u200C\u0627\u0641\u062A\u0627\u062F\u0647",
              ca.late,
            ],
          ].map(([w, Q, lt]) =>
            D.default.createElement(
              "button",
              {
                className: "line",
                key: w,
                onClick: () => {
                  (So(x)([w]), d("cards"));
                },
              },
              Q,
              " \xB7 ",
              ol(lt),
            ),
          ),
        ),
      ),
      D.default.createElement(
        "div",
        { className: "manager-main" },
        D.default.createElement(
          "section",
          { className: "desk-fold" },
          h(
            "desk",
            "\u06A9\u0627\u0631\u062A\u200C\u0647\u0627 \u0648 \u0632\u0645\u0627\u0646\u200C\u0628\u0646\u062F\u06CC",
          ),
          D.default.createElement(
            "div",
            { id: "display" },
            f === "week"
              ? D.default.createElement(Yd, {
                  day: y,
                  setDay: v,
                  open: e,
                  statuses: Yr,
                  now: S,
                  show: s,
                  today: B,
                  tasks: Ze.flatMap((w) => w.items.filter(Ra)),
                })
              : D.default.createElement(
                  "div",
                  { className: "deck" },
                  D.default.createElement(
                    "div",
                    { className: "sv-grid", ref: Y },
                    Ze.slice(Ce * K, (Ce + 1) * K).map((w) =>
                      D.default.createElement(I4, {
                        key: [w.root.id, _, g, M, b].join(":"),
                        ...w,
                        ws: t,
                        now: S,
                        open: e,
                        filter: _,
                        show: s,
                      }),
                    ),
                  ),
                  !Ze.length &&
                    D.default.createElement(
                      re,
                      null,
                      "\u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648\u0638\u06CC\u0641\u0647\u200C\u0627\u06CC \u0646\u06CC\u0633\u062A.",
                    ),
                  D.default.createElement(
                    "div",
                    { className: "pager" },
                    D.default.createElement(
                      "button",
                      { disabled: !Ce, onClick: () => E(Ce - 1) },
                      "\u0642\u0628\u0644\u06CC",
                    ),
                    ol(Ce + 1),
                    " \u0627\u0632 ",
                    ol(Vl),
                    D.default.createElement(
                      "button",
                      { disabled: Ce + 1 === Vl, onClick: () => E(Ce + 1) },
                      "\u0628\u0639\u062F\u06CC",
                    ),
                  ),
                ),
          ),
        ),
        D.default.createElement(
          "section",
          { className: "manager-box trend-desk" },
          h("trend", "\u0646\u0645\u0648\u062F\u0627\u0631"),
          D.default.createElement(Ld, {
            tasks: bt.flatMap((w) => w.items),
            today: B,
            filter: _,
            filters: Xd,
            match: _o,
            now: S,
          }),
        ),
      ),
    ),
    D.default.createElement(Bd, {
      dialog: a,
      selection: n,
      ws: t,
      now: S,
      statuses: Yr,
      open: e,
    }),
  );
}
