function em({ tasks: t, visits: e, today: l, office: a }) {
  let n = Array.from({ length: 7 }, (u, r) => {
      let c = new Date(l + "T12:00:00");
      c.setDate(c.getDate() + r);
      let h = zt(c).slice(0, 10),
        f = t.filter((y) => y.due_at.startsWith(h)).length,
        d = e.filter((y) => y.starts_at.startsWith(h)).length;
      return {
        key: h,
        title:
          r === 0
            ? "\u0627\u0645\u0631\u0648\u0632"
            : r === 1
              ? "\u0641\u0631\u062F\u0627"
              : tE.format(c),
        a: f,
        b: d,
        n: f + d,
      };
    }),
    i = Math.max(1, ...n.map((u) => u.n)),
    s = n.slice(1).reduce((u, r) => (u.n <= r.n ? u : r)),
    o = n.reduce((u, r) => u + r.n, 0);
  return ie.default.createElement(
    "section",
    { className: "panel week-load" },
    ie.default.createElement(
      "header",
      null,
      ie.default.createElement(
        "div",
        null,
        ie.default.createElement(
          "small",
          null,
          a
            ? "\u0628\u0631\u0646\u0627\u0645\u0647\u0654 \u062F\u0641\u062A\u0631"
            : "\u0628\u0631\u0646\u0627\u0645\u0647\u0654 \u0645\u0646",
          " \xB7 \u0627\u0645\u0631\u0648\u0632 \u0648 \u0634\u0634 \u0631\u0648\u0632 \u0622\u06CC\u0646\u062F\u0647",
        ),
        ie.default.createElement(
          "h2",
          null,
          "\u06A9\u062F\u0627\u0645 \u0631\u0648\u0632 \u062E\u0644\u0648\u062A\u200C\u062A\u0631 \u0627\u0633\u062A\u061F",
        ),
      ),
    ),
    ie.default.createElement(
      "div",
      { className: "wl-body" },
      ie.default.createElement(
        "div",
        { className: "wl-key" },
        ie.default.createElement(
          "span",
          null,
          "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0628\u0627\u0632",
        ),
        ie.default.createElement(
          "span",
          null,
          "\u0628\u0627\u0632\u062F\u06CC\u062F \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u0631\u06CC\u0632\u06CC\u200C\u0634\u062F\u0647",
        ),
      ),
      n.map((u) =>
        ie.default.createElement(
          "div",
          {
            className: "wl-day",
            key: u.key,
            "aria-label": `${u.title}: ${F.format(u.a)} \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0648 ${F.format(u.b)} \u0628\u0627\u0632\u062F\u06CC\u062F`,
            title: `${F.format(u.a)} \u067E\u06CC\u06AF\u06CC\u0631\u06CC \xB7 ${F.format(u.b)} \u0628\u0627\u0632\u062F\u06CC\u062F`,
          },
          ie.default.createElement("span", null, u.title),
          ie.default.createElement(
            "div",
            { className: "wl-track" },
            ie.default.createElement("i", {
              style: { width: (u.a / i) * 100 + "%" },
            }),
            ie.default.createElement("i", {
              style: { width: (u.b / i) * 100 + "%" },
            }),
          ),
          ie.default.createElement("b", null, F.format(u.n)),
        ),
      ),
      ie.default.createElement(
        "p",
        null,
        o
          ? n.slice(1).every((u) => u.n === s.n) && s.n
            ? "\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u0647\u0627\u06CC \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u062F\u0631 \u0634\u0634 \u0631\u0648\u0632 \u0622\u06CC\u0646\u062F\u0647 \u0628\u0631\u0627\u0628\u0631 \u0627\u0633\u062A."
            : `${s.title} ${s.n ? "\u0641\u0642\u0637 " + F.format(s.n) + " \u0645\u0648\u0631\u062F \u0628\u0627\u0632 \u062F\u0627\u0631\u062F" : "\u0628\u0631\u0646\u0627\u0645\u0647\u0654 \u0628\u0627\u0632\u06CC \u0646\u062F\u0627\u0631\u062F"}\u061B \u0628\u0631\u0627\u06CC \u0642\u0631\u0627\u0631 \u062C\u062F\u06CC\u062F\u060C \u0633\u0627\u0639\u062A\u200C\u0647\u0627\u06CC \u0622\u0646 \u0631\u0648\u0632 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646\u06CC\u062F.`
          : "\u0647\u0646\u0648\u0632 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0647\u0641\u062A \u0631\u0648\u0632 \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u06CC\u0627 \u0628\u0627\u0632\u062F\u06CC\u062F \u0628\u0627\u0632\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.",
      ),
    ),
  );
}
