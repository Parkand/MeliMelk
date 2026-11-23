function nE({ create: t }) {
  let e = A.default.useRef(null),
    [l, a] = (0, A.useState)(!1);
  return (
    A.default.useEffect(() => {
      let n = new IntersectionObserver(([i]) =>
        a(!i.isIntersecting && i.boundingClientRect.top < 0),
      );
      return (n.observe(e.current), () => n.disconnect());
    }, []),
    A.default.createElement(
      "span",
      { className: "task-create-anchor", ref: e },
      A.default.createElement(
        "button",
        {
          type: "button",
          className: "primary " + (l ? "desk-create-fab" : ""),
          onClick: () => t("tasks"),
        },
        A.default.createElement(j, { name: "plus" }),
        "\u062B\u0628\u062A \u0648\u0638\u06CC\u0641\u0647",
      ),
    )
  );
}
