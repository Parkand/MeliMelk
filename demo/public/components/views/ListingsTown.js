function lE() {
  return L.default.createElement(
    "svg",
    { className: "lf-town", viewBox: "0 0 310 130", "aria-hidden": "true" },
    Array.from({ length: 8 }, (t, e) =>
      L.default.createElement("path", {
        key: e,
        d: `M${8 + e * 19} 83l90 39 M${62 + e * 19} 125l116 -49`,
        fill: "none",
        stroke: "#756bb6",
        strokeWidth: ".75",
      }),
    ),
    L.default.createElement("path", {
      d: "M52 80l102 -42 103 43 -106 45z",
      fill: "#7f72c1",
    }),
    L.default.createElement(Kr, { x: 108, y: 72, a: 59, b: 32, h: 52 }),
    L.default.createElement(Kr, {
      x: 175,
      y: 77,
      a: 40,
      b: 30,
      h: 72,
      tone: 1,
      floors: 4,
    }),
    L.default.createElement(Kr, {
      x: 120,
      y: 94,
      a: 44,
      b: 27,
      h: 25,
      tone: 2,
      floors: 2,
    }),
    [
      [65, 91],
      [234, 93],
      [78, 103],
    ].map(([t, e]) =>
      L.default.createElement(
        "g",
        { key: t },
        L.default.createElement("path", {
          d: `M${t} ${e}v10`,
          stroke: "#dcbd9f",
          strokeWidth: "2",
        }),
        L.default.createElement("circle", {
          cx: t,
          cy: e,
          r: "6",
          fill: "#9ddcc5",
        }),
      ),
    ),
  );
}
