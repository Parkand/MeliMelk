function am({
  b: t,
  rows: e,
  fields: l,
  selector: a,
  query: n,
  filter: i,
  idx: s,
  pages: o,
  open: u,
  create: r,
  onQuery: c,
  onFilter: h,
  onPage: f,
}) {
  let d = t.listings,
    y = d.length,
    v = (m) => F.format(m),
    b = s * 25,
    p = e.slice(b, b + 25),
    g = () =>
      Yi("listings", [
        l.map(
          (m) =>
            m.label +
            (m.type === "money" ? " (\u062A\u0648\u0645\u0627\u0646)" : ""),
        ),
        ...e.map((m) => l.map((_) => Xe(_, m[_.key], t))),
      ]);
  return L.default.createElement(
    "div",
    { className: "lf" },
    L.default.createElement(
      "section",
      { className: "lf-hero" },
      L.default.createElement(
        "div",
        null,
        L.default.createElement(
          "small",
          null,
          "\u0639\u0645\u0644\u06CC\u0627\u062A \u062F\u0641\u062A\u0631 / \u0645\u062F\u06CC\u0631\u06CC\u062A \u0639\u0631\u0636\u0647",
        ),
        L.default.createElement(
          "h1",
          null,
          "\u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u0639\u0631\u0636\u0647",
        ),
        L.default.createElement(
          "p",
          null,
          "\u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u0641\u0631\u0648\u0634 \u0648 \u0627\u062C\u0627\u0631\u0647\u0654 \u062F\u0641\u062A\u0631 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u06A9\u0646\u06CC\u062F.",
        ),
      ),
      L.default.createElement(lE, null),
    ),
    L.default.createElement(
      "button",
      {
        type: "button",
        className: "primary lf-create-fab",
        onClick: () => r("listings"),
      },
      L.default.createElement(j, { name: "plus", size: 20 }),
      "\u062B\u0628\u062A \u0641\u0627\u06CC\u0644 \u062C\u062F\u06CC\u062F",
    ),
    L.default.createElement(
      "div",
      { className: "lf-stats" },
      [
        [
          "listings",
          "\u06A9\u0644 \u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u0639\u0631\u0636\u0647",
          y,
        ],
        [
          "properties",
          "\u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644",
          d.filter((m) => m.status === "active").length,
        ],
        [
          "check",
          "\u0645\u0639\u0627\u0645\u0644\u0647\u200C\u0634\u062F\u0647",
          d.filter((m) => m.status === "closed").length,
        ],
      ].map(([m, _, x], M) =>
        L.default.createElement(
          "div",
          { className: "lf-stat tone-" + M, key: m },
          L.default.createElement(
            "i",
            null,
            L.default.createElement(j, { name: m, size: 23 }),
          ),
          L.default.createElement("strong", null, _),
          L.default.createElement("b", null, v(x)),
        ),
      ),
    ),
    L.default.createElement(
      "section",
      { className: "panel lf-ledger" },
      L.default.createElement(
        "div",
        { className: "lf-head" },
        L.default.createElement(
          "h2",
          null,
          "\u0641\u0647\u0631\u0633\u062A \u0641\u0627\u06CC\u0644\u200C\u0647\u0627",
        ),
        L.default.createElement(
          "span",
          null,
          v(e.length),
          " \u0641\u0627\u06CC\u0644",
        ),
        L.default.createElement(
          "small",
          null,
          "\u0645\u0628\u0627\u0644\u063A \u062C\u062F\u0648\u0644 \u0628\u0647 \u062A\u0648\u0645\u0627\u0646 \u0627\u0633\u062A",
        ),
      ),
      L.default.createElement(
        "div",
        { className: "tools" },
        L.default.createElement(
          "label",
          { className: "search" },
          L.default.createElement(j, { name: "search" }),
          L.default.createElement("input", {
            "aria-label":
              "\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u062F\u0631 \u0641\u0627\u06CC\u0644\u200C\u0647\u0627",
            placeholder:
              "\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u062F\u0631 \u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u2026",
            value: n,
            onChange: (m) => c(m.target.value),
          }),
        ),
        L.default.createElement(
          "label",
          { className: "lf-filter" },
          L.default.createElement(j, { name: "demands", size: 17 }),
          L.default.createElement(
            "select",
            {
              "aria-label":
                "\u0648\u0636\u0639\u06CC\u062A \u0639\u0631\u0636\u0647",
              value: i,
              onChange: (m) => h(m.target.value),
            },
            L.default.createElement(
              "option",
              { value: "" },
              "\u0647\u0645\u0647\u0654 \u0648\u0636\u0639\u06CC\u062A\u200C\u0647\u0627",
            ),
            Object.entries(a.choices).map(([m, _]) =>
              L.default.createElement("option", { key: m, value: m }, _),
            ),
          ),
        ),
        L.default.createElement(
          "button",
          { className: "lf-csv", onClick: g },
          L.default.createElement(j, { name: "down", size: 17 }),
          "\u062E\u0631\u0648\u062C\u06CC CSV",
        ),
      ),
      L.default.createElement(
        "div",
        { className: "scroll" },
        L.default.createElement(
          "table",
          null,
          L.default.createElement(
            "thead",
            null,
            L.default.createElement(
              "tr",
              null,
              l.map((m) =>
                L.default.createElement("th", { key: m.key }, m.label),
              ),
              L.default.createElement(
                "th",
                null,
                "\u067E\u0631\u0648\u0646\u062F\u0647",
              ),
            ),
          ),
          L.default.createElement(
            "tbody",
            null,
            p.map((m) =>
              L.default.createElement(
                "tr",
                { key: m.id },
                l.map((_) =>
                  L.default.createElement(
                    "td",
                    { key: _.key },
                    _.key === "property_id"
                      ? L.default.createElement(aE, {
                          r: m,
                          b: t,
                          onDetails: () => u("listings", m),
                        })
                      : _.choices
                        ? L.default.createElement(
                            "span",
                            {
                              className:
                                "lf-tag lf-" +
                                m[_.key] +
                                (_.key === "status" ? " lf-status" : ""),
                            },
                            Xe(_, m[_.key], t),
                          )
                        : Xe(_, m[_.key], t),
                  ),
                ),
                L.default.createElement(
                  "td",
                  null,
                  L.default.createElement(
                    "button",
                    { className: "link", onClick: () => u("listings", m) },
                    "\u062C\u0632\u0626\u06CC\u0627\u062A ",
                    L.default.createElement(j, { name: "arrow", size: 14 }),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      !e.length &&
        L.default.createElement(
          re,
          null,
          y
            ? "\u0641\u0627\u06CC\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06CC\u0627 \u0648\u0636\u0639\u06CC\u062A \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F."
            : "\u0647\u0646\u0648\u0632 \u0641\u0627\u06CC\u0644\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.",
        ),
      L.default.createElement(
        "div",
        { className: "pager" },
        L.default.createElement(
          "span",
          null,
          e.length
            ? `\u0646\u0645\u0627\u06CC\u0634 ${v(b + 1)} \u062A\u0627 ${v(b + p.length)} \u0627\u0632 ${v(e.length)} \u0641\u0627\u06CC\u0644`
            : "\u06F0 \u0641\u0627\u06CC\u0644",
        ),
        L.default.createElement(
          "button",
          {
            "aria-label":
              "\u0635\u0641\u062D\u0647\u0654 \u0642\u0628\u0644\u06CC",
            disabled: !s,
            onClick: () => f(s - 1),
          },
          "\u2192",
        ),
        L.default.createElement("b", null, v(s + 1)),
        L.default.createElement(
          "button",
          {
            "aria-label":
              "\u0635\u0641\u062D\u0647\u0654 \u0628\u0639\u062F\u06CC",
            disabled: s + 1 >= o,
            onClick: () => f(s + 1),
          },
          "\u2190",
        ),
      ),
    ),
  );
}
