function Xr({
  value: t = "",
  change: e,
  timed: l = !1,
  label: a,
  required: n,
}) {
  let i = zt().slice(0, 10),
    s = t.slice(0, 10),
    o = t.slice(11, 16) || "09:00",
    u = Date.parse((s || i) + "T12:00Z"),
    [r, c] = (0, At.useState)(!1),
    [h, f] = (0, At.useState)(() => Gr(u)),
    d = Gr(h + 32 * qi),
    y = (new Date(h).getUTCDay() + 1) % 7;
  function v(b) {
    (e(b ? (l ? b + "T" + o : b) : ""), c(!1));
  }
  return At.default.createElement(
    "div",
    { className: "pd" },
    At.default.createElement(
      "button",
      {
        type: "button",
        "aria-label":
          a +
          "\u061B " +
          (s
            ? Fd.format(u)
            : "\u0627\u0646\u062A\u062E\u0627\u0628 \u062A\u0627\u0631\u06CC\u062E"),
        "aria-expanded": r,
        "data-missing": n && !t ? "yes" : void 0,
        onClick: () => {
          (f(Gr(u)), c(!r));
        },
      },
      At.default.createElement(j, { name: "visits" }),
      s
        ? Fd.format(u)
        : "\u0627\u0646\u062A\u062E\u0627\u0628 \u062A\u0627\u0631\u06CC\u062E \u0634\u0645\u0633\u06CC",
    ),
    r &&
      At.default.createElement(
        "div",
        {
          className: "pd-sheet",
          role: "group",
          "aria-label":
            "\u062A\u0642\u0648\u06CC\u0645 \u0634\u0645\u0633\u06CC",
        },
        At.default.createElement(
          "div",
          { className: "pd-nav" },
          At.default.createElement(
            "button",
            { type: "button", onClick: () => f(Gr(h - qi)) },
            "\u0645\u0627\u0647 \u0642\u0628\u0644",
          ),
          At.default.createElement(
            "b",
            { "aria-live": "polite" },
            P4.format(h),
          ),
          At.default.createElement(
            "button",
            { type: "button", onClick: () => f(d) },
            "\u0645\u0627\u0647 \u0628\u0639\u062F",
          ),
        ),
        At.default.createElement(
          "div",
          { className: "pd-grid" },
          [
            "\u0634",
            "\u06CC",
            "\u062F",
            "\u0633",
            "\u0686",
            "\u067E",
            "\u062C",
          ].map((b) => At.default.createElement("small", { key: b }, b)),
          Array.from({ length: y }, (b, p) =>
            At.default.createElement("span", { key: "b" + p }),
          ),
          Array.from({ length: (d - h) / qi }, (b, p) => {
            let g = W4(h + p * qi);
            return At.default.createElement(
              "button",
              {
                type: "button",
                key: g,
                "aria-label": Fd.format(h + p * qi),
                "aria-pressed": g === s,
                onClick: () => v(g),
              },
              Vb(p + 1),
            );
          }),
        ),
        At.default.createElement(
          "div",
          { className: "pd-nav" },
          At.default.createElement(
            "button",
            { type: "button", onClick: () => v(i) },
            "\u0627\u0645\u0631\u0648\u0632",
          ),
          !n &&
            At.default.createElement(
              "button",
              { type: "button", onClick: () => v("") },
              "\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646",
            ),
          At.default.createElement(
            "button",
            { type: "button", onClick: () => c(!1) },
            "\u0628\u0633\u062A\u0646 \u062A\u0642\u0648\u06CC\u0645",
          ),
        ),
      ),
    l &&
      s &&
      At.default.createElement(
        "div",
        { className: "pd-time" },
        "\u0633\u0627\u0639\u062A \u062A\u0647\u0631\u0627\u0646 ",
        ["\u0633\u0627\u0639\u062A", "\u062F\u0642\u06CC\u0642\u0647"].map(
          (b, p) =>
            At.default.createElement(
              "select",
              {
                key: b,
                "aria-label": a + "\u061B " + b,
                value: o.split(":")[p],
                onChange: (g) =>
                  e(
                    s +
                      "T" +
                      (p
                        ? o.slice(0, 3) + g.target.value
                        : g.target.value + o.slice(2)),
                  ),
              },
              Array.from({ length: p ? 60 : 24 }, (g, m) =>
                String(m).padStart(2, "0"),
              ).map((g) =>
                At.default.createElement("option", { key: g, value: g }, Vb(g)),
              ),
            ),
        ),
      ),
  );
}
