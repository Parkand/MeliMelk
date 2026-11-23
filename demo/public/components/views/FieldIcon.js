function Qr({ field: t, f: e = {} }) {
  return [
    "owner_id",
    "title",
    "kind",
    "district",
    "area",
    "rooms",
    "parking",
    "assignee",
    "address",
    "note",
    "notes",
  ].includes(t)
    ? O.default.createElement(Wd, {
        plain: !0,
        kind:
          t === "address"
            ? "home"
            : t === "note" || t === "notes"
              ? "contracts"
              : t,
      })
    : O.default.createElement(j, {
        size: 18,
        name:
          e.target ||
          {
            money: "payments",
            date: "visits",
            datetime: "visits",
            long: "contracts",
            phone: "contacts",
            number: "demands",
            select: "demands",
          }[e.type] ||
          { name: "contacts", receipt: "payments", code: "listings" }[t] ||
          "contracts",
      });
}
