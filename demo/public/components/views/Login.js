function um({ demo: t = !1 }) {
  Zr();
  let [e, l] = (0, st.useState)(t ? "admin@daftar.test" : ""),
    [a, n] = (0, st.useState)(""),
    [i, s] = (0, st.useState)(!1),
    [o, setInlineMessage] = (0, st.useState)(""),
    u = (message) => maskanFeedback(setInlineMessage,message,'error');
  async function r(c) {
    (c.preventDefault(), u(""));
    let h = c.currentTarget.elements;
    for (let [f, d] of [
      [
        h.email,
        h.email.value
          ? "\u06CC\u06A9 \u0646\u0634\u0627\u0646\u06CC \u0627\u06CC\u0645\u06CC\u0644 \u0645\u0639\u062A\u0628\u0631 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F."
          : "\u0627\u06CC\u0645\u06CC\u0644 \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.",
      ],
      [
        h.password,
        "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.",
      ],
    ])
      if (!f.validity.valid) {
        await maskanFeedback(setInlineMessage,d,'validation'); f.focus();
        return;
      }
    s(!0);
    try {
      (await sl("login", "POST", {
        email: t && !e.includes("@") ? e.trim() + "@daftar.test" : e,
        password: a,
      }),
        location.replace("/desk/home"));
    } catch (f) {
      (u(
        f.status === 401
          ? "\u0627\u06CC\u0645\u06CC\u0644 \u06CC\u0627 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0646\u0627\u062F\u0631\u0633\u062A \u0627\u0633\u062A."
          : f.status === 429
            ? "\u062A\u0639\u062F\u0627\u062F \u062A\u0644\u0627\u0634\u200C\u0647\u0627 \u0632\u06CC\u0627\u062F \u0627\u0633\u062A. \u06A9\u0645\u06CC \u0628\u0639\u062F \u062F\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646\u06CC\u062F."
            : f.status
              ? "\u0648\u0631\u0648\u062F \u0627\u0646\u062C\u0627\u0645 \u0646\u0634\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646\u06CC\u062F."
              : "\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F. \u0627\u062A\u0635\u0627\u0644 \u062E\u0648\u062F \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646\u06CC\u062F.",
      ),
        s(!1));
    }
  }
  const demo = t,
    email = e,
    setEmail = l,
    password = a,
    setPassword = n,
    busy = i,
    error = o,
    setError = u,
    enter = r;
  return /* @__PURE__ */ st.default.createElement(
    "main",
    { className: "mm-entry" },
    /* @__PURE__ */ st.default.createElement(
      "section",
      null,
      /* @__PURE__ */ st.default.createElement(
        "article",
        null,
        /* @__PURE__ */ st.default.createElement(
          "header",
          null,
          /* @__PURE__ */ st.default.createElement(
            "div",
            { className: "logo" },
            /* @__PURE__ */ st.default.createElement(
              "svg",
              {
                viewBox: "0 0 32 32",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
              },
              /* @__PURE__ */ st.default.createElement("path", {
                d: "M3 27V13l9-8 9 8v14M12 27V16l8-7 9 8v10M2 27h28",
              }),
            ),
            "\u0645\u0633\u06A9\u0646 \u0645\u0644\u06CC",
          ),
          /* @__PURE__ */ st.default.createElement(
            "span",
            { className: "en" },
            "MASKAN MELLI",
            /* @__PURE__ */ st.default.createElement("br", null),
            "REAL ESTATE OFFICE",
          ),
        ),
        /* @__PURE__ */ st.default.createElement(
          "h1",
          null,
          "\u0647\u0631 \u0645\u0644\u06A9\u060C \u06CC\u06A9 \u062F\u0627\u0633\u062A\u0627\u0646.",
        ),
        /* @__PURE__ */ st.default.createElement(
          "p",
          null,
          "\u0645\u0634\u062A\u0631\u06CC\u060C \u0628\u0627\u0632\u062F\u06CC\u062F \u0648 \u0642\u0631\u0627\u0631\u062F\u0627\u062F \u0631\u0627 \u062F\u0631 \u06CC\u06A9 \u062F\u0641\u062A\u0631 \u062F\u0646\u0628\u0627\u0644 \u06A9\u0646\u06CC\u062F.",
        ),
        /* @__PURE__ */ st.default.createElement(
          "svg",
          {
            className: "map",
            viewBox: "0 0 540 150",
            role: "img",
            "aria-label":
              "\u0646\u0642\u0634\u0647\u0654 \u062E\u0637\u06CC \u06CC\u06A9 \u0645\u062D\u0644\u0647",
          },
          /* @__PURE__ */ st.default.createElement(
            "defs",
            null,
            /* @__PURE__ */ st.default.createElement(
              "pattern",
              {
                id: "p",
                width: "15",
                height: "15",
                patternUnits: "userSpaceOnUse",
              },
              /* @__PURE__ */ st.default.createElement("circle", {
                cx: "3",
                cy: "3",
                r: "1",
                fill: "currentColor",
                opacity: ".26",
              }),
            ),
          ),
          /* @__PURE__ */ st.default.createElement("rect", {
            width: "540",
            height: "150",
            fill: "url(#p)",
          }),
          /* @__PURE__ */ st.default.createElement(
            "g",
            { stroke: "currentColor", fill: "none", strokeWidth: "1.7" },
            /* @__PURE__ */ st.default.createElement("path", {
              d: "m38 90 63-35 68 37-63 36z m124-54 51-28 51 29-52 28z m121 62 52-30 61 32-54 31z m98-49 51-30 65 34-52 30z",
            }),
            /* @__PURE__ */ st.default.createElement("path", {
              strokeDasharray: "5 5",
              d: "m34 131 115-63 116 62 167-91",
            }),
            /* @__PURE__ */ st.default.createElement("circle", {
              cx: "149",
              cy: "68",
              r: "6",
            }),
            /* @__PURE__ */ st.default.createElement("circle", {
              cx: "432",
              cy: "39",
              r: "6",
            }),
          ),
        ),
        /* @__PURE__ */ st.default.createElement(
          "div",
          { className: "pair" },
          /* @__PURE__ */ st.default.createElement(
            "strong",
            null,
            "\u0645\u062D\u0644\u0647 \u0631\u0627 \u0628\u0634\u0646\u0627\u0633.",
          ),
          /* @__PURE__ */ st.default.createElement(
            "span",
            { className: "en" },
            "01 / KNOW THE NEIGHBORHOOD",
          ),
        ),
        /* @__PURE__ */ st.default.createElement(
          "div",
          { className: "pair" },
          /* @__PURE__ */ st.default.createElement(
            "strong",
            null,
            "\u062E\u0627\u0646\u0647 \u0631\u0627 \u067E\u06CC\u062F\u0627 \u06A9\u0646.",
          ),
          /* @__PURE__ */ st.default.createElement(
            "span",
            { className: "en" },
            "02 / FIND THE RIGHT HOME",
          ),
        ),
        /* @__PURE__ */ st.default.createElement(
          "div",
          { className: "pair" },
          /* @__PURE__ */ st.default.createElement(
            "strong",
            null,
            "\u0642\u062F\u0645 \u0628\u0639\u062F\u06CC \u0631\u0627 \u0628\u0631\u062F\u0627\u0631.",
          ),
          /* @__PURE__ */ st.default.createElement(
            "span",
            { className: "en" },
            "03 / MAKE YOUR MOVE",
          ),
        ),
      ),
    ),
    /* @__PURE__ */ st.default.createElement(
      "section",
      null,
      /* @__PURE__ */ st.default.createElement(
        "article",
        { className: "mm-form" },
        /* @__PURE__ */ st.default.createElement(
          "div",
          { className: "row" },
          /* @__PURE__ */ st.default.createElement(
            "svg",
            {
              viewBox: "0 0 32 32",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
            },
            /* @__PURE__ */ st.default.createElement("circle", {
              cx: "10",
              cy: "12",
              r: "6",
            }),
            /* @__PURE__ */ st.default.createElement("path", {
              d: "m15 16 12 11 3-3-4-4-2 2-3-3 2-2",
            }),
          ),
          " \u062F\u0633\u062A\u0631\u0633\u06CC \u0627\u0639\u0636\u0627\u06CC \u062F\u0641\u062A\u0631",
        ),
        /* @__PURE__ */ st.default.createElement(
          "h2",
          null,
          "\u0648\u0631\u0648\u062F \u0628\u0647 \u0645\u06CC\u0632 \u06A9\u0627\u0631",
        ),
        /* @__PURE__ */ st.default.createElement(
          "p",
          null,
          "\u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0628\u0631\u0646\u0627\u0645\u0647\u0654 \u0627\u0645\u0631\u0648\u0632\u060C \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u062E\u0648\u062F \u0634\u0648\u06CC\u062F.",
        ),
        /* @__PURE__ */ st.default.createElement(
          "form",
          { noValidate: true, onChange: () => setError(""), onSubmit: enter },
          /* @__PURE__ */ st.default.createElement(
            "label",
            null,
            demo
              ? "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC"
              : "\u0627\u06CC\u0645\u06CC\u0644",
            /* @__PURE__ */ st.default.createElement("input", {
              type: demo ? "text" : "email",
              dir: "ltr",
              name: "email",
              autoComplete: "username",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
            }),
          ),
          /* @__PURE__ */ st.default.createElement(
            "label",
            null,
            "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
            /* @__PURE__ */ st.default.createElement("input", {
              type: "password",
              dir: "ltr",
              name: "password",
              autoComplete: "current-password",
              maxLength: 200,
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
            }),
          ),
          error &&
            /* @__PURE__ */ st.default.createElement(
              "p",
              { role: "alert", className: "error" },
              error,
            ),
          /* @__PURE__ */ st.default.createElement(
            "div",
            { className: "submitrow" },
            /* @__PURE__ */ st.default.createElement(
              "button",
              { type: "submit", disabled: busy, "aria-busy": busy },
              "\u0648\u0631\u0648\u062F",
            ),
          ),
        ),
        demo &&
          /* @__PURE__ */ st.default.createElement(
            "footer",
            null,
            "\u062F\u0645\u0648\u06CC \u0645\u062D\u0644\u06CC \u0628\u0627 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0641\u0631\u0636\u06CC. \u0631\u0645\u0632 \u0645\u062F\u06CC\u0631 \u062F\u0631 \u062A\u0631\u0645\u06CC\u0646\u0627\u0644 \u0627\u062C\u0631\u0627\u06CC \u062F\u0645\u0648 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
          ),
      ),
    ),
  );
}
