function Bd({ dialog: t, selection: e, ws: l, now: a, statuses: n, open: i }) {
  let [s, o] = (0, yt.useState)({}),
    u = e.agent && s.session === e.session ? s.k : "all",
    r = e.items.filter(
      (c) =>
        u === "all" ||
        (u === "late" ? Ln(c, a) : u === "onTime" ? Wa(c) : c.status === u),
    );
  return yt.default.createElement(
    mmSupervisor,
    { dialog: t, selection: e },
    e.agent &&
      yt.default.createElement(
        "div",
        {
          className: "sv-status-buttons td-tools",
          role: "group",
          "aria-label":
            "\u0641\u06CC\u0644\u062A\u0631 \u0648\u0638\u0627\u06CC\u0641 \u0645\u0634\u0627\u0648\u0631",
        },
        Object.entries({
          all: "\u0647\u0645\u0647\u0654 \u0648\u0636\u0639\u06CC\u062A\u200C\u0647\u0627",
          late: "\u0639\u0642\u0628\u200C\u0627\u0641\u062A\u0627\u062F\u0647",
          onTime:
            "\u062A\u062D\u0648\u06CC\u0644 \u0628\u0647\u200C\u0645\u0648\u0642\u0639",
          ...n,
        }).map(([c, h]) =>
          yt.default.createElement(
            "button",
            {
              type: "button",
              key: c,
              "aria-label": h,
              title: h,
              "data-tip": h,
              "data-key": c,
              "aria-pressed": u === c,
              onClick: () => o({ session: e.session, k: u === c ? "all" : c }),
            },
            yt.default.createElement(j, {
              name: {
                all: "listings",
                open: "tasks",
                waiting: "clock",
                done: "check",
                cancelled: "close",
                late: "audit",
                help: "team",
                onTime: "visits",
              }[c],
              size: 18,
            }),
          ),
        ),
      ),
    yt.default.createElement(
      "div",
      { className: "td-body", key: e.session },
      yt.default.createElement(
        "p",
        { className: "td-count" },
        F.format(r.length),
        " \u0648\u0638\u06CC\u0641\u0647 \u062F\u0631 \u0627\u06CC\u0646 \u0641\u0647\u0631\u0633\u062A",
      ),
      r.length === 0 &&
        yt.default.createElement(
          "p",
          null,
          "\u0648\u0638\u06CC\u0641\u0647\u200C\u0627\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0648\u0636\u0639\u06CC\u062A \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.",
        ),
      r.map((c) => {
        let h = sa(c, a),
          f = e.agent ? "details" : "article",
          d = e.agent ? "summary" : "div";
        return yt.default.createElement(
          f,
          {
            key: c.id,
            "data-tone": h,
            className: e.agent ? "td-fold" : void 0,
          },
          yt.default.createElement(
            d,
            { className: "td-heading" },
            yt.default.createElement("strong", null, c.title),
            yt.default.createElement(
              "span",
              { "data-state": h },
              n[c.status],
              h === "late"
                ? " \xB7 \u0639\u0642\u0628\u200C\u0627\u0641\u062A\u0627\u062F\u0647"
                : h === "onTime"
                  ? " \xB7 \u0628\u0647\u200C\u0645\u0648\u0642\u0639"
                  : "",
            ),
          ),
          yt.default.createElement(
            "dl",
            null,
            [
              [
                "\u0645\u0633\u0626\u0648\u0644 \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
                l.team.find((y) => y.id === c.assignee)?.name ||
                  "\u062A\u0639\u06CC\u06CC\u0646 \u0646\u0634\u062F\u0647",
              ],
              [
                "\u0645\u0648\u0639\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
                c.due_at
                  ? Tt(c.due_at, !0)
                  : "\u062B\u0628\u062A \u0646\u0634\u062F\u0647",
              ],
              [
                "\u0627\u0648\u0644\u0648\u06CC\u062A",
                {
                  normal: "\u0645\u0639\u0645\u0648\u0644\u06CC",
                  high: "\u0641\u0648\u0631\u06CC",
                  low: "\u06A9\u0645",
                }[c.priority] || "\u062B\u0628\u062A \u0646\u0634\u062F\u0647",
              ],
              ...(c.completed_at
                ? [
                    [
                      "\u0632\u0645\u0627\u0646 \u062A\u06A9\u0645\u06CC\u0644",
                      Tt(c.completed_at, !0),
                    ],
                  ]
                : []),
            ].map(([y, v]) =>
              yt.default.createElement(
                "div",
                { key: y },
                yt.default.createElement("dt", null, y),
                yt.default.createElement("dd", null, v),
              ),
            ),
          ),
          c.result &&
            yt.default.createElement(
              "p",
              { className: "td-note" },
              yt.default.createElement(
                "b",
                null,
                "\u0646\u062A\u06CC\u062C\u0647 \u06CC\u0627 \u062A\u0648\u0636\u06CC\u062D\u0627\u062A",
              ),
              c.result,
            ),
          yt.default.createElement(
            "footer",
            null,
            yt.default.createElement(
              "button",
              {
                type: "button",
                onClick: () => {
                  (t.current.close(), i("tasks", c));
                },
              },
              "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u067E\u0631\u0648\u0646\u062F\u0647\u0654 \u0648\u0638\u06CC\u0641\u0647 \u2190",
            ),
          ),
        );
      }),
    ),
  );
}
