function I4({ root: t, items: e, ws: l, now: a, open: n, filter: i, show: s }) {
  let o = jr(e, a),
    u = (r) => l.team.find((c) => c.id === r)?.name || "\u2014";
  return D.default.createElement(
    "article",
    {
      className: "panel commitment",
      "data-status": t.status,
      "data-tone":
        e.length && e.every((r) => sa(r, a) === sa(e[0], a))
          ? sa(e[0], a)
          : "other",
    },
    D.default.createElement(
      "header",
      null,
      D.default.createElement(
        "div",
        null,
        D.default.createElement(
          "small",
          null,
          l.groups.find((r) => r.id === t.group_id)?.name ||
            "\u0648\u0627\u06AF\u0630\u0627\u0631\u06CC \u0645\u0633\u062A\u0642\u06CC\u0645",
          " \xB7 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648: ",
          u(t.assignee),
        ),
        D.default.createElement(
          "h3",
          null,
          D.default.createElement(
            "button",
            { className: "link", onClick: () => n("tasks", t) },
            D.default.createElement(j, { name: "tasks" }),
            t.title,
          ),
        ),
        D.default.createElement(
          "small",
          null,
          D.default.createElement(
            "strong",
            { className: "sc-label" },
            Yr[t.status],
            Wa(t)
              ? " \xB7 \u062A\u062D\u0648\u06CC\u0644 \u0628\u0647\u200C\u0645\u0648\u0642\u0639"
              : "",
          ),
          " \xB7 \u0645\u0648\u0639\u062F: ",
          Tt(t.due_at, !0),
        ),
      ),
    ),
    D.default.createElement(
      "div",
      { className: "card-foot" },
      D.default.createElement(
        "small",
        null,
        "\u0627\u0646\u062C\u0627\u0645\u200C\u0634\u062F\u0647: ",
        ol(o.done),
        " \u0627\u0632 ",
        ol(o.total),
      ),
      D.default.createElement(
        "div",
        { className: "card-tools" },
        [
          [
            "late",
            "\u0639\u0642\u0628\u200C\u0627\u0641\u062A\u0627\u062F\u0647",
            o.late,
          ],
          [
            "help",
            "\u0646\u06CC\u0627\u0632 \u0628\u0647 \u06A9\u0645\u06A9",
            o.help,
          ],
          [
            "all",
            "\u06A9\u0627\u0631 \u0627\u062C\u0631\u0627\u06CC\u06CC",
            e.length,
          ],
        ].map(([r, c, h]) =>
          D.default.createElement(
            "button",
            {
              key: r,
              className: "sv-icon sv-" + r,
              "aria-label": `${c}: ${ol(h)}`,
              "data-count": h,
              "data-tip": c,
              "aria-haspopup": "dialog",
              onClick: () =>
                s(
                  c,
                  e.filter((f) => _o(f, r, a)),
                ),
            },
            D.default.createElement(j, {
              name: { late: "clock", help: "team", all: "tasks" }[r],
              size: 16,
            }),
            ol(h),
          ),
        ),
      ),
    ),
  );
}
