function Q4({ tasks: t, today: e, now: l, filter: a, filters: n, match: i }) {
  let [s, o] = (0, vt.useState)(30),
    u = (0, vt.useRef)(null);
  (0, vt.useEffect)(() => {
    let f = u.current;
    function d() {
      for (let v of [...wb, "late", "onTime"]) {
        let b = f
          .closest(".sv-fixed")
          ?.querySelector(`.seven-stats [data-tone="${v}"]`);
        b &&
          f.style.setProperty(
            "--bar-" + v,
            getComputedStyle(b).getPropertyValue("--accent"),
          );
      }
    }
    d();
    let y = new MutationObserver(d);
    return (
      y.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["data-theme", "class", "style"],
      }),
      () => y.disconnect()
    );
  }, []);
  let r = new Date(Date.parse(e + "T12:00:00Z") - (s - 1) * 864e5)
      .toISOString()
      .slice(0, 10),
    c = t.filter((f) => {
      let d = (f.status === "done" ? f.completed_at : f.due_at)?.slice(0, 10);
      return d >= r && d <= e && (!a.length || a.some((y) => i(f, y, l)));
    }),
    h = wb.map((f) => {
      let d = c.filter((v) => v.status === f),
        y = f === "done" ? "onTime" : "late";
      return {
        k: f,
        sub: y,
        num: d.length,
        part: d.filter((v) => i(v, y, l)).length,
      };
    });
  return vt.default.createElement(
    "section",
    { ref: u, className: "phone-bars", dir: "rtl" },
    vt.default.createElement(
      "div",
      { className: "pb-head" },
      vt.default.createElement(
        "h2",
        null,
        "\u0646\u0645\u0627\u06CC \u06A9\u0644\u06CC \u06A9\u0627\u0631\u0647\u0627",
      ),
      vt.default.createElement("b", null, Vr(c.length), " \u06A9\u0627\u0631"),
    ),
    vt.default.createElement(
      "div",
      {
        className: "pb-range",
        role: "group",
        "aria-label":
          "\u0628\u0627\u0632\u0647\u0654 \u0646\u0645\u0648\u062F\u0627\u0631",
      },
      [7, 30, 90].map((f) =>
        vt.default.createElement(
          "button",
          {
            type: "button",
            key: f,
            "aria-pressed": s === f,
            onClick: () => o(f),
          },
          Vr(f),
          " \u0631\u0648\u0632",
        ),
      ),
    ),
    c.length
      ? h.map(({ k: f, num: d, sub: y, part: v }) =>
          vt.default.createElement(
            "div",
            {
              className: "pb-row",
              key: f,
              style: {
                "--tone": `var(--bar-${f},var(--ink))`,
                "--sub": `var(--bar-${y},var(--ink))`,
              },
            },
            vt.default.createElement(
              "div",
              { className: "pb-text" },
              vt.default.createElement("strong", null, n[f]),
              v > 0 &&
                vt.default.createElement("small", null, Vr(v), " ", n[y]),
              vt.default.createElement("b", null, Vr(d), " \u06A9\u0627\u0631"),
            ),
            vt.default.createElement(
              "div",
              { className: "pb-track", "aria-hidden": "true" },
              vt.default.createElement(
                "i",
                { style: { width: `${(100 * d) / c.length}%` } },
                vt.default.createElement("em", {
                  style: { width: `${d ? (100 * v) / d : 0}%` },
                }),
              ),
            ),
          ),
        )
      : vt.default.createElement(
          "p",
          null,
          "\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647 \u0648 \u0628\u0627 \u0627\u06CC\u0646 \u0641\u06CC\u0644\u062A\u0631 \u06A9\u0627\u0631\u06CC \u0646\u06CC\u0633\u062A.",
        ),
    vt.default.createElement(
      "small",
      null,
      "\u0627\u0646\u062C\u0627\u0645\u200C\u0634\u062F\u0647\u200C\u0647\u0627 \u0628\u0631 \u0627\u0633\u0627\u0633 \u062A\u0627\u0631\u06CC\u062E \u062A\u06A9\u0645\u06CC\u0644\u061B \u0633\u0627\u06CC\u0631 \u06A9\u0627\u0631\u0647\u0627 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0645\u0648\u0639\u062F.",
    ),
  );
}
