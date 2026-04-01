// src/screens/CafeDetailScreen.jsx
// Full café detail page — summary card, directions, Google reviews accordion,
// community drinks accordion.
// Props:
//   cafeName   – string
//   onBack     – () => void
//   onAddDrink – () => void  opens AddDrinkScreen prefilled with this café

import { useState } from "react";
import { C } from "../theme/colors";
import { NEARBY_CAFES }   from "../data/mockCafes";
import { GOOGLE_REVIEWS } from "../data/mockReviews";
import { DRINKS }         from "../data/mockDrinks";
import { avgRating }      from "../utils/helpers";
import ScreenHeader from "../components/ScreenHeader";
import StatCard     from "../components/StatCard";
import ReviewCard   from "../components/ReviewCard";
import Stars        from "../components/Stars";

// Star-distribution bar (e.g. 70% 5-star, 18% 4-star …)
const BAR_WIDTHS = [70, 18, 8, 2, 2];

function RatingOverview({ rating, total }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        marginBottom: 14,
        background: C.biscuit,
        borderRadius: 10,
        padding: "10px 12px",
      }}
    >
      {/* Big score */}
      <div style={{ textAlign: "center", flexShrink: 0 }}>
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 38,
            color: C.caramel,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {rating}
        </div>
        <Stars value={5} size={12} />
        <div
          style={{
            fontSize: 10,
            color: C.faint,
            fontFamily: "'DM Sans',sans-serif",
            marginTop: 2,
          }}
        >
          {total} reviews
        </div>
      </div>

      {/* Distribution bars */}
      <div style={{ flex: 1 }}>
        {[5, 4, 3, 2, 1].map((star, i) => (
          <div
            key={star}
            style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}
          >
            <span
              style={{
                fontSize: 10,
                color: C.muted,
                width: 8,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {star}
            </span>
            <div
              style={{
                flex: 1,
                height: 5,
                background: C.sand,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${BAR_WIDTHS[i]}%`,
                  background: C.caramel,
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Accordion({ title, open, onToggle, children }) {
  return (
    <>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: C.cream,
          border: "1.5px solid " + C.sand,
          borderRadius: 14,
          padding: "14px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: 2,
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 15,
            color: C.ink,
            fontWeight: 700,
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: 11, color: C.faint }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          style={{
            background: C.cream,
            border: "1.5px solid " + C.sand,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 8,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default function CafeDetailScreen({ cafeName, onBack, onAddDrink }) {
  const [reviewsOpen,   setReviewsOpen]   = useState(false);
  const [communityOpen, setCommunityOpen] = useState(true);

  // Look up café data; fall back to a minimal object for cafés not in mock data
  const cafe = NEARBY_CAFES.find((c) => c.name === cafeName) || {
    name: cafeName,
    address: "Address not available",
    rating: null,
    total: 0,
    open: null,
  };

  // Community drinks for this café (public + own private)
  const cafeDrinks = [...DRINKS]
    .filter((d) => d.cafe === cafeName)
    .sort((a, b) => b.rating - a.rating);

  const appAvg = avgRating(cafeDrinks);

  const statusColor = cafe.open === true ? C.success : cafe.open === false ? C.danger : C.faint;
  const statusLabel =
    cafe.open === true ? "● Open now" : cafe.open === false ? "● Closed now" : "● Hours unknown";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>

      {/* ── Header ── */}
      <ScreenHeader title={cafeName} onBack={onBack} />

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 20px" }}>

        {/* ── Summary card ── */}
        <div
          style={{
            background: C.cream,
            border: "1.5px solid " + C.sand,
            borderRadius: 14,
            padding: "16px",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 20,
              color: C.ink,
              fontWeight: 700,
              marginBottom: 2,
            }}
          >
            {cafe.name}
          </div>
          <div
            style={{
              fontSize: 12,
              color: C.faint,
              fontFamily: "'DM Sans',sans-serif",
              marginBottom: 4,
            }}
          >
            📍 {cafe.address}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: statusColor,
              fontFamily: "'DM Sans',sans-serif",
              marginBottom: 12,
            }}
          >
            {statusLabel}
          </div>

          {/* Stat tiles */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <StatCard value={cafe.rating?.toFixed(1) ?? "—"} label="Google ★" variant="light" />
            <StatCard value={appAvg}                         label="App ★"    variant="light" />
            <StatCard value={cafeDrinks.length}              label="Logged"   variant="light" />
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            {/* Directions — opens Google Maps */}
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    cafe.address
                  )}`,
                  "_blank"
                )
              }
              style={{
                flex: 1,
                padding: "11px",
                background: C.info,
                color: C.white,
                border: "none",
                borderRadius: 10,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              🗺️ Directions
            </button>

            <button
              onClick={onAddDrink}
              style={{
                flex: 1,
                padding: "11px",
                background: `linear-gradient(135deg,${C.caramel},#8b4010)`,
                color: C.white,
                border: "none",
                borderRadius: 10,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              ☕ Log Drink
            </button>
          </div>
        </div>

        {/* ── Google Reviews accordion ── */}
        <Accordion
          title={`⭐ Google Reviews (${cafe.total})`}
          open={reviewsOpen}
          onToggle={() => setReviewsOpen(!reviewsOpen)}
        >
          {cafe.rating && (
            <RatingOverview rating={cafe.rating} total={cafe.total} />
          )}

          {GOOGLE_REVIEWS.map((r, i) => (
            <ReviewCard
              key={i}
              review={r}
              isLast={i === GOOGLE_REVIEWS.length - 1}
            />
          ))}

          <div style={{ textAlign: "center", marginTop: 6 }}>
            <span
              style={{
                fontSize: 11,
                color: C.info,
                fontWeight: 600,
                fontFamily: "'DM Sans',sans-serif",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/${encodeURIComponent(cafeName)}`,
                  "_blank"
                )
              }
            >
              See all reviews on Google →
            </span>
          </div>
        </Accordion>

        {/* ── Community drinks accordion ── */}
        <Accordion
          title={`☕ What people thought (${cafeDrinks.length})`}
          open={communityOpen}
          onToggle={() => setCommunityOpen(!communityOpen)}
        >
          {cafeDrinks.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: C.faint,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 13,
                padding: "10px 0",
              }}
            >
              Be the first to log a drink here!
            </div>
          ) : (
            cafeDrinks.map((d, i) => (
              <div
                key={d.id}
                style={{
                  borderBottom:
                    i < cafeDrinks.length - 1 ? "1px solid " + C.sand : "none",
                  paddingBottom: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 4,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 15,
                        color: C.ink,
                        fontWeight: 700,
                      }}
                    >
                      {d.name}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: C.faint,
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      by Lena {!d.isPublic && "🔒"}
                    </div>
                  </div>
                  <Stars value={d.rating} size={14} />
                </div>
                {d.notes && (
                  <div
                    style={{
                      fontSize: 12,
                      color: C.roast,
                      fontStyle: "italic",
                      fontFamily: "'DM Sans',sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    "{d.notes}"
                  </div>
                )}
              </div>
            ))
          )}
        </Accordion>
      </div>
    </div>
  );
}
