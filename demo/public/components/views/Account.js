function tm({ user: t, password: e, logout: l, appearance: a }) {
  let [n, i] = (0, V.useState)(""),
    [s, o] = (0, V.useState)(""),
    [u, r] = (0, V.useState)(""),
    c = (0, V.useRef)(null),
    [h, f, d, y] = a,
    v = "daftar.avatar." + t.id,
    [b, p] = (0, V.useState)(() => Rd(v)),
    g =
      t.role === "admin"
        ? "\u0645\u062F\u06CC\u0631 \u06A9\u0644"
        : t.role === "office_manager"
          ? "\u0645\u062F\u06CC\u0631 \u062F\u0641\u062A\u0631"
          : "\u0645\u0634\u0627\u0648\u0631 \u0627\u0645\u0644\u0627\u06A9";
  (0, V.useEffect)(() => {
    if (!n) return;
    let x = (T) => {
        c.current?.contains(T.target) || i("");
      },
      M = (T) => {
        T.key === "Escape" &&
          (c.current?.querySelector('[aria-expanded="true"]')?.focus(), i(""));
      };
    return (
      document.addEventListener("pointerdown", x),
      document.addEventListener("keydown", M),
      () => {
        (document.removeEventListener("pointerdown", x),
          document.removeEventListener("keydown", M));
      }
    );
  }, [n]);
  function m(x) {
    (i(""), r(""), o(x));
  }
  async function _(x) {
    if (x)
      try {
        if (
          x.size > 5e6 ||
          !["image/jpeg", "image/png", "image/webp"].includes(x.type)
        )
          throw Error();
        let M = await createImageBitmap(x),
          T = document.createElement("canvas");
        T.width = T.height = 48;
        let N = T.getContext("2d"),
          E = Math.min(M.width, M.height);
        (N.drawImage(
          M,
          (M.width - E) / 2,
          (M.height - E) / 2,
          E,
          E,
          0,
          0,
          48,
          48,
        ),
          M.close());
        let S = btoa(String.fromCharCode(...N.getImageData(0, 0, 48, 48).data));
        (localStorage.setItem(v, S),
          p(S),
          maskanFeedback(r,
            "\u062A\u0635\u0648\u06CC\u0631 \u062F\u0631 \u0627\u06CC\u0646 \u0645\u0631\u0648\u0631\u06AF\u0631 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.",
          "success"));
      } catch {
        maskanFeedback(r,
          "\u0630\u062E\u06CC\u0631\u0647 \u0646\u0634\u062F. \u062A\u0635\u0648\u06CC\u0631 PNG\u060C JPEG \u06CC\u0627 WebP \u0632\u06CC\u0631 \u06F5 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F.",
        );
      }
  }
  return V.default.createElement(
    "div",
    { className: "da-account", ref: c },
    V.default.createElement(
      "button",
      {
        type: "button",
        className: "da-mode",
        "aria-label":
          "\u0638\u0627\u0647\u0631 \u0628\u0631\u0646\u0627\u0645\u0647",
        title: "\u0638\u0627\u0647\u0631 \u0628\u0631\u0646\u0627\u0645\u0647",
        "aria-expanded": n === "theme",
        onClick: () => i(n === "theme" ? "" : "theme"),
      },
      V.default.createElement(
        "svg",
        {
          width: "21",
          height: "21",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.7",
          "aria-hidden": "true",
        },
        V.default.createElement("rect", {
          x: "2",
          y: "3",
          width: "20",
          height: "14",
          rx: "2",
        }),
        V.default.createElement("path", { d: "M8 21h8m-4-4v4" }),
      ),
    ),
    V.default.createElement(
      "button",
      {
        className: "da-user",
        "aria-label":
          "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC " +
          t.name,
        "aria-expanded": n === "account",
        onClick: () => i(n === "account" ? "" : "account"),
      },
      V.default.createElement(Qb, { name: t.name, pixels: b }),
      V.default.createElement(
        "span",
        { className: "da-id" },
        V.default.createElement("b", null, t.name),
        V.default.createElement("small", null, g),
      ),
    ),
    n &&
      V.default.createElement(
        "div",
        { className: "da-pop" },
        n === "theme"
          ? V.default.createElement(
              V.default.Fragment,
              null,
              V.default.createElement(Xb, { value: d, change: y }),
              V.default.createElement(
                "strong",
                null,
                "\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634",
              ),
              Object.entries(Pd).map(([x, M]) =>
                V.default.createElement(
                  "button",
                  {
                    key: x,
                    "aria-pressed": h === x,
                    onClick: () => {
                      (f(x), i(""));
                    },
                  },
                  M,
                  h === x ? " \u2713" : "",
                ),
              ),
            )
          : V.default.createElement(
              V.default.Fragment,
              null,
              V.default.createElement(
                "strong",
                null,
                t.name,
                V.default.createElement("small", null, g),
              ),
              V.default.createElement(
                "button",
                { onClick: () => m("profile") },
                "\u067E\u0631\u0648\u0641\u0627\u06CC\u0644 \u0645\u0646",
              ),
              V.default.createElement(
                "button",
                { onClick: () => m("settings") },
                "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0633\u0627\u0628",
              ),
              V.default.createElement(
                "button",
                {
                  onClick: () => {
                    (i(""), l());
                  },
                },
                "\u062E\u0631\u0648\u062C",
              ),
            ),
      ),
    s &&
      V.default.createElement(
        mmDialog,
        {
          title:
            s === "profile"
              ? "\u067E\u0631\u0648\u0641\u0627\u06CC\u0644 \u0645\u0646"
              : "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0633\u0627\u0628",
          close: () => o(""),
        },
        V.default.createElement(
          "div",
          { className: "da-body" },
          s === "profile"
            ? V.default.createElement(
                V.default.Fragment,
                null,
                V.default.createElement(Qb, { name: t.name, pixels: b }),
                V.default.createElement("b", null, t.name, " \xB7 ", g),
                V.default.createElement("span", { dir: "ltr" }, t.email),
                V.default.createElement(
                  "label",
                  null,
                  "\u062A\u0635\u0648\u06CC\u0631 \u067E\u0631\u0648\u0641\u0627\u06CC\u0644 (\u062F\u0631 \u0647\u0645\u06CC\u0646 \u0645\u0631\u0648\u0631\u06AF\u0631)",
                  V.default.createElement("input", {
                    type: "file",
                    accept: "image/png,image/jpeg,image/webp",
                    onChange: (x) => _(x.target.files[0]),
                  }),
                ),
                V.default.createElement("small", { role: "status" }, u),
              )
            : V.default.createElement(
                V.default.Fragment,
                null,
                V.default.createElement(Xb, { value: d, change: y }),
                V.default.createElement(
                  "label",
                  null,
                  "\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634",
                  V.default.createElement(
                    "select",
                    { value: h, onChange: (x) => f(x.target.value) },
                    Object.entries(Pd).map(([x, M]) =>
                      V.default.createElement(
                        "option",
                        { key: x, value: x },
                        M,
                      ),
                    ),
                  ),
                ),
                V.default.createElement(
                  "button",
                  {
                    onClick: () => {
                      (o(""), e(() => o("settings")));
                    },
                  },
                  "\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
                ),
              ),
        ),
      ),
  );
}
