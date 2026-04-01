// src/components/CategoryFilter.jsx
// Horizontally scrollable category chip row used in HomeScreen.
// Props:
//   value    – currently selected category string ("All" | "Coffee" | …)
//   onChange – (cat: string) => void

import { C, CATEGORIES } from "../theme/colors";

const ALL_CATS = ["All", ...CATEGORIES];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        padding: "10px 12px 4px",
        overflowX: "auto",
        flexShrink: 0,
      }}
    >
      {ALL_CATS.map((cat) => {
        const active = value === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            style={{
              padding: "4px 13px",
              borderRadius: 99,
              border: "1.5px solid",
              borderColor: active ? C.caramel : C.bark,
              background: active ? C.caramel : C.cream,
              color: active ? C.white : C.muted,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
