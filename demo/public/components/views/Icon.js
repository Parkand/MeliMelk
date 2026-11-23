function j({ name: t, size: e = 19 }) {
  return Ge.default.createElement(
    "svg",
    {
      "aria-hidden": "true",
      width: e,
      height: e,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.65",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    Ge.default.createElement("path", { d: kb[t] || kb.home }),
  );
}
