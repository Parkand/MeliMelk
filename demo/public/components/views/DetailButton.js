function Gi({ kind: t, title: e, onClick: l }) {
  return xo.default.createElement(
    "button",
    {
      type: "button",
      className: "row-detail",
      "aria-label": `\u062C\u0632\u0626\u06CC\u0627\u062A ${e}`,
      onClick: l,
    },
    xo.default.createElement(
      "i",
      null,
      xo.default.createElement(j, { name: t }),
    ),
    xo.default.createElement("strong", null, e),
  );
}
