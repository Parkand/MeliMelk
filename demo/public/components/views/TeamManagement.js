function Fb({ ws: t, load: e }) {
  let [l, a] = (0, z.useState)(!1),
    [n, i] = (0, z.useState)(!1),
    [s, o] = (0, z.useState)("");
  return z.default.createElement(
    z.default.Fragment,
    null,
    z.default.createElement(sm, {
      text: "\u0627\u0639\u0636\u0627\u06CC \u062A\u06CC\u0645",
    }),
    z.default.createElement(
      "button",
      {
        className: "primary desk-create-fab",
        onClick: () => {
          (o(""), a(!0));
        },
      },
      z.default.createElement(j, { name: "plus" }),
      "\u0639\u0636\u0648 \u062C\u062F\u06CC\u062F",
    ),
    z.default.createElement(im, { ws: t, load: e }),
    z.default.createElement(
      "section",
      { className: "panel" },
      z.default.createElement(
        "header",
        null,
        z.default.createElement(
          "h2",
          null,
          "\u0645\u0633\u0626\u0648\u0644\u06CC\u062A\u200C\u0647\u0627\u06CC \u062C\u0627\u0631\u06CC",
        ),
      ),
      t.team.map((u) =>
        z.default.createElement(
          "div",
          { className: "line", key: u.id },
          z.default.createElement("i", { className: "tile" }, u.name[0]),
          z.default.createElement(
            "span",
            null,
            z.default.createElement("b", null, u.name),
            z.default.createElement(
              "small",
              null,
              u.role === "admin"
                ? "\u0645\u062F\u06CC\u0631 \u06A9\u0644"
                : u.role === "office_manager"
                  ? "\u0645\u062F\u06CC\u0631 \u062F\u0641\u062A\u0631"
                  : "\u0645\u0634\u0627\u0648\u0631",
            ),
          ),
          z.default.createElement(
            "em",
            null,
            F.format(
              t.data.tasks.filter((r) => r.assignee === u.id && Jr(r)).length,
            ),
            " \u0648\u0638\u06CC\u0641\u0647\u0654 \u0628\u0627\u0632",
          ),
        ),
      ),
    ),
    z.default.createElement(
      "p",
      { className: "hint" },
      "\u0628\u0631\u0627\u06CC \u0648\u0627\u06AF\u0630\u0627\u0631\u06CC \u0648\u0638\u06CC\u0641\u0647\u060C \u062F\u0631 \u0641\u0631\u0645 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0622\u0646 \xAB\u0645\u0633\u0626\u0648\u0644\xBB \u0631\u0627 \u062A\u063A\u06CC\u06CC\u0631 \u062F\u0647\u06CC\u062F. \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062A\u0645\u0627\u0633 \u0648 \u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u0639\u0631\u0636\u0647 \u0628\u06CC\u0646 \u0627\u0639\u0636\u0627\u06CC \u0647\u0645\u06CC\u0646 \u062F\u0641\u062A\u0631 \u0645\u0634\u062A\u0631\u06A9\u200C\u0627\u0646\u062F.",
    ),
    l &&
      z.default.createElement(
        mmDialog,
        {
          title: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0639\u0636\u0648",
          guardCancel: true,
          blocked: n,
          close: () => !n && a(!1),
        },
        z.default.createElement(
          "form",
          {
            onSubmit: async (u) => {
              (u.preventDefault(), i(!0), o(""));
              let r = Object.fromEntries(new FormData(u.currentTarget));
              try {
                (await sl("team", "POST", r), a(!1), await e());
              } catch (c) {
                o(c.message);
              } finally {
                i(!1);
              }
            },
          },
          z.default.createElement(
            "div",
            { className: "form-grid" },
            z.default.createElement(
              "label",
              null,
              "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC",
              z.default.createElement("input", {
                name: "name",
                required: !0,
                maxLength: 120,
              }),
            ),
            z.default.createElement(
              "label",
              null,
              "\u0627\u06CC\u0645\u06CC\u0644",
              z.default.createElement("input", {
                name: "email",
                type: "email",
                dir: "ltr",
                required: !0,
              }),
            ),
            z.default.createElement(
              "label",
              null,
              "\u0631\u0645\u0632 \u0645\u0648\u0642\u062A (\u062D\u062F\u0627\u0642\u0644 \u06F1\u06F2 \u0646\u0648\u06CC\u0633\u0647)",
              z.default.createElement("input", {
                name: "password",
                type: "password",
                minLength: 12,
                maxLength: 200,
                autoComplete: "new-password",
                required: !0,
              }),
            ),
            z.default.createElement(
              "label",
              null,
              "\u0646\u0642\u0634",
              z.default.createElement(
                "select",
                { name: "role" },
                z.default.createElement(
                  "option",
                  { value: "agent" },
                  "\u0645\u0634\u0627\u0648\u0631",
                ),
                z.default.createElement(
                  "option",
                  { value: "office_manager" },
                  "\u0645\u062F\u06CC\u0631 \u062F\u0641\u062A\u0631",
                ),
                z.default.createElement(
                  "option",
                  { value: "admin" },
                  "\u0645\u062F\u06CC\u0631 \u06A9\u0644",
                ),
              ),
            ),
          ),
          s &&
            z.default.createElement(
              "p",
              { role: "alert", className: "error" },
              s,
            ),
          z.default.createElement(
            "footer",
            null,
            z.default.createElement(
              "button",
              { className: "primary", disabled: n },
              "\u0627\u06CC\u062C\u0627\u062F \u062D\u0633\u0627\u0628",
            ),
            z.default.createElement(
              "button",
              { type: "button", disabled: n, onClick: () => a(!1) },
              "\u0627\u0646\u0635\u0631\u0627\u0641",
            ),
          ),
        ),
      ),
  );
}
