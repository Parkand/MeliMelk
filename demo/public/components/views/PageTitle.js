function sm({ text: t, children: e }) {
  return z.default.createElement(
    "div",
    { className: "page-title" },
    z.default.createElement(
      "div",
      null,
      z.default.createElement(
        "small",
        null,
        "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062F\u0641\u062A\u0631",
      ),
      z.default.createElement("h1", null, t),
    ),
    e,
  );
}
