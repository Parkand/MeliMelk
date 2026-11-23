function nm({ title: t, caption: e, go: l, children: a, icon: n }) {
  return A.default.createElement(
    "section",
    { className: "panel" },
    A.default.createElement(
      "header",
      null,
      n &&
        A.default.createElement(
          "i",
          { className: "home-badge badge-" + n },
          A.default.createElement(j, { name: n }),
        ),
      A.default.createElement(
        "div",
        null,
        A.default.createElement("small", null, e),
        A.default.createElement("h2", null, t),
      ),
      l &&
        A.default.createElement(
          "button",
          { className: "link", onClick: l },
          "\u0647\u0645\u0647 ",
          A.default.createElement(j, { name: "arrow", size: 16 }),
        ),
    ),
    a,
  );
}
