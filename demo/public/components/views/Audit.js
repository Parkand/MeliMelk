function Wb({ ws: t, open: e }) {
  let [l, a] = (0, z.useState)(null);
  return z.default.createElement(
    z.default.Fragment,
    null,
    z.default.createElement(sm, {
      text: "\u062F\u0641\u062A\u0631 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
    }),
    z.default.createElement(
      "p",
      { className: "hint" },
      "\u0622\u062E\u0631\u06CC\u0646 \u06F1\u06F5\u06F0 \u062A\u063A\u06CC\u06CC\u0631\u061B \u0634\u0627\u0645\u0644 \u062B\u0628\u062A\u200C\u0647\u0627\u060C \u0648\u0627\u06AF\u0630\u0627\u0631\u06CC\u200C\u0647\u0627 \u0648 \u062A\u063A\u06CC\u06CC\u0631 \u0642\u06CC\u0645\u062A \u0641\u0627\u06CC\u0644.",
    ),
    z.default.createElement(
      "section",
      { className: "panel scroll" },
      z.default.createElement(
        "table",
        { className: "desk-grid" },
        z.default.createElement(
          "thead",
          null,
          z.default.createElement(
            "tr",
            null,
            [
              "\u0632\u0645\u0627\u0646 (\u062A\u0647\u0631\u0627\u0646)",
              "\u0639\u0636\u0648",
              "\u0646\u0648\u0639 \u0631\u0648\u06CC\u062F\u0627\u062F",
              "\u067E\u0631\u0648\u0646\u062F\u0647",
              "\u062A\u063A\u06CC\u06CC\u0631",
            ].map((n) => z.default.createElement("th", { key: n }, n)),
          ),
        ),
        z.default.createElement(
          "tbody",
          null,
          t.audit.map((n) => {
            let i = ne[n.entity],
              s = t.data[n.entity]?.find((o) => o.id === n.record_id);
            return z.default.createElement(
              "tr",
              { key: n.id },
              z.default.createElement(
                "td",
                null,
                z.default.createElement(Gi, {
                  kind: "audit",
                  title: Tt(n.happened_at, !0),
                  onClick: () => a(n),
                }),
              ),
              z.default.createElement(
                "td",
                null,
                t.team.find((o) => o.id === n.actor)?.name,
              ),
              z.default.createElement("td", null, n.action),
              z.default.createElement(
                "td",
                null,
                s
                  ? z.default.createElement(
                      "button",
                      { className: "link", onClick: () => e(i.key, s) },
                      i.single,
                      " \xB7 ",
                      Ee(i.key, s, t.data),
                    )
                  : "\u062A\u06CC\u0645",
              ),
              z.default.createElement("td", null, n.detail),
            );
          }),
        ),
      ),
      !t.audit.length && z.default.createElement(re, null),
    ),
    l &&
      z.default.createElement(
        mmDialog,
        {
          title:
            "\u062C\u0632\u0626\u06CC\u0627\u062A \u0631\u0648\u06CC\u062F\u0627\u062F",
          close: () => a(null),
        },
        z.default.createElement(
          "article",
          { className: "audit-card" },
          z.default.createElement("h3", null, l.action),
          z.default.createElement(
            "small",
            null,
            Tt(l.happened_at, !0),
            " \xB7 ",
            t.team.find((n) => n.id === l.actor)?.name,
          ),
          z.default.createElement("p", null, l.detail),
        ),
      ),
  );
}
