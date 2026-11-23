function zS({ seed: t }) {
  let [e, l] = (0, H.useState)(t),
    [a, n] = (0, H.useState)(t),
    [i, s] = (0, H.useState)(1),
    [o, u] = (0, H.useState)(0),
    [r, c] = (0, H.useState)(null),
    [h, f] = (0, H.useState)("\u062A\u06CC\u0646\u0627"),
    [d, y] = (0, H.useState)(""),
    [v, b] = (0, H.useState)(""),
    [p, g] = (0, H.useState)(""),
    [m, _] = (0, H.useState)(""),
    x = e[o],
    M = r?.steps[r.at];
  function T(S) {
    l(e.map((k, B) => (B === o ? { ...k, ...S } : k)));
  }
  function N(S, k, B) {
    T({
      paths: x.paths.map((K, q) =>
        S === q ? K.map((Y, bt) => (bt === k ? B : Y)) : K,
      ),
    });
  }
  function E(S, k) {
    (c({ ...r, at: k, log: [...r.log, M.title + " \u2014 " + S] }), b(""));
  }
  return H.default.createElement(
    "div",
    { className: "wf-grid" },
    H.default.createElement(
      "section",
      { className: "panel" },
      H.default.createElement(
        "h2",
        null,
        "\u0637\u0631\u0627\u062D\u06CC \u0645\u0633\u06CC\u0631 \u0645\u062F\u06CC\u0631",
      ),
      H.default.createElement(
        "p",
        null,
        "\u0646\u0633\u062E\u0647\u0654 \u0645\u0646\u062A\u0634\u0631\u0634\u062F\u0647: ",
        Js(i),
      ),
      H.default.createElement(
        "div",
        { className: "wf-actions" },
        e.map((S, k) =>
          H.default.createElement(
            "button",
            {
              key: k,
              "aria-pressed": k === o,
              className: k === o ? "primary" : "",
              onClick: () => u(k),
            },
            Js(k + 1),
            ". ",
            S.title,
          ),
        ),
        H.default.createElement(
          "button",
          {
            onClick: () => {
              (l([
                ...e,
                {
                  title:
                    "\u0645\u0631\u062D\u0644\u0647\u0654 \u062C\u062F\u06CC\u062F",
                  tip: "",
                  paths: [["\u0627\u0646\u062C\u0627\u0645 \u0634\u062F", -1]],
                },
              ]),
                u(e.length));
            },
          },
          "\uFF0B \u0645\u0631\u062D\u0644\u0647",
        ),
      ),
      H.default.createElement(
        "label",
        null,
        "\u0627\u0642\u062F\u0627\u0645 \u0645\u0634\u0627\u0648\u0631",
        H.default.createElement("input", {
          value: x.title,
          onChange: (S) => T({ title: S.target.value }),
        }),
      ),
      H.default.createElement(
        "label",
        null,
        "\u062A\u0648\u0635\u06CC\u0647\u0654 \u0645\u062F\u06CC\u0631",
        H.default.createElement("textarea", {
          value: x.tip,
          onChange: (S) => T({ tip: S.target.value }),
        }),
      ),
      H.default.createElement(
        "h3",
        null,
        "\u0646\u062A\u06CC\u062C\u0647 \u0648 \u0645\u0642\u0635\u062F \u0622\u0646",
      ),
      x.paths.map(([S, k], B) =>
        H.default.createElement(
          "div",
          { className: "wf-path", key: B },
          H.default.createElement("input", {
            "aria-label": "\u0646\u062A\u06CC\u062C\u0647 " + Js(B + 1),
            value: S,
            onChange: (K) => N(B, 0, K.target.value),
          }),
          H.default.createElement(
            "select",
            {
              "aria-label": "\u0645\u0642\u0635\u062F " + Js(B + 1),
              value: k,
              onChange: (K) => N(B, 1, +K.target.value),
            },
            e.map((K, q) =>
              H.default.createElement("option", { value: q, key: q }, K.title),
            ),
            H.default.createElement(
              "option",
              { value: -1 },
              "\u067E\u0627\u06CC\u0627\u0646 \u0645\u0633\u06CC\u0631",
            ),
          ),
        ),
      ),
      H.default.createElement(
        "div",
        { className: "wf-actions" },
        H.default.createElement(
          "button",
          { onClick: () => T({ paths: [...x.paths, ["", -1]] }) },
          "\uFF0B \u0646\u062A\u06CC\u062C\u0647",
        ),
        H.default.createElement(
          "button",
          {
            className: "primary",
            onClick: () => {
              if (
                e.some(
                  (S) => !S.title.trim() || S.paths.some(([k]) => !k.trim()),
                )
              )
                return _(
                  "\u0639\u0646\u0648\u0627\u0646 \u0645\u0631\u0627\u062D\u0644 \u0648 \u0646\u062A\u06CC\u062C\u0647\u200C\u0647\u0627 \u0631\u0627 \u062A\u06A9\u0645\u06CC\u0644 \u06A9\u0646\u06CC\u062F.",
                );
              (n(e),
                s(i + 1),
                _(
                  "\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0628\u0631\u0627\u06CC \u067E\u0631\u0648\u0646\u062F\u0647\u200C\u0647\u0627\u06CC \u0628\u0639\u062F\u06CC \u0645\u0646\u062A\u0634\u0631 \u0634\u062F.",
                ));
            },
          },
          "\u0627\u0646\u062A\u0634\u0627\u0631 \u0646\u0633\u062E\u0647",
        ),
      ),
      H.default.createElement("small", { role: "status" }, m),
      r?.wait &&
        H.default.createElement(
          "div",
          null,
          H.default.createElement(
            "h3",
            null,
            "\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u06A9\u0645\u06A9 \xB7 ",
            r.person,
          ),
          H.default.createElement("p", null, M.title, " \u2014 ", r.wait),
          H.default.createElement(
            "label",
            null,
            "\u067E\u0627\u0633\u062E \u0645\u062F\u06CC\u0631",
            H.default.createElement("textarea", {
              value: p,
              onChange: (S) => g(S.target.value),
            }),
          ),
          H.default.createElement(
            "button",
            {
              disabled: !p.trim(),
              onClick: () => {
                (c({
                  ...r,
                  wait: "",
                  log: [
                    ...r.log,
                    "\u067E\u0627\u0633\u062E \u0645\u062F\u06CC\u0631: " + p,
                  ],
                }),
                  g(""));
              },
            },
            "\u0627\u0631\u0633\u0627\u0644 \u067E\u0627\u0633\u062E",
          ),
        ),
    ),
    H.default.createElement(
      "section",
      { className: "panel" },
      H.default.createElement(
        "h2",
        null,
        "\u0627\u062C\u0631\u0627\u06CC \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC \u0627\u0632 \u062F\u06CC\u062F \u0645\u0634\u0627\u0648\u0631",
      ),
      H.default.createElement(
        "small",
        null,
        "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0627\u06CC\u0646 \u0622\u0632\u0645\u0627\u06CC\u0634 \u0628\u0627 \u062E\u0631\u0648\u062C \u0627\u0632 \u0635\u0641\u062D\u0647 \u067E\u0627\u06A9 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      ),
      r
        ? H.default.createElement(
            H.default.Fragment,
            null,
            H.default.createElement(
              "p",
              null,
              r.person,
              " \xB7 ",
              r.subject,
              " \xB7 \u0646\u0633\u062E\u0647\u0654 ",
              Js(r.v),
            ),
            M
              ? H.default.createElement(
                  H.default.Fragment,
                  null,
                  H.default.createElement("h3", null, M.title),
                  H.default.createElement(
                    "p",
                    { className: "wf-tip" },
                    M.tip ||
                      "\u062A\u0648\u0635\u06CC\u0647\u200C\u0627\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.",
                  ),
                  H.default.createElement(
                    "div",
                    { className: "wf-actions" },
                    M.paths.map(([S, k], B) =>
                      H.default.createElement(
                        "button",
                        { disabled: !!r.wait, key: B, onClick: () => E(S, k) },
                        S,
                      ),
                    ),
                  ),
                  H.default.createElement(
                    "label",
                    null,
                    "\u0633\u0624\u0627\u0644 \u0627\u0632 \u0645\u062F\u06CC\u0631",
                    H.default.createElement("input", {
                      disabled: !!r.wait,
                      value: v,
                      onChange: (S) => b(S.target.value),
                    }),
                  ),
                  H.default.createElement(
                    "button",
                    {
                      disabled: !!r.wait || !v.trim(),
                      onClick: () => {
                        (c({
                          ...r,
                          wait: v,
                          log: [
                            ...r.log,
                            M.title + " / \u0633\u0624\u0627\u0644: " + v,
                          ],
                        }),
                          b(""));
                      },
                    },
                    r.wait
                      ? "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u067E\u0627\u0633\u062E"
                      : "\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u06A9\u0645\u06A9",
                  ),
                )
              : H.default.createElement(
                  "h3",
                  null,
                  "\u0645\u0633\u06CC\u0631 \u067E\u0627\u06CC\u0627\u0646 \u06CC\u0627\u0641\u062A",
                ),
            H.default.createElement(
              "h3",
              null,
              "\u0633\u0627\u0628\u0642\u0647\u0654 \u067E\u0631\u0648\u0646\u062F\u0647",
            ),
            H.default.createElement(
              "ol",
              null,
              r.log.map((S, k) => H.default.createElement("li", { key: k }, S)),
            ),
            H.default.createElement(
              "button",
              {
                onClick: () => {
                  window.confirm(
                    "\u067E\u0631\u0648\u0646\u062F\u0647\u0654 \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC \u0641\u0639\u0644\u06CC \u0628\u0633\u062A\u0647 \u0634\u0648\u062F\u061F",
                  ) && (c(null), b(""), g(""), y(""));
                },
              },
              "\u067E\u0631\u0648\u0646\u062F\u0647\u0654 \u062C\u062F\u06CC\u062F",
            ),
          )
        : H.default.createElement(
            H.default.Fragment,
            null,
            H.default.createElement(
              "label",
              null,
              "\u0645\u0634\u0627\u0648\u0631 \u0646\u0645\u0648\u0646\u0647",
              H.default.createElement(
                "select",
                { value: h, onChange: (S) => f(S.target.value) },
                H.default.createElement(
                  "option",
                  null,
                  "\u062A\u06CC\u0646\u0627",
                ),
                H.default.createElement(
                  "option",
                  null,
                  "\u0646\u06CC\u0645\u0627",
                ),
              ),
            ),
            H.default.createElement(
              "label",
              null,
              "\u0645\u0634\u062A\u0631\u06CC \u06CC\u0627 \u0641\u0627\u06CC\u0644",
              H.default.createElement("input", {
                value: d,
                onChange: (S) => y(S.target.value),
              }),
            ),
            H.default.createElement(
              "button",
              {
                className: "primary",
                disabled: !d.trim(),
                onClick: () =>
                  c({
                    steps: a,
                    v: i,
                    at: 0,
                    person: h,
                    subject: d,
                    log: [],
                    wait: "",
                  }),
              },
              "\u0634\u0631\u0648\u0639 \u067E\u0631\u0648\u0646\u062F\u0647",
            ),
          ),
    ),
  );
}
