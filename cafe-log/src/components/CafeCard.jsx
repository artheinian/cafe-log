// src/components/CafeCard.jsx
// A single nearby café card used in DiscoverScreen.
// Props:
//   cafe    – cafe object { name, address, rating, total, open, dist }
//   onPress – () => void   called when the card is clicked

import { C } from "../theme/colors";

export default function CafeCard({ cafe, onPress }) {
  const statusColor = cafe.open ? C.success : C.danger;
  const statusLabel = cafe.open ? "● Open" : "● Closed";

  return (
    <button
      onClick={onPress}
      style={{
        width: "100%",
        background: C.cream,
        border: "1.5px solid " + C.sand,
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 10,
        textAlign: "left",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(120,80,30,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* ── Left: name, address, status + distance ── */}
        <div style={{ flex: 1, marginRight: 12 }}>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 16, color: C.ink, fontWeight: 700, marginBottom: 2,
            }}
          >
            {cafe.name}
          </div>
          <div
            style={{
              fontSize: 11, color: C.faint,
              fontFamily: "'DM Sans',sans-serif", marginBottom: 6,
            }}
          >
            📍 {cafe.address}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                fontSize: 11, fontWeight: 700,
                color: statusColor, fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {statusLabel}
            </span>
            <span style={{ fontSize: 11, color: C.faint, fontFamily: "'DM Sans',sans-serif" }}>
              🕐 {cafe.dist}
            </span>
          </div>
        </div>

        {/* ── Right: rating ── */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 22, color: C.caramel, fontWeight: 700, lineHeight: 1,
            }}
          >
            {cafe.rating}
          </div>
          <div style={{ fontSize: 10, color: C.caramel }}>★</div>
          <div style={{ fontSize: 9, color: C.faint, fontFamily: "'DM Sans',sans-serif" }}>
            ({cafe.total})
          </div>
        </div>
      </div>

      {/* ── Footer link ── */}
      <div style={{ marginTop: 8, textAlign: "right" }}>
        <span
          style={{
            fontSize: 11, color: C.info,
            fontWeight: 600, fontFamily: "'DM Sans',sans-serif",
          }}
        >
          View details →
        </span>
      </div>
    </button>
  );
}
