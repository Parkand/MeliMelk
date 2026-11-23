function im({ ws: t, load: e }) {
  let [l, a] = (0, R.useState)(null),
    [n, i] = (0, R.useState)(""),
    [s, o] = (0, R.useState)(!1),
    u = (f) => {
      (i(""), a(f));
    },
    r = (f) => t.team.find((d) => d.id === f)?.name;
  async function c(f) {
    f.preventDefault();
    let d = new FormData(f.currentTarget);
    (o(!0), i(""));
    try {
      (await sl("groups" + (l ? "/" + l : ""), l ? "PUT" : "POST", {
        name: d.get("name"),
        manager_id: d.get("manager"),
        members: d.getAll("members"),
      }),
        a(null),
        await e());
    } catch (y) {
      i(y.message);
    } finally {
      o(!1);
    }
  }
  let h = t.team.filter((f) => f.active && f.role === "agent" && !f.group_id);
  return R.default.createElement(
    "section",
    { className: "panel" },
    R.default.createElement(
      "header",
      null,
      R.default.createElement(
        "h2",
        null,
        "\u06AF\u0631\u0648\u0647\u200C\u0647\u0627\u06CC \u062F\u0641\u062A\u0631",
      ),
      R.default.createElement(
        "button",
        { onClick: () => u("") },
        "\u062A\u0639\u0631\u06CC\u0641 \u06AF\u0631\u0648\u0647",
      ),
    ),
    t.groups.length
      ? t.groups.map((f) =>
          R.default.createElement(
            "div",
            { className: "line", key: f.id },
            R.default.createElement(
              "span",
              null,
              R.default.createElement(
                "b",
                null,
                f.name,
                " \xB7 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648: ",
                r(f.manager_id),
              ),
              R.default.createElement(
                "small",
                null,
                t.team
                  .filter((d) => d.group_id === f.id)
                  .map((d) => d.name)
                  .join("\u060C ") ||
                  "\u0628\u062F\u0648\u0646 \u0645\u0634\u0627\u0648\u0631",
              ),
            ),
            R.default.createElement(
              "button",
              { disabled: !h.length, onClick: () => u(f.id) },
              "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0634\u0627\u0648\u0631",
            ),
          ),
        )
      : R.default.createElement(
          "p",
          { className: "hint" },
          "\u0627\u0628\u062A\u062F\u0627 \u062D\u0633\u0627\u0628 \u0645\u062F\u06CC\u0631 \u062F\u0641\u062A\u0631 \u0648 \u0645\u0634\u0627\u0648\u0631\u0627\u0646 \u0631\u0627 \u0628\u0633\u0627\u0632\u06CC\u062F\u061B \u0633\u067E\u0633 \u06AF\u0631\u0648\u0647 \u0648 \u0645\u062F\u06CC\u0631 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648\u06CC \u0622\u0646 \u0631\u0627 \u062A\u0639\u06CC\u06CC\u0646 \u06A9\u0646\u06CC\u062F.",
        ),
    l !== null &&
      R.default.createElement(
        mmDialog,
        {
          title: l
            ? "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0634\u0627\u0648\u0631 \u0628\u0647 \u06AF\u0631\u0648\u0647"
            : "\u062A\u0639\u0631\u06CC\u0641 \u06AF\u0631\u0648\u0647",
          icon: "team",
          blocked: s,
          close: () => !s && a(null),
        },
        R.default.createElement(
          "form",
          { onSubmit: c },
          R.default.createElement(
            "div",
            { className: "form-grid" },
            l === "" &&
              R.default.createElement(
                R.default.Fragment,
                null,
                R.default.createElement(
                  "label",
                  null,
                  "\u0646\u0627\u0645 \u06AF\u0631\u0648\u0647",
                  R.default.createElement("input", {
                    required: !0,
                    name: "name",
                    maxLength: 120,
                  }),
                ),
                R.default.createElement(
                  "label",
                  null,
                  "\u0645\u062F\u06CC\u0631 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648",
                  R.default.createElement(
                    "select",
                    { required: !0, name: "manager", defaultValue: "" },
                    R.default.createElement(
                      "option",
                      { value: "" },
                      "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F",
                    ),
                    t.team
                      .filter((f) => f.active && f.role !== "agent")
                      .map((f) =>
                        R.default.createElement(
                          "option",
                          { key: f.id, value: f.id },
                          f.name,
                        ),
                      ),
                  ),
                ),
              ),
            R.default.createElement(
              "fieldset",
              { className: "full" },
              R.default.createElement(
                "legend",
                null,
                "\u0645\u0634\u0627\u0648\u0631\u0627\u0646 \u0628\u062F\u0648\u0646 \u06AF\u0631\u0648\u0647",
              ),
              h.map((f) =>
                R.default.createElement(
                  "label",
                  { className: "inline", key: f.id },
                  R.default.createElement("input", {
                    type: "checkbox",
                    name: "members",
                    value: f.id,
                  }),
                  f.name,
                ),
              ),
              !h.length &&
                R.default.createElement(
                  "small",
                  null,
                  "\u0645\u0634\u0627\u0648\u0631 \u0628\u062F\u0648\u0646 \u06AF\u0631\u0648\u0647 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.",
                ),
            ),
          ),
          n &&
            R.default.createElement(
              "p",
              { className: "error", role: "alert" },
              n,
            ),
          R.default.createElement(
            "footer",
            null,
            R.default.createElement(
              "button",
              { className: "primary", disabled: s },
              "\u0630\u062E\u06CC\u0631\u0647",
            ),
          ),
        ),
      ),
  );
}
