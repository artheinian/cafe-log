// src/components/SortControls.jsx
// Sort chip row + drink count label used in HomeScreen.
// Props:
//   value    – "date" | "rating" | "cafe"
//   onChange – (value: string) => void
//   count    – number of visible drinks

import { C } from "../theme/colors";

const SORTS = [
  { v: "date",   label: "🕐 Date"   },
  { v: "rating", label: "★ Rating" },
  { v: "cafe",   label: "📍 Café"  },
];

export default function SortControls({ value, onChange, count }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4px 14px 8px",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 11, color: C.faint, fontFamily: "'DM Sans',sans-serif" }}>
        {count} drink{count !== 1 ? "s" : ""}
      </span>
      <div style={{ display: "flex", gap: 4 }}>
        {SORTS.map(({ v, label }) => {
          const active = value === v;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              style={{
                padding: "3px 9px",
                borderRadius: 99,
                border: "1px solid",
                borderColor: active ? C.caramel : C.bark,
                background: active ? C.caramel : C.cream,
                color: active ? C.white : C.muted,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 10,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
