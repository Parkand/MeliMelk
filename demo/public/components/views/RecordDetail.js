function Yb({
  frame,
  k: t,
  row: e,
  ws: l,
  close: a,
  edit: n,
  create: i,
  open: s,
  nested: o,
  refresh,
}) {
  let u = ne[t],
    r = l.data,
    c =
      (l.user.role === "admin" ||
        e.assignee === l.user.id ||
        (t === "tasks" &&
          l.user.role === "office_manager" &&
          e.creator_id === l.user.id &&
          l.targets.includes(e.assignee))) &&
      !["contracts", "payments"].includes(t) &&
      !(
        (t === "deals" && e.stage === "won") ||
        (t === "listings" && e.status === "closed")
      ),
    h = Object.values(ne).flatMap((d) =>
      r[d.key]
        .filter((y) =>
          d.fields.some((v) => v.target === t && y[v.key] === e.id),
        )
        .map((y) => [d, y]),
    ),
    f = t === "demands" ? Bb(e, r.listings, r.properties) : [];
  if (t === "tasks") return O.default.createElement(TaskDetail, {frame, row:e, ws:l, related:h, canEdit:c, edit:n, create:i, open:s});
  if (t === "contacts")
    return O.default.createElement(MaskanPersonCard, {
      frame,
      refresh: refresh,
      person: e,
      ws: l,
      related: h,
      canEdit: c,
      close: a,
      nested: o,
      edit: n,
      create: i,
      open: s,
    });
  return O.default.createElement(
    mmDialog,
    {
      frame,
      icon: t,
      title: u.single + " | " + Ee(t, e, r),
      nested: o,
      close: a,
    },
    O.default.createElement(
      "div",
      { className: "detail-grid property-facts" },
      u.fields.map((d) =>
        O.default.createElement(
          "div",
          { key: d.key, "data-tone": $d(d), "data-fact": d.key },
          O.default.createElement(
            "small",
            null,
            O.default.createElement(Qr, { field: d.key, f: d }),
            d.label,
          ),
          O.default.createElement(
            "strong",
            null,
            Xe(d, e[d.key], r),
            d.type === "money" && e[d.key] != null
              ? " \u062A\u0648\u0645\u0627\u0646"
              : "",
          ),
        ),
      ),
      O.default.createElement(
        "div",
        null,
        O.default.createElement(
          "small",
          null,
          O.default.createElement(Qr, { field: "assignee" }),
          "\u0645\u0633\u0626\u0648\u0644",
        ),
        O.default.createElement(
          "strong",
          null,
          l.team.find((d) => d.id === e.assignee)?.name,
        ),
      ),
      t === "contracts" &&
        O.default.createElement(
          "div",
          { "data-tone": "spec" },
          O.default.createElement(
            "small",
            null,
            O.default.createElement(j, { name: "payments" }),
            "\u0645\u0627\u0646\u062F\u0647\u0654 \u06A9\u0645\u06CC\u0633\u06CC\u0648\u0646",
          ),
          O.default.createElement(
            "strong",
            null,
            F.format(
              e.commission -
                r.payments
                  .filter((d) => d.contract_id === e.id)
                  .reduce((d, y) => d + y.amount, 0),
            ),
            " \u062A\u0648\u0645\u0627\u0646",
          ),
        ),
    ),
    t === "demands" &&
      O.default.createElement(
        "section",
        { className: "property-history" },
        O.default.createElement(
          "h3",
          null,
          "\u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u0645\u0646\u0637\u0628\u0642 (",
          F.format(f.length),
          ")",
        ),
        O.default.createElement(
          "p",
          { className: "hint" },
          "\u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644 \u0645\u0637\u0627\u0628\u0642 \u0634\u0631\u0648\u0637 \u062B\u0628\u062A\u200C\u0634\u062F\u0647\u060C \u0628\u0647 \u062A\u0631\u062A\u06CC\u0628 \u0622\u062E\u0631\u06CC\u0646 \u062A\u0623\u06CC\u06CC\u062F.",
        ),
        f.map((d) =>
          O.default.createElement(
            "button",
            { key: d.id, onClick: () => s("listings", d) },
            O.default.createElement(j, { name: "listings" }),
            O.default.createElement("span", null, Ee("listings", d, r)),
            O.default.createElement("i", { "aria-hidden": "true" }, "\u2039"),
          ),
        ),
        !f.length &&
          O.default.createElement(
            re,
            null,
            "\u0641\u0627\u06CC\u0644\u06CC \u0645\u0646\u0637\u0628\u0642 \u0628\u0627 \u0627\u06CC\u0646 \u0634\u0631\u0627\u06CC\u0637 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.",
          ),
      ),
    O.default.createElement(
      "section",
      {
        className: "property-history",
        "aria-label":
          "\u0633\u0648\u0627\u0628\u0642 \u0645\u0631\u062A\u0628\u0637",
      },
      O.default.createElement(
        "h3",
        null,
        "\u0633\u0648\u0627\u0628\u0642 \u0645\u0631\u062A\u0628\u0637 ",
        O.default.createElement("small", null, F.format(h.length)),
      ),
      h.length
        ? h.map(([d, y]) =>
            O.default.createElement(
              "button",
              {
                type: "button",
                key: d.key + ":" + y.id,
                onClick: () => s(d.key, y),
              },
              O.default.createElement(j, { name: d.key }),
              O.default.createElement(
                "span",
                null,
                O.default.createElement("small", null, d.single),
                O.default.createElement("b", null, Ee(d.key, y, r)),
              ),
              O.default.createElement("i", { "aria-hidden": "true" }, "\u2039"),
            ),
          )
        : O.default.createElement(
            "p",
            null,
            "\u0647\u0646\u0648\u0632 \u0633\u0627\u0628\u0642\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 ",
            u.single,
            " \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.",
          ),
    ),
    O.default.createElement(
      "footer",
      null,
      t === "tasks" &&
        Kd(e, l).length > 0 &&
        O.default.createElement(
          "button",
          {
            onClick: () =>
              i("tasks", {
                parent_id: e.id,
                assignee: "",
                due_at: e.due_at,
                contact_id: e.contact_id,
                listing_id: e.listing_id,
              }),
          },
          "\u062A\u0639\u0631\u06CC\u0641 \u0632\u06CC\u0631\u06A9\u0627\u0631",
        ),
      c &&
        O.default.createElement(
          "button",
          { className: "primary", onClick: () => n(t, e) },
          "\u0648\u06CC\u0631\u0627\u06CC\u0634 ",
          u.single,
        ),
      t === "contacts" &&
        O.default.createElement(
          O.default.Fragment,
          null,
          O.default.createElement(
            "button",
            { onClick: () => i("tasks", { contact_id: e.id }) },
            "\u062B\u0628\u062A \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
          ),
          O.default.createElement(
            "button",
            { onClick: () => i("demands", { contact_id: e.id }) },
            "\u062B\u0628\u062A \u062A\u0642\u0627\u0636\u0627",
          ),
        ),
      t === "properties" &&
        O.default.createElement(
          "button",
          { onClick: () => i("listings", { property_id: e.id }) },
          "\u0639\u0631\u0636\u0647\u0654 \u0627\u06CC\u0646 \u0645\u0644\u06A9",
        ),
      t === "listings" &&
        e.status === "active" &&
        O.default.createElement(
          O.default.Fragment,
          null,
          O.default.createElement(
            "button",
            { onClick: () => i("visits", { listing_id: e.id }) },
            "\u062A\u0646\u0638\u06CC\u0645 \u0628\u0627\u0632\u062F\u06CC\u062F",
          ),
          O.default.createElement(
            "button",
            { onClick: () => i("deals", { listing_id: e.id }) },
            "\u0634\u0631\u0648\u0639 \u0645\u0630\u0627\u06A9\u0631\u0647",
          ),
        ),
      t === "deals" &&
        l.user.role === "admin" &&
        !["won", "lost"].includes(e.stage) &&
        O.default.createElement(
          "button",
          { onClick: () => i("contracts", { deal_id: e.id }) },
          "\u062B\u0628\u062A \u0642\u0631\u0627\u0631\u062F\u0627\u062F",
        ),
      t === "contracts" &&
        O.default.createElement(
          "button",
          { onClick: () => i("payments", { contract_id: e.id }) },
          "\u062B\u0628\u062A \u062F\u0631\u06CC\u0627\u0641\u062A",
        ),
    ),
  );
}
