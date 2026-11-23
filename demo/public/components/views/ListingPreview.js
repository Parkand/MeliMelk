function aE({ r: t, b: e, onDetails: l }) {
  let a = e.properties.find((o) => o.id === t.property_id),
    [n, ...i] = (a?.title || "\u0645\u0644\u06A9").split(/\s*•\s*/),
    s = a?.kind === "office" ? 2 : t.kind === "sale" ? 0 : 1;
  return L.default.createElement(
    "button",
    {
      className: "lf-property lf-record",
      type: "button",
      title: `\u062C\u0632\u0626\u06CC\u0627\u062A ${n}`,
      "aria-label": `\u062C\u0632\u0626\u06CC\u0627\u062A ${n}`,
      onClick: l,
    },
    L.default.createElement(
      "svg",
      {
        className: "lf-mini tone-" + s,
        viewBox: "0 0 100 100",
        "aria-hidden": "true",
      },
      L.default.createElement(Kr, {
        x: 43,
        y: 57,
        h: [45, 27, 34][s],
        tone: s,
      }),
    ),
    L.default.createElement(
      "span",
      null,
      L.default.createElement("strong", null, n),
      i.length > 0 &&
        L.default.createElement("small", null, i.join(" \u2022 ")),
    ),
  );
}
