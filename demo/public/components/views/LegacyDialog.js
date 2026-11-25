function mmLegacy(props) {
  const R = O.default,
    h = R.createElement;
  const [touched, touch] = R.useState(false);
  const allowedCancel=R.useRef(null);
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
      heading: props.heading,
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
            onClickCapture: async (e) => {
              const button=e.target.closest('footer button[type="button"]');
              if(button?.closest('.mm-notice')||!props.guardCancel||!touched||!button)return;
              if(allowedCancel.current===button){allowedCancel.current=null;return}
              e.preventDefault();e.stopPropagation();
              if(await maskanMessage({kind:'confirm',title:'خروج بدون ذخیره؟',message:'تغییرات این فرم ذخیره نشده‌اند.'})&&button.isConnected){allowedCancel.current=button;button.click();allowedCancel.current=null}
            },
          },
          parts(a.props.children),
        )
      : parts(a),
  );
}
