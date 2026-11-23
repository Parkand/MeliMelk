function Hb() {
  return Ge.default.createElement(
    "svg",
    {
      className: "city",
      "aria-hidden": "true",
      viewBox: "0 0 270 120",
      fill: "none",
      stroke: "currentColor",
    },
    Ge.default.createElement("path", {
      d: "M0 110h270M5 110V80l22-11 22 12v29M27 69v41M52 110V48l28-15 25 15v62M80 33v77M112 110V65l22-10 21 11v44M134 55v55M163 110V30l26-16 26 17v79M189 14v96M221 110V58l20-11 20 11v52M241 47v63",
    }),
    [55, 65, 75, 85, 95].map((t) =>
      Ge.default.createElement("path", {
        key: t,
        d: `M58 ${t}l16-8 M86 ${t - 7}l14 7 M169 ${t - 14}l15-9 M195 ${t - 22}l14 8`,
      }),
    ),
  );
}
