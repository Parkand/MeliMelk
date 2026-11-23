function Yd({
  day: t,
  setDay: e,
  today: l,
  tasks: a,
  open: n,
  statuses: i,
  now: s,
  show: o,
}) {
  let u = (M) => (sa(M, s) === "other" ? M.status : sa(M, s)),
    [r, c] = (0, P.useState)(2),
    h = (M) =>
      ({
        onTime: "\u062E\u0648\u0634\u200C\u0642\u0648\u0644\u06CC",
        late: "\u0639\u0642\u0628\u200C\u0627\u0641\u062A\u0627\u062F\u0647",
        mixed: "\u0686\u0646\u062F \u0648\u0636\u0639\u06CC\u062A",
      })[M] || i[M],
    [f, d] = (0, P.useState)(() => (window.innerWidth < 760 ? "day" : "week")),
    [y, v] = (0, P.useState)(null),
    b = (0, P.useRef)(null),
    p = f === "week" ? Vd(t, -((jd(t).getUTCDay() + 1) % 7)) : t,
    g = Array.from({ length: f === "week" ? 7 : 1 }, (M, T) => Vd(p, T)),
    m = new Map();
  for (let M of a) {
    let T = M.due_at.slice(0, 16);
    g.includes(T.slice(0, 10)) && (m.has(T) || m.set(T, []), m.get(T).push(M));
  }
  function _(M) {
    e(Vd(t, M * g.length));
  }
  let x = m.get(y) || [];
  return P.default.createElement(
    "section",
    {
      className: "plan2",
      dir: "rtl",
      "aria-label":
        "\u062A\u0642\u0648\u06CC\u0645 \u0645\u0648\u0639\u062F\u0647\u0627",
    },
    P.default.createElement(
      "header",
      null,
      P.default.createElement(
        "div",
        null,
        P.default.createElement(
          "small",
          null,
          "\u062A\u0642\u0648\u06CC\u0645 \u0645\u0648\u0639\u062F\u0647\u0627",
        ),
        P.default.createElement(
          "h3",
          null,
          Tt(p),
          f === "week" && " \u2014 " + Tt(g[6]),
        ),
      ),
      P.default.createElement(
        "nav",
        null,
        P.default.createElement(
          "button",
          {
            "aria-label": "\u0628\u0627\u0632\u0647\u0654 \u0642\u0628\u0644",
            onClick: () => _(-1),
          },
          "\u276E",
        ),
        P.default.createElement(
          "button",
          { onClick: () => e(l) },
          "\u0627\u0645\u0631\u0648\u0632",
        ),
        P.default.createElement(
          "button",
          {
            "aria-label": "\u0628\u0627\u0632\u0647\u0654 \u0628\u0639\u062F",
            onClick: () => _(1),
          },
          "\u276F",
        ),
      ),
      P.default.createElement(
        "nav",
        null,
        [
          ["day", "\u0631\u0648\u0632"],
          ["week", "\u0647\u0641\u062A\u0647"],
        ].map(([M, T]) =>
          P.default.createElement(
            "button",
            { key: M, "aria-pressed": f === M, onClick: () => d(M) },
            T,
          ),
        ),
      ),
    ),
    P.default.createElement(
      "div",
      { className: "timebands" },
      [0, 1, 2, 3, 4, 5].map((M) =>
        P.default.createElement(
          "button",
          { key: M, "aria-pressed": r === M, onClick: () => c(M) },
          vo(String(4 * M)),
          "\u2013",
          vo(String(4 * M + 4)),
        ),
      ),
    ),
    P.default.createElement(
      "div",
      { ref: b, className: "plan-scroll" },
      P.default.createElement(
        "div",
        { className: "plan-grid", style: { "--cols": g.length } },
        P.default.createElement(
          "div",
          { className: "plan-cap" },
          "\u0633\u0627\u0639\u062A",
        ),
        g.map((M) =>
          P.default.createElement(
            "button",
            {
              className: "plan-cap",
              key: M,
              "aria-current": M === l ? "date" : void 0,
              onClick: () => {
                (e(M), d("day"));
              },
            },
            Z4[(jd(M).getUTCDay() + 1) % 7],
            P.default.createElement("br", null),
            Tt(M).split(" ").slice(0, 2).join(" "),
          ),
        ),
        P.default.createElement(
          "div",
          { className: "plan-axis" },
          Array.from({ length: 4 }, (M, T) =>
            P.default.createElement(
              "small",
              { key: T },
              vo(String(T + 4 * r).padStart(2, "0") + ":00"),
            ),
          ),
        ),
        g.map((M) => {
          let T = [...m.keys()]
              .filter(
                (S) =>
                  S.startsWith(M) &&
                  Math.floor(Number(S.slice(11, 13)) / 4) === r,
              )
              .sort(),
            N = [],
            E = T.map((S) => {
              let k = Number(S.slice(11, 13)) * 60 + Number(S.slice(14, 16)),
                B = N.findIndex((K) => K <= k);
              return (
                B < 0 && (B = N.length),
                (N[B] = k + 25),
                { x: S, minute: k, lane: B }
              );
            });
          return P.default.createElement(
            "div",
            { key: M, className: "plan-column" },
            E.map(({ x: S, minute: k, lane: B }) => {
              let K = m.get(S),
                q = K[0],
                Y = K.every((bt) => u(bt) === u(q)) ? u(q) : "mixed";
              return P.default.createElement(
                "button",
                {
                  key: S,
                  className: "plan-event",
                  "data-tone": Y,
                  "data-kpi": Y,
                  style: {
                    top: ((k - r * 240) / 240) * 100 + "%",
                    insetInlineStart: `${(B * 100) / N.length}%`,
                    width: `${100 / N.length}%`,
                  },
                  title: `${vo(S.slice(11))} \xB7 ${h(Y)} \xB7 ${q.title}`,
                  onClick: () =>
                    K.length === 1
                      ? n("tasks", q)
                      : o(
                          "\u0645\u0648\u0639\u062F\u0647\u0627\u06CC \u0647\u0645\u200C\u0632\u0645\u0627\u0646",
                          K,
                        ),
                },
                P.default.createElement(
                  "small",
                  null,
                  vo(S.slice(11)),
                  " \xB7 ",
                  h(Y),
                  " ",
                  K.length > 1 &&
                    `\xB7 ${F.format(K.length)} \u0645\u0648\u0639\u062F`,
                ),
                P.default.createElement("b", null, q.title),
              );
            }),
          );
        }),
      ),
    ),
    x.length > 0 &&
      P.default.createElement(
        "section",
        { className: "plan-list" },
        P.default.createElement(
          "strong",
          null,
          Tt(y, !0),
          " \xB7 \u0645\u0648\u0639\u062F\u0647\u0627\u06CC \u0647\u0645\u200C\u0632\u0645\u0627\u0646",
        ),
        P.default.createElement(
          "button",
          { onClick: () => v(null) },
          "\u0628\u0633\u062A\u0646",
        ),
        x.map((M) =>
          P.default.createElement(
            "button",
            { key: M.id, "data-kpi": u(M), onClick: () => n("tasks", M) },
            M.title,
            " \xB7 ",
            h(u(M)),
          ),
        ),
      ),
  );
}
