function Xb({ value: t, change: e }) {
  return V.default.createElement(
    "fieldset",
    { className: "palette-picker" },
    V.default.createElement(
      "legend",
      null,
      "\u062A\u0645 \u0628\u0631\u0646\u0627\u0645\u0647",
    ),
    Object.entries(Zb).map(([l, a]) =>
      V.default.createElement(
        "button",
        {
          type: "button",
          key: l,
          "data-swatch": l,
          "aria-pressed": t === l,
          onClick: () => e(l),
        },
        V.default.createElement("i", { "aria-hidden": "true" }),
        a,
        t === l ? " \u2713" : "",
      ),
    ),
  );
}
