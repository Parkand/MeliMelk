function Rh() {
  let [t, e] = (0, H.useState)(0);
  return H.default.createElement(
    "div",
    { className: "wf" },
    H.default.createElement(
      "header",
      { className: "page-title" },
      H.default.createElement(
        "div",
        null,
        H.default.createElement(
          "h1",
          null,
          "\u0645\u0633\u06CC\u0631\u0647\u0627\u06CC \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
        ),
        H.default.createElement(
          "p",
          null,
          "\u0631\u0648\u0634 \u06A9\u0627\u0631 \u062F\u0641\u062A\u0631 \u0631\u0627 \u0637\u0631\u0627\u062D\u06CC \u0648 \u0627\u0632 \u062F\u06CC\u062F \u0645\u0634\u0627\u0648\u0631 \u0622\u0632\u0645\u0627\u06CC\u0634 \u06A9\u0646\u06CC\u062F.",
        ),
      ),
    ),
    H.default.createElement(
      "label",
      null,
      "\u0627\u0644\u06AF\u0648\u06CC \u06A9\u0627\u0631 ",
      H.default.createElement(
        "select",
        { value: t, onChange: (l) => e(+l.target.value) },
        Hy.map((l, a) =>
          H.default.createElement("option", { key: l, value: a }, l),
        ),
      ),
    ),
    Hy.map((l, a) =>
      H.default.createElement(
        "div",
        { key: l, hidden: t !== a },
        H.default.createElement(zS, { seed: ky[a] }),
      ),
    ),
  );
}
