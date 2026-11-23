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
        (!u || g[f?.key] === u) &&
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
