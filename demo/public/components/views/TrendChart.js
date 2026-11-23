function Db({ tasks: t, today: e, filter: l, filters: a, match: n, now: i }) {
  let [s, o] = (0, Bt.useState)(30),
    u = (0, Bt.useRef)(null),
    r = (0, Bt.useRef)(null),
    c = Array.from(
      { length: s },
      (v, b) => new Date(Date.parse(e + "T12:00:00Z") + (b - s + 1) * 864e5),
    ),
    h = c.map((v) => X4.format(v)),
    f = new Map(c.map((v, b) => [v.toISOString().slice(0, 10), b])),
    d = Object.entries(a)
      .filter(([v]) => v !== "all" && (!l.length || l.includes(v)))
      .map(([v, b]) => {
        let p = c.map(() => 0);
        for (let g of t) {
          let m = f.get(
            (v === "done" || v === "onTime" ? g.completed_at : g.due_at)?.slice(
              0,
              10,
            ),
          );
          m !== void 0 && n(g, v, i) && p[m]++;
        }
        return { k: v, label: b, data: p };
      }),
    y = JSON.stringify([h, d]);
  return (
    (0, Bt.useEffect)(() => {
      let v = u.current,
        b = r.current,
        p = v.closest(".sv-fixed"),
        g;
      function m() {
        (g?.destroy(), (b.hidden = !0));
        let M = d.map(({ k: T, label: N, data: E }) => {
          let S = p.querySelector(`.seven-stats [data-tone="${T}"]`),
            k =
              (S && getComputedStyle(S).getPropertyValue("--accent").trim()) ||
              "#598264";
          return {
            label: N,
            data: E,
            borderColor: k,
            backgroundColor: k,
            borderWidth: 2,
            pointRadius: s === 7 ? 2 : 0,
            pointHoverRadius: 4,
          };
        });
        g = new Hd(v, {
          type: "line",
          data: { labels: h, datasets: M },
          options: {
            responsive: !0,
            maintainAspectRatio: !1,
            animation: !1,
            locale: "fa-IR",
            interaction: { intersect: !1, mode: "index" },
            plugins: {
              tooltip: {
                enabled: !1,
                external: ({ tooltip: T }) => {
                  if (((b.hidden = !T.opacity), b.hidden)) return;
                  b.replaceChildren();
                  let N = document.createElement("strong");
                  ((N.textContent = T.title[0]), b.append(N));
                  for (let S of T.dataPoints) {
                    let k = document.createElement("div");
                    ((k.style.borderInlineStart =
                      "4px solid " + S.dataset.borderColor),
                      (k.textContent =
                        S.dataset.label + " : " + cd(S.parsed.y)),
                      b.append(k));
                  }
                  let E = v.getBoundingClientRect();
                  ((b.style.left =
                    Math.max(
                      6,
                      Math.min(
                        innerWidth - b.offsetWidth - 6,
                        E.left + T.caretX + 10,
                      ),
                    ) + "px"),
                    (b.style.top =
                      Math.max(
                        6,
                        Math.min(
                          innerHeight - b.offsetHeight - 6,
                          E.top + T.caretY - b.offsetHeight - 8,
                        ),
                      ) + "px"));
                },
              },
            },
            scales: {
              x: {
                grid: { display: !1 },
                ticks: {
                  maxTicksLimit: 5,
                  maxRotation: 0,
                  font: { family: "Vazirmatn" },
                },
              },
              y: {
                beginAtZero: !0,
                suggestedMax: 1,
                ticks: { precision: 0, maxTicksLimit: 4 },
              },
            },
          },
        });
      }
      m();
      let _ = new MutationObserver(m);
      _.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["data-theme"],
      });
      let x = () => (b.hidden = !0);
      return (
        window.addEventListener("scroll", x, !0),
        () => {
          (_.disconnect(),
            window.removeEventListener("scroll", x, !0),
            g.destroy(),
            x());
        }
      );
    }, [y]),
    Bt.default.createElement(
      Bt.default.Fragment,
      null,
      Bt.default.createElement(
        "header",
        { className: "trend-top" },
        Bt.default.createElement(
          "h2",
          null,
          "\u0631\u0648\u0646\u062F \u0648\u0636\u0639\u06CC\u062A \u0648\u0638\u0627\u06CC\u0641",
        ),
        Bt.default.createElement(
          "div",
          {
            role: "group",
            "aria-label":
              "\u0628\u0627\u0632\u0647\u0654 \u0646\u0645\u0648\u062F\u0627\u0631",
          },
          [7, 30, 90].map((v) =>
            Bt.default.createElement(
              "button",
              {
                type: "button",
                key: v,
                "aria-pressed": s === v,
                onClick: () => o(v),
              },
              cd(v),
              " \u0631\u0648\u0632",
            ),
          ),
        ),
      ),
      Bt.default.createElement(
        "p",
        { className: "trend-status-key" },
        d.map(({ k: v, label: b, data: p }) =>
          Bt.default.createElement(
            "span",
            { key: v, "data-tone": v },
            Bt.default.createElement("b", null, b),
            " ",
            cd(p.reduce((g, m) => g + m, 0)),
          ),
        ),
      ),
      Bt.default.createElement(
        "div",
        { className: "trend-plot", dir: "ltr" },
        Bt.default.createElement("canvas", {
          ref: u,
          role: "img",
          "aria-label":
            "\u062A\u0648\u0632\u06CC\u0639 \u0631\u0648\u0632\u0627\u0646\u0647\u0654 " +
            d.map((v) => v.label).join("\u060C "),
        }),
      ),
      Bt.default.createElement("div", {
        className: "trend-readout",
        ref: r,
        hidden: !0,
        dir: "rtl",
      }),
      Bt.default.createElement(
        "small",
        null,
        h[0],
        " \u062A\u0627 ",
        h.at(-1),
        " \xB7 \u0627\u0646\u062C\u0627\u0645\u200C\u0634\u062F\u0647\u200C\u0647\u0627 \u0628\u0631 \u0627\u0633\u0627\u0633 \u062A\u0627\u0631\u06CC\u062E \u062A\u06A9\u0645\u06CC\u0644\u061B \u0633\u0627\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A\u200C\u0647\u0627 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0645\u0648\u0639\u062F",
      ),
    )
  );
}
