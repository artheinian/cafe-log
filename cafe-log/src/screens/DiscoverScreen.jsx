// src/screens/DiscoverScreen.jsx
// Location-based café browser — header, search bar, radius chips, café list.
// Props:
//   onViewCafe – (cafeName: string) => void

import { useState } from "react";
import { C } from "../theme/colors";
import { NEARBY_CAFES } from "../data/mockCafes";
import SearchBar from "../components/SearchBar";
import CafeCard  from "../components/CafeCard";

const RADII = ["500m", "1km", "1.5km", "3km"];
const DEFAULT_RADIUS_INDEX = 2; // "1.5km"

export default function DiscoverScreen({ onViewCafe }) {
  const [search,      setSearch]      = useState("");
  const [radiusIndex, setRadiusIndex] = useState(DEFAULT_RADIUS_INDEX);

  const filtered = NEARBY_CAFES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  // Stub — real implementation calls fetchNearbyCafes() from services/places.js
  const handleRefresh = () => console.log("refresh nearby cafes");

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>

      {/* ── Header ── */}
      <div
        style={{
          background: `linear-gradient(135deg,${C.espresso},${C.roast})`,
          padding: "44px 20px 20px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 26,
            color: C.white,
            fontWeight: 700,
          }}
        >
          🗺️ Discover
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'DM Sans',sans-serif",
            marginTop: 2,
          }}
        >
          Cafés near you · Edmonton, AB
        </div>
      </div>

      {/* ── Search bar ── */}
      <SearchBar value={search} onChange={setSearch} onRefresh={handleRefresh} />

      {/* ── Radius chips ── */}
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "0 12px 8px",
          flexShrink: 0,
        }}
      >
        {RADII.map((r, i) => {
          const active = i === radiusIndex;
          return (
            <button
              key={r}
              onClick={() => setRadiusIndex(i)}
              style={{
                padding: "3px 10px",
                borderRadius: 99,
                border: "1.5px solid",
                borderColor: active ? C.caramel : C.bark,
                background: active ? C.caramel : C.cream,
                color: active ? C.white : C.muted,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {r}
            </button>
          );
        })}
      </div>

      {/* ── Café list ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 16px" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 20px",
              color: C.faint,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 14,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>🗺️</div>
            No cafés found. Try a wider radius!
          </div>
        ) : (
          filtered.map((cafe) => (
            <CafeCard
              key={cafe.id}
              cafe={cafe}
              onPress={() => onViewCafe(cafe.name)}
            />
          ))
        )}
      </div>
    </div>
  );
}
