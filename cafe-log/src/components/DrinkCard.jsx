

import { useState } from "react";
import { C } from "../theme/colors";
import Stars from "./Stars";
import Badge from "./Badge";

export default function DrinkCard({ drink, onViewCafe, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div
      style={{
        background: C.cream,
        border: "1.5px solid " + C.sand,
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 10,
        boxShadow: "0 2px 8px rgba(120,80,30,0.06)",
      }}
    >
      {/* ── Top row: badge + date + privacy + action buttons ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 6,
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <Badge cat={drink.category} />
          <span style={{ fontSize: 10, color: C.faint, fontFamily: "'DM Sans',sans-serif" }}>
            {drink.date}
          </span>
          {!drink.isPublic && <span style={{ fontSize: 11 }}>🔒</span>}
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => onEdit(drink)}
            style={{
              width: 28, height: 28, borderRadius: 7,
              background: C.biscuit, border: "none", cursor: "pointer",
              fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✏️
          </button>

          {confirming ? (
            <>
              <button
                onClick={() => { onDelete(drink.id); setConfirming(false); }}
                style={{
                  padding: "0 9px", height: 28, borderRadius: 7, border: "none",
                  background: C.danger, color: C.white, cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700,
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setConfirming(false)}
                style={{
                  padding: "0 9px", height: 28, borderRadius: 7, border: "none",
                  background: C.biscuit, color: C.muted, cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600,
                }}
              >
                No
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              style={{
                width: 28, height: 28, borderRadius: 7,
                background: C.dangerLight, border: "none", cursor: "pointer",
                fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* ── Drink name ── */}
      <div
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 17,
          color: C.ink,
          fontWeight: 700,
          marginBottom: 2,
        }}
      >
        {drink.name}
      </div>

      {/* ── Café link ── */}
      <button
        onClick={() => onViewCafe(drink.cafe)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 0, fontFamily: "'DM Sans',sans-serif",
          fontSize: 12, color: C.info, fontWeight: 600,
          textAlign: "left", marginBottom: 6,
        }}
      >
        📍 {drink.cafe} →
      </button>

      {/* ── Stars ── */}
      <Stars value={drink.rating} size={16} />

      {/* ── Notes ── */}
      {drink.notes && (
        <div
          style={{
            marginTop: 8, background: C.biscuit,
            borderRadius: 8, padding: "7px 10px",
          }}
        >
          <span
            style={{
              fontSize: 12, color: C.roast,
              fontStyle: "italic", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.5,
            }}
          >
            "{drink.notes}"
          </span>
        </div>
      )}
    </div>
  );
}
