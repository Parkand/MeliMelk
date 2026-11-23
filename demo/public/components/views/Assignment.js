function Jd({ ws: t, row: e, form: l, set: a }) {
  let n = t.data.tasks.find((r) => r.id === l.parent_id),
    i = !!l.parent_id,
    s =
      !qr(e, t.user) ||
      t.user.role === "agent" ||
      (!!e && t.data.tasks.some((r) => r.parent_id === e.id)),
    o = t.groups.find((r) => r.id === l.group_id),
    u = i ? Kd(n, t) : t.team.filter((r) => t.targets.includes(r.id));
  return s
    ? Oe.default.createElement(
        "p",
        { className: "hint full" },
        "\u0645\u062C\u0631\u06CC \u06CC\u0627 \u0645\u0633\u0626\u0648\u0644 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648: ",
        t.team.find((r) => r.id === l.assignee)?.name,
        " ",
        o && ` \xB7 ${o.name}`,
      )
    : Oe.default.createElement(
        Oe.default.Fragment,
        null,
        !i &&
          t.groups.length > 0 &&
          Oe.default.createElement(
            "label",
            null,
            "\u0646\u062D\u0648\u0647\u0654 \u0648\u0627\u06AF\u0630\u0627\u0631\u06CC",
            Oe.default.createElement(
              "select",
              {
                value: l.group_id || "",
                onChange: (r) => {
                  let c = t.groups.find((h) => h.id === r.target.value);
                  a((h) => ({
                    ...h,
                    group_id: c?.id || null,
                    assignee: c?.manager_id || t.user.id,
                  }));
                },
              },
              Oe.default.createElement(
                "option",
                { value: "" },
                "\u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u0647 \u0634\u062E\u0635",
              ),
              t.groups.map((r) =>
                Oe.default.createElement(
                  "option",
                  { key: r.id, value: r.id },
                  r.name,
                  " \xB7 ",
                  t.team.find((c) => c.id === r.manager_id)?.name,
                ),
              ),
            ),
          ),
        o
          ? Oe.default.createElement(
              "p",
              { className: "hint" },
              "\u067E\u0627\u0633\u062E\u200C\u06AF\u0648\u06CC \u06AF\u0631\u0648\u0647: ",
              t.team.find((r) => r.id === o.manager_id)?.name,
            )
          : Oe.default.createElement(
              "label",
              null,
              i
                ? "\u0645\u062C\u0631\u06CC \u0632\u06CC\u0631\u06A9\u0627\u0631"
                : "\u0645\u0633\u0626\u0648\u0644 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648",
              Oe.default.createElement(
                "select",
                {
                  required: !0,
                  value: l.assignee,
                  onChange: (r) =>
                    a((c) => ({ ...c, assignee: r.target.value })),
                },
                Oe.default.createElement(
                  "option",
                  { value: "" },
                  "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F",
                ),
                u.map((r) =>
                  Oe.default.createElement(
                    "option",
                    { key: r.id, value: r.id },
                    r.name,
                  ),
                ),
              ),
            ),
        n &&
          Oe.default.createElement(
            "p",
            { className: "hint full" },
            "\u0648\u0638\u06CC\u0641\u0647\u0654 \u0627\u0635\u0644\u06CC: ",
            n.title,
            " \xB7 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648: ",
            t.team.find((r) => r.id === n.assignee)?.name,
          ),
      );
}
