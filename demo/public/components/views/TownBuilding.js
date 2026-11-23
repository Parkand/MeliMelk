function Kr({
  x: t,
  y: e,
  a: l = 44,
  b: a = 31,
  h: n = 45,
  tone: i = 0,
  floors: s = 3,
}) {
  let o = (d, y, v) => `${t + d - y},${e + (d + y) * 0.43 - v}`,
    u = (d, ...y) =>
      L.default.createElement("polygon", {
        fill: d,
        points: y.map((v) => o(...v)).join(" "),
      }),
    [r, c, h, f] = eE[i];
  return L.default.createElement(
    "g",
    null,
    u(c, [0, a, n], [l, a, n], [l, a, 0], [0, a, 0]),
    u(h, [l, a, n], [l, 0, n], [l, 0, 0], [l, a, 0]),
    u(r, [0, 0, n], [l, 0, n], [l, a, n], [0, a, n]),
    Array.from({ length: s }, (d, y) => {
      let v = (n * (y + 0.35)) / (s + 0.1),
        b = (n * 0.4) / s;
      return L.default.createElement(
        "g",
        { key: y },
        Array.from({ length: 4 }, (p, g) => {
          let m = l * (0.07 + 0.235 * g),
            _ = l * 0.15;
          return L.default.createElement(
            "g",
            { key: g },
            u(f, [m, a, v], [m + _, a, v], [m + _, a, v + b], [m, a, v + b]),
          );
        }),
        u(
          f,
          [l, a * 0.12, v],
          [l, a * 0.87, v],
          [l, a * 0.87, v + b * 0.65],
          [l, a * 0.12, v + b * 0.65],
        ),
      );
    }),
  );
}
