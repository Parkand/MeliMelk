function mmSupervisor({ dialog, selection, children }) {
  const R = O.default,
    entry = R.useRef({}).current;
  return R.createElement(
    MaskanModal,
    {
      frame: { entry, all: () => dialog.current.close() },
      title: selection.title || "بررسی وظایف",
      expand: true,
      size: "wide",
      external: dialog,
      session: selection.session,
      extra: { className: "sv-pop td-review", "data-agent": !!selection.agent },
    },
    children,
  );
}
