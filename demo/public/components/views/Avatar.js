function Qb({ pixels: t, name: e }) {
  let l = (0, V.useRef)(null);
  return (
    (0, V.useEffect)(() => {
      if (!l.current || !t) return;
      let a = l.current.getContext("2d"),
        n = a.createImageData(48, 48);
      (n.data.set(Uint8Array.from(atob(t), (i) => i.charCodeAt(0))),
        a.putImageData(n, 0, 0));
    }, [t]),
    t
      ? V.default.createElement("canvas", {
          className: "da-avatar",
          width: "48",
          height: "48",
          ref: l,
          "aria-hidden": "true",
        })
      : V.default.createElement(
          "span",
          { className: "da-avatar" },
          e
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((a) => a[0])
            .join(""),
        )
  );
}
