function sE({ close: t, all }) {
  let [e, l] = (0, U.useState)(""),
    [a, n] = (0, U.useState)(!1);
  return U.default.createElement(
    mmDialog,
    {
      title:
        "\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      nested: !0,
      blocked: a,
      guardCancel: true,
      closeAll: all,
      close: () => !a && t(),
    },
    U.default.createElement(
      "form",
      {
        onSubmit: async (i) => {
          (i.preventDefault(), n(!0), l(""));
          let s = Object.fromEntries(new FormData(i.currentTarget));
          try {
            (await sl("password", "POST", s), location.replace("/login"));
          } catch (o) {
            (l(o.message), n(!1));
          }
        },
      },
      U.default.createElement(
        "div",
        { className: "form-grid" },
        U.default.createElement(
          "label",
          null,
          "\u0631\u0645\u0632 \u0641\u0639\u0644\u06CC",
          U.default.createElement("input", {
            name: "old",
            type: "password",
            required: !0,
            autoComplete: "current-password",
          }),
        ),
        U.default.createElement(
          "label",
          null,
          "\u0631\u0645\u0632 \u062C\u062F\u06CC\u062F (\u062D\u062F\u0627\u0642\u0644 \u06F1\u06F2 \u0646\u0648\u06CC\u0633\u0647)",
          U.default.createElement("input", {
            name: "password",
            type: "password",
            required: !0,
            minLength: 12,
            maxLength: 200,
            autoComplete: "new-password",
          }),
        ),
      ),
      U.default.createElement(
        "p",
        { className: "hint" },
        "\u067E\u0633 \u0627\u0632 \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632\u060C \u0647\u0645\u0647\u0654 \u0646\u0634\u0633\u062A\u200C\u0647\u0627 \u0628\u0633\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
      ),
      e &&
        U.default.createElement("p", { className: "error", role: "alert" }, e),
      U.default.createElement(
        "footer",
        null,
        U.default.createElement(
          "button",
          { className: "primary", disabled: a },
          "\u0630\u062E\u06CC\u0631\u0647 \u0631\u0645\u0632 \u062C\u062F\u06CC\u062F",
        ),
        U.default.createElement(
          "button",
          { type: "button", disabled: a, onClick: t },
          "\u0627\u0646\u0635\u0631\u0627\u0641",
        ),
      ),
    ),
  );
}
