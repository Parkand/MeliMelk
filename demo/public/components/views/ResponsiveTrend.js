function Ld(t) {
  let [e, l] = (0, vt.useState)(!1);
  return (
    (0, vt.useEffect)(() => {
      let a = matchMedia("(max-width:800px)"),
        n = () => l(a.matches);
      return (
        n(),
        a.addEventListener("change", n),
        () => a.removeEventListener("change", n)
      );
    }, []),
    e
      ? vt.default.createElement(Q4, { ...t })
      : vt.default.createElement(Db, { ...t })
  );
}
