function mmLegacy(props) {
  const R = O.default,
    h = R.createElement;
  const [touched, touch] = R.useState(false);
  let a = props.children;
  const parts = (c) => {
    let list = R.Children.toArray(c);
    return [
      h(
        "div",
        { className: "modal-scroll", key: "body" },
        list.filter((x) => x.type !== "footer"),
      ),
      ...list.filter((x) => x.type === "footer"),
    ];
  };
  return h(
    MaskanModal,
    {
      frame: props.frame,
      title: props.title,
      legacy: true,
      expand: true,
      size: "wide",
      dirty: props.dirty ?? touched,
      blocked: props.blocked,
    },
    a?.type === "form"
      ? R.cloneElement(
          a,
          {
            onChangeCapture: () => touch(true),
            onClickCapture: (e) => {
              if (
                props.guardCancel &&
                touched &&
                e.target.closest('footer button[type="button"]') &&
                !confirm("بدون ذخیره خارج می‌شوید؟")
              ) {
                e.preventDefault();
                e.stopPropagation();
              }
            },
          },
          parts(a.props.children),
        )
      : parts(a),
  );
}
