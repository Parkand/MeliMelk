function Wb({ ws: t, open: e }) {
  let [l, a] = (0, z.useState)(null);
  return z.default.createElement(
    z.default.Fragment,
    null,
    z.default.createElement(sm, {
      text: "\u062F\u0641\u062A\u0631 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
    }),
    z.default.createElement(
      "p",
      { className: "hint" },
      "\u0622\u062E\u0631\u06CC\u0646 \u06F1\u06F5\u06F0 \u062A\u063A\u06CC\u06CC\u0631\u061B \u0634\u0627\u0645\u0644 \u062B\u0628\u062A\u200C\u0647\u0627\u060C \u0648\u0627\u06AF\u0630\u0627\u0631\u06CC\u200C\u0647\u0627 \u0648 \u062A\u063A\u06CC\u06CC\u0631 \u0642\u06CC\u0645\u062A \u0641\u0627\u06CC\u0644.",
    ),
    z.default.createElement(MmLedger,{name:'audit',title:'فهرست رویدادها',fields:[['when','زمان (تهران)'],['who','عضو'],['bucket','نوع رویداد'],['subject','پرونده'],['detail','تغییر']],rows:t.audit.map(n=>{const record=t.data[n.entity]?.find(r=>r.id===n.record_id);return {id:n.id,n,record,when:Tt(n.happened_at,true),who:t.team.find(u=>u.id===n.actor)?.name,bucket:n.action||'نامشخص',subject:record?Ee(n.entity,record,t.data):'تیم',detail:n.detail}}),actions:[['details','جزئیات رویداد'],['record','مرجع']],act:(key,r)=>key==='record'&&r.record?e(r.n.entity,r.record):a(r.n),groupField:'bucket'}),
    l &&
      z.default.createElement(
        mmDialog,
        {
          title:
            "\u062C\u0632\u0626\u06CC\u0627\u062A \u0631\u0648\u06CC\u062F\u0627\u062F",
          close: () => a(null),
        },
        z.default.createElement(
          "article",
          { className: "audit-card" },
          z.default.createElement("h3", null, l.action),
          z.default.createElement(
            "small",
            null,
            Tt(l.happened_at, !0),
            " \xB7 ",
            t.team.find((n) => n.id === l.actor)?.name,
          ),
          z.default.createElement("p", null, l.detail),
        ),
      ),
  );
}
