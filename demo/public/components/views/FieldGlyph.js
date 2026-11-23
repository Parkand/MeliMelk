function Wd({ kind: t, plain: e = !1 }) {
  return O.default.createElement(
    "svg",
    {
      "aria-hidden": "true",
      focusable: "false",
      width: e ? 18 : 32,
      height: e ? 18 : 32,
      viewBox: e ? "2 2 24 24" : "0 0 28 28",
      fill: "none",
    },
    !e &&
      O.default.createElement("rect", {
        x: ".6",
        y: ".6",
        width: "26.8",
        height: "26.8",
        rx: "8",
        fill: "currentColor",
        fillOpacity: ".08",
        stroke: "currentColor",
        strokeOpacity: ".22",
      }),
    O.default.createElement("path", {
      transform: "translate(2 2)",
      d: {
        title: "M4 6h10l6 6-8 8-8-8z M8 10h.01",
        owner_id: "M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M5 19c0-7 14-7 14 0",
        kind: "M5 20V6l10-2v16m0-11h4v11M3 20h18M8 9h3m-3 4h3",
        district: "M3 6l6-2 6 3 6-2v13l-6 2-6-3-6 2z M9 4v13m6-10v13",
        area: "M4 4h16v16H4z M7 17 17 7m-4 0h4v4",
        rooms: "M5 20V5h12v15M3 20h17m-7-8h1",
        parking: "M4 4h16v16H4z M10 17V7h3a3 3 0 0 1 0 6h-3",
        assignee:
          "M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M4 19c0-4 4-7 9-6m1 4 2 2 4-5",
        properties:
          "M13 9a3.4 3.4 0 1 1 2.8 3.3L10 18H7v-3l6.2-6.2 M17.4 8.2h.01",
        home: "M18.5 10c0 4.2-6.5 10-6.5 10S5.5 14.2 5.5 10a6.5 6.5 0 1 1 13 0Z M14.2 10a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0Z",
        demands: "M5 5h14v14H5z M5 12h5m4 0h5 M12 5v7m0 4v3",
        contracts:
          "M8 5h9a1 1 0 0 1 1 1v13H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z M9 5v14m3-10h3m-3 4h3",
      }[t],
      stroke: "currentColor",
      strokeWidth: "1.45",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  );
}
