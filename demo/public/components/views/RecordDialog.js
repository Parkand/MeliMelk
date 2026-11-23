function mmDialog(props) {
  const R = O.default,
    entry = R.useRef({ prev: props.nested }).current;
  return R.createElement(mmLegacy, {
    ...props,
    frame: props.frame || {
      entry,
      all: props.closeAll || props.close,
      back: props.close,
    },
  });
}
