function Kb({ ws: t, go: e, create: l, open: a }) {
  let [n, i] = (0, A.useState)(!1),
    s = Object.fromEntries(
      Object.entries(t.data).map(([m, _]) => [
        m,
        n ? _ : _.filter((x) => x.assignee === t.user.id),
      ]),
    ),
    o = zt().slice(0, 10),
    u = zt(new Date(Date.now() - 14 * 864e5)).slice(0, 10),
    r = zt(new Date(Date.now() + 30 * 864e5)).slice(0, 10),
    c = s.tasks.filter(Jr).sort((m, _) => m.due_at.localeCompare(_.due_at)),
    h = c.filter((m) => m.due_at < zt()),
    f = s.visits
      .filter((m) => m.status === "planned")
      .sort((m, _) => m.starts_at.localeCompare(_.starts_at)),
    d = s.listings.filter((m) => m.status === "active"),
    y = d.filter((m) => m.verified < u),
    v = s.deals.filter((m) => !["won", "lost"].includes(m.stage)),
    b = v.filter((m) => m.follow_on <= o),
    p = s.contracts.filter((m) => m.end_on && m.end_on >= o && m.end_on <= r),
    g = (m, _) =>
      Ee(
        m,
        t.data[m].find((x) => x.id === _),
        t.data,
      );
  return A.default.createElement(
    A.default.Fragment,
    null,
    A.default.createElement(lm, {
      ws: t,
      office: n,
      setOffice: i,
      b: s,
      today: o,
      open: a,
      create: l,
    }),
    A.default.createElement(
      "button",
      { className: "primary desk-create-fab", onClick: () => l("tasks") },
      A.default.createElement(j, { name: "tasks" }),
      "\u062B\u0628\u062A \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
    ),
    A.default.createElement(
      "div",
      { className: "stats" },
      [
        [
          "tasks",
          "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0628\u0627\u0632",
          c.length,
          `${F.format(h.length)} \u0645\u0648\u0631\u062F \u0627\u0632 \u0645\u0648\u0639\u062F \u06AF\u0630\u0634\u062A\u0647`,
        ],
        [
          "visits",
          "\u0628\u0627\u0632\u062F\u06CC\u062F \u0647\u0645\u0627\u0647\u0646\u06AF\u200C\u0634\u062F\u0647",
          f.length,
          "\u062F\u0631 \u0628\u0631\u0646\u0627\u0645\u0647\u0654 \u062F\u0641\u062A\u0631",
        ],
        [
          "listings",
          "\u0641\u0627\u06CC\u0644 \u0641\u0639\u0627\u0644",
          d.length,
          `${F.format(y.length)} \u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u062A\u0623\u06CC\u06CC\u062F \u0645\u062C\u062F\u062F`,
        ],
        [
          "deals",
          "\u0645\u0630\u0627\u06A9\u0631\u0647\u0654 \u0628\u0627\u0632",
          v.length,
          `${F.format(b.length)} \u062F\u0631 \u0645\u0648\u0639\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC`,
        ],
      ].map(([m, _, x, M]) =>
        A.default.createElement(
          "button",
          { key: m, className: "stat " + m, onClick: () => e(m) },
          A.default.createElement(
            "span",
            null,
            A.default.createElement(j, { name: m }),
            _,
          ),
          A.default.createElement("b", null, F.format(x)),
          A.default.createElement("small", null, M),
        ),
      ),
    ),
    A.default.createElement(
      "div",
      { className: "board" },
      A.default.createElement(
        nm,
        {
          icon: "tasks",
          caption: "\u0635\u0641 \u0627\u0642\u062F\u0627\u0645",
          title:
            "\u067E\u06CC\u06AF\u06CC\u0631\u06CC\u200C\u0647\u0627\u06CC \u0646\u0632\u062F\u06CC\u06A9",
          go: () => e("tasks"),
        },
        c
          .slice(0, 6)
          .map((m) =>
            A.default.createElement(
              "button",
              { className: "line", key: m.id, onClick: () => a("tasks", m) },
              A.default.createElement("i", {
                className: "dot " + (m.due_at < zt() ? "warm" : ""),
              }),
              A.default.createElement(
                "span",
                null,
                A.default.createElement("b", null, m.title),
                A.default.createElement(
                  "small",
                  null,
                  m.contact_id
                    ? g("contacts", m.contact_id)
                    : "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u062F\u0627\u062E\u0644\u06CC",
                  " \xB7 ",
                  Tt(m.due_at, !0),
                ),
              ),
              A.default.createElement(
                "em",
                null,
                m.due_at < zt()
                  ? "\u0639\u0642\u0628\u200C\u0627\u0641\u062A\u0627\u062F\u0647"
                  : m.due_at.startsWith(o)
                    ? "\u0627\u0645\u0631\u0648\u0632"
                    : "\u067E\u06CC\u0634 \u0631\u0648",
              ),
            ),
          ),
        !c.length &&
          A.default.createElement(
            re,
            null,
            "\u0647\u0645\u0647\u0654 \u067E\u06CC\u06AF\u06CC\u0631\u06CC\u200C\u0647\u0627 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647\u200C\u0627\u0646\u062F.",
          ),
      ),
      A.default.createElement(
        nm,
        {
          icon: "visits",
          caption: "\u062A\u0642\u0648\u06CC\u0645 \u062F\u0641\u062A\u0631",
          title:
            "\u0642\u0631\u0627\u0631\u0647\u0627\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F",
          go: () => e("visits"),
        },
        f
          .slice(0, 4)
          .map((m) =>
            A.default.createElement(
              "button",
              { className: "line", key: m.id, onClick: () => a("visits", m) },
              A.default.createElement(
                "i",
                { className: "tile" },
                A.default.createElement(j, { name: "visits" }),
              ),
              A.default.createElement(
                "span",
                null,
                A.default.createElement("b", null, g("contacts", m.contact_id)),
                A.default.createElement(
                  "small",
                  null,
                  g("listings", m.listing_id),
                ),
                A.default.createElement("small", null, Tt(m.starts_at, !0)),
              ),
            ),
          ),
        !f.length &&
          A.default.createElement(
            re,
            null,
            "\u0628\u0627\u0632\u062F\u06CC\u062F \u0647\u0645\u0627\u0647\u0646\u06AF\u200C\u0634\u062F\u0647\u200C\u0627\u06CC \u0646\u062F\u0627\u0631\u06CC\u062F.",
          ),
      ),
      A.default.createElement(
        nm,
        {
          icon: "clock",
          caption:
            "\u06A9\u0646\u062A\u0631\u0644 \u06A9\u06CC\u0641\u06CC\u062A",
          title:
            "\u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u062A\u0648\u062C\u0647",
        },
        [
          ...y.map((m) => [
            "listings",
            m,
            "\u0628\u06CC\u0634 \u0627\u0632 \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u0632 \u0622\u062E\u0631\u06CC\u0646 \u062A\u0623\u06CC\u06CC\u062F \u06AF\u0630\u0634\u062A\u0647",
          ]),
          ...b.map((m) => ["deals", m, m.next_step]),
          ...p.map((m) => [
            "contracts",
            m,
            "\u0646\u0632\u062F\u06CC\u06A9 \u0628\u0647 \u067E\u0627\u06CC\u0627\u0646: " +
              Tt(m.end_on),
          ]),
        ]
          .slice(0, 8)
          .map(([m, _, x]) =>
            A.default.createElement(
              "button",
              { key: _.id, className: "line", onClick: () => a(m, _) },
              A.default.createElement(j, { name: "clock" }),
              A.default.createElement(
                "span",
                null,
                A.default.createElement("b", null, Ee(m, _, s)),
                A.default.createElement("small", null, x),
              ),
            ),
          ),
        !y.length &&
          !b.length &&
          !p.length &&
          A.default.createElement(
            re,
            null,
            "\u0645\u0648\u0631\u062F\u06CC \u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC \u0646\u06CC\u0633\u062A.",
          ),
      ),
      A.default.createElement(
        "div",
        { className: "load-stack" },
        A.default.createElement(em, {
          tasks: c,
          visits: f,
          today: o,
          office: n,
        }),
        A.default.createElement(
          "section",
          {
            className: "panel quick-strip",
            "aria-label": "\u062B\u0628\u062A \u0633\u0631\u06CC\u0639",
          },
          A.default.createElement(
            "strong",
            null,
            "\u062B\u0628\u062A \u0633\u0631\u06CC\u0639",
          ),
          A.default.createElement(
            "div",
            null,
            ["contacts", "properties", "visits", "deals"].map((m) =>
              A.default.createElement(
                "button",
                { key: m, onClick: () => l(m) },
                A.default.createElement(j, { name: m, size: 16 }),
                ne[m].single,
                " \u062C\u062F\u06CC\u062F",
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
