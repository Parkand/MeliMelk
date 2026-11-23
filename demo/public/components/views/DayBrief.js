function lm({ ws: t, office: e, setOffice: l, b: a, open: n }) {
  let [i, s] = (0, et.useState)(Date.now),
    [o, u] = (0, et.useState)(!1);
  (0, et.useEffect)(() => {
    let p = () => s(Date.now()),
      g = setInterval(p, 15e3);
    return (
      window.addEventListener("focus", p),
      () => {
        (clearInterval(g), window.removeEventListener("focus", p));
      }
    );
  }, []);
  let r = zt(new Date(i)).slice(0, 10),
    c = Math.floor(i / 6e4) * 6e4,
    h = [
      ...a.tasks.map((p) => ({
        r: p,
        k: "tasks",
        title: p.title,
        time: p.due_at,
      })),
      ...a.visits.map((p) => ({
        r: p,
        k: "visits",
        title:
          "\u0628\u0627\u0632\u062F\u06CC\u062F \xB7 " +
          Ee(
            "contacts",
            t.data.contacts.find((g) => g.id === p.contact_id),
            t.data,
          ),
        time: p.starts_at,
      })),
    ]
      .filter((p) => !["absent", "cancelled"].includes(p.r.status))
      .map((p) => ({ ...p, delta: (Date.parse(p.time) - c) / 6e4 })),
    f = h.filter((p) => p.time.startsWith(r)).sort((p, g) => p.delta - g.delta),
    d = f.filter((p) => p.r.status === "done").length,
    y = f.length ? Math.round((d / f.length) * 100) : 0,
    v = h
      .filter((p) => p.r.status !== "done")
      .sort(
        (p, g) => Math.abs(p.delta) - Math.abs(g.delta) || p.delta - g.delta,
      ),
    b = v.slice(0, 3);
  return et.default.createElement(
    et.default.Fragment,
    null,
    et.default.createElement(
      "section",
      { className: "hero day-brief agenda-mini" },
      et.default.createElement(
        "article",
        null,
        et.default.createElement(
          "header",
          null,
          et.default.createElement(
            "h1",
            null,
            e
              ? "\u0627\u0648\u0644\u0648\u06CC\u062A\u200C\u0647\u0627\u06CC \u062F\u0641\u062A\u0631"
              : "\u0627\u0648\u0644\u0648\u06CC\u062A\u200C\u0647\u0627\u06CC \u0645\u0646",
          ),
          t.user.role === "admin" &&
            et.default.createElement(
              "button",
              { onClick: () => l(!e) },
              e
                ? "\u0645\u06CC\u0632 \u0645\u0646"
                : "\u06A9\u0644 \u062F\u0641\u062A\u0631",
            ),
        ),
        b.map((p) => {
          let [g, m] =
            p.delta < 0
              ? ["#bf6975", "\u06AF\u0630\u0634\u062A\u0647"]
              : p.delta <= 60
                ? ["#c58a40", "\u0646\u0632\u062F\u06CC\u06A9"]
                : ["#4e9782", "\u0641\u0631\u0635\u062A \u0647\u0633\u062A"];
          return et.default.createElement(
            "section",
            { className: "agenda-row", key: p.r.id },
            et.default.createElement("i", { style: { backgroundColor: g } }),
            et.default.createElement("span", null, p.title),
            et.default.createElement(
              "small",
              null,
              Tt(p.time, !0),
              " \xB7 ",
              m,
            ),
            et.default.createElement(
              "button",
              {
                className: "link",
                "aria-label": "\u062C\u0632\u0626\u06CC\u0627\u062A " + p.title,
                onClick: () => n(p.k, p.r),
              },
              "\u062C\u0632\u0626\u06CC\u0627\u062A",
            ),
          );
        }),
        !b.length &&
          et.default.createElement(
            "p",
            null,
            "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u06CC\u0627 \u0628\u0627\u0632\u062F\u06CC\u062F \u0628\u0627\u0632\u06CC \u0646\u062F\u0627\u0631\u06CC\u062F.",
          ),
        b.length > 0 &&
          et.default.createElement(
            "a",
            { href: "/desk/" + b[0].k },
            "\u0628\u06CC\u0634\u062A\u0631: ",
            b[0].k === "tasks"
              ? "\u067E\u06CC\u06AF\u06CC\u0631\u06CC\u200C\u0647\u0627"
              : "\u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627",
            " \u2190",
          ),
      ),
      et.default.createElement(
        "button",
        {
          className: "day-ring",
          disabled: !f.length,
          "aria-expanded": o,
          onClick: () => u(!o),
        },
        et.default.createElement(
          "svg",
          { "aria-hidden": "true", viewBox: "0 0 48 48" },
          et.default.createElement("circle", {
            cx: "24",
            cy: "24",
            r: "20",
            fill: "none",
            stroke: "#a8acc8",
            opacity: ".45",
            strokeWidth: "3.5",
          }),
          et.default.createElement("circle", {
            cx: "24",
            cy: "24",
            r: "20",
            fill: "none",
            stroke: "#4a9b89",
            strokeWidth: "3.5",
            pathLength: "100",
            strokeDasharray: `${y} 100`,
            transform: "rotate(-90 24 24)",
          }),
          et.default.createElement(
            "text",
            {
              x: "24",
              y: "27",
              fill: "currentColor",
              textAnchor: "middle",
              fontSize: "10",
            },
            f.length ? F.format(y) + "\u066A" : "\u2014",
          ),
        ),
        f.length
          ? `${F.format(d)} \u0627\u0632 ${F.format(f.length)} \u0627\u0645\u0631\u0648\u0632`
          : "\u0627\u0645\u0631\u0648\u0632 \u0628\u062F\u0648\u0646 \u0628\u0631\u0646\u0627\u0645\u0647",
      ),
    ),
    o &&
      f.length > 0 &&
      et.default.createElement(
        "section",
        { className: "panel" },
        et.default.createElement(
          "header",
          null,
          et.default.createElement(
            "h2",
            null,
            "\u0628\u0631\u0646\u0627\u0645\u0647\u0654 \u0627\u0645\u0631\u0648\u0632",
          ),
        ),
        f.map((p) =>
          et.default.createElement(
            "button",
            { className: "line", key: p.r.id, onClick: () => n(p.k, p.r) },
            et.default.createElement(
              "span",
              null,
              p.title,
              et.default.createElement("small", null, Tt(p.time, !0)),
            ),
            et.default.createElement(
              "em",
              null,
              p.r.status === "done"
                ? "\u2713 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647"
                : "\u062F\u0631 \u0628\u0631\u0646\u0627\u0645\u0647",
            ),
          ),
        ),
      ),
  );
}
