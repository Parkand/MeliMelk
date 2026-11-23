function Ib({ ws: t, open: e }) {
  let l = t.data,
    a = zt(),
    n = l.tasks.filter(Jr),
    i = l.deals.filter((f) => !["won", "lost"].includes(f.stage)),
    s = l.visits.filter((f) => f.status === "planned"),
    o = l.contacts.filter(
      (f) =>
        f.category !== "partner" &&
        ![...n, ...s, ...i].some((d) => d.contact_id === f.id),
    ),
    u = Object.fromEntries(l.contracts.map((f) => [f.id, 0]));
  for (let f of l.payments) u[f.contract_id] += f.amount;
  let r = l.contracts.reduce((f, d) => f + BigInt(d.commission), 0n),
    c = l.payments.reduce((f, d) => f + BigInt(d.amount), 0n),
    h = [
      "\u0642\u0631\u0627\u0631\u062F\u0627\u062F",
      "\u06A9\u0645\u06CC\u0633\u06CC\u0648\u0646 (\u062A\u0648\u0645\u0627\u0646)",
      "\u0648\u0635\u0648\u0644 (\u062A\u0648\u0645\u0627\u0646)",
      "\u0645\u0627\u0646\u062F\u0647 (\u062A\u0648\u0645\u0627\u0646)",
    ];
  return z.default.createElement(
    z.default.Fragment,
    null,
    z.default.createElement(sm, {
      text: "\u06AF\u0632\u0627\u0631\u0634 \u062F\u0641\u062A\u0631",
    }),
    z.default.createElement(
      "div",
      { className: "finance" },
      [
        [
          "\u06A9\u0645\u06CC\u0633\u06CC\u0648\u0646 \u062A\u0648\u0627\u0641\u0642\u200C\u0634\u062F\u0647",
          r,
        ],
        ["\u0648\u0635\u0648\u0644\u200C\u0634\u062F\u0647", c],
        ["\u0645\u0627\u0646\u062F\u0647 \u0648\u0635\u0648\u0644", r - c],
      ].map(([f, d]) =>
        z.default.createElement(
          "div",
          { key: f },
          z.default.createElement("small", null, f),
          z.default.createElement(
            "b",
            null,
            F.format(d),
            " ",
            z.default.createElement(
              "small",
              null,
              "\u062A\u0648\u0645\u0627\u0646",
            ),
          ),
        ),
      ),
    ),
    z.default.createElement(
      "section",
      { className: "panel" },
      z.default.createElement(
        "header",
        null,
        z.default.createElement(
          "div",
          null,
          z.default.createElement(
            "small",
            null,
            "\u0627\u0632 \u0631\u0648\u06CC \u0631\u0633\u06CC\u062F\u0647\u0627\u06CC \u062B\u0628\u062A\u200C\u0634\u062F\u0647",
          ),
          z.default.createElement(
            "h2",
            null,
            "\u0648\u0636\u0639\u06CC\u062A \u0648\u0635\u0648\u0644 \u0647\u0631 \u0642\u0631\u0627\u0631\u062F\u0627\u062F",
          ),
        ),
        z.default.createElement(
          "button",
          {
            onClick: () =>
              Yi("commission", [
                h,
                ...l.contracts.map((f) => [
                  f.code,
                  f.commission,
                  u[f.id],
                  f.commission - u[f.id],
                ]),
              ]),
          },
          "CSV",
        ),
      ),
      z.default.createElement(
        "div",
        { className: "scroll" },
        z.default.createElement(
          "table",
          { className: "desk-grid" },
          z.default.createElement(
            "thead",
            null,
            z.default.createElement(
              "tr",
              null,
              h.map((f) => z.default.createElement("th", { key: f }, f)),
              z.default.createElement(
                "th",
                null,
                "\u0648\u0636\u0639\u06CC\u062A",
              ),
            ),
          ),
          z.default.createElement(
            "tbody",
            null,
            l.contracts.map((f) =>
              z.default.createElement(
                "tr",
                { key: f.id },
                z.default.createElement(
                  "td",
                  null,
                  z.default.createElement(Gi, {
                    kind: "contracts",
                    title: f.code,
                    onClick: () => e("contracts", f),
                  }),
                ),
                [f.commission, u[f.id], f.commission - u[f.id]].map((d, y) =>
                  z.default.createElement("td", { key: y }, F.format(d)),
                ),
                z.default.createElement(
                  "td",
                  null,
                  f.commission === u[f.id]
                    ? "\u062A\u0633\u0648\u06CC\u0647"
                    : u[f.id]
                      ? "\u0648\u0635\u0648\u0644 \u062C\u0632\u0626\u06CC"
                      : "\u0648\u0635\u0648\u0644 \u0646\u0634\u062F\u0647",
                ),
              ),
            ),
          ),
        ),
      ),
      !l.contracts.length && z.default.createElement(re, null),
    ),
    z.default.createElement(
      "div",
      { className: "board gap" },
      z.default.createElement(
        "section",
        { className: "panel" },
        z.default.createElement(
          "header",
          null,
          z.default.createElement(
            "h2",
            null,
            "\u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627\u06CC \u0628\u062F\u0648\u0646 \u0627\u0642\u062F\u0627\u0645 \u0628\u0627\u0632",
          ),
        ),
        o.map((f) =>
          z.default.createElement(
            "button",
            { key: f.id, className: "line", onClick: () => e("contacts", f) },
            z.default.createElement("span", null, f.name),
            z.default.createElement(j, { name: "arrow" }),
          ),
        ),
        !o.length && z.default.createElement(re, null),
      ),
      z.default.createElement(
        "section",
        { className: "panel" },
        z.default.createElement(
          "header",
          null,
          z.default.createElement(
            "h2",
            null,
            "\u067E\u06CC\u06AF\u06CC\u0631\u06CC\u200C\u0647\u0627\u06CC \u0639\u0642\u0628\u200C\u0627\u0641\u062A\u0627\u062F\u0647",
          ),
        ),
        n
          .filter((f) => f.due_at < a)
          .map((f) =>
            z.default.createElement(
              "button",
              { key: f.id, className: "line", onClick: () => e("tasks", f) },
              z.default.createElement(
                "span",
                null,
                z.default.createElement("b", null, f.title),
                z.default.createElement("small", null, Tt(f.due_at, !0)),
              ),
              z.default.createElement(
                "em",
                null,
                t.team.find((d) => d.id === f.assignee)?.name,
              ),
            ),
          ),
        !n.some((f) => f.due_at < a) && z.default.createElement(re, null),
      ),
    ),
  );
}
