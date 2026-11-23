function Qd({ label: t, value: e, set: l, options: a }) {
  return D.default.createElement(
    "label",
    null,
    t,
    D.default.createElement(
      "select",
      { value: e, onChange: (n) => l(n.target.value) },
      a.map(([n, i]) =>
        D.default.createElement("option", { key: n, value: n }, i),
      ),
    ),
  );
}
