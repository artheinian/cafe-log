
import { useState } from "react";
import { C } from "../theme/colors";
import Stars from "./Stars";

export default function ReviewCard({ review, isLast = false }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text?.length > 160;

  return (
    <div
      style={{
        borderBottom: isLast ? "none" : "1px solid " + C.sand,
        paddingBottom: 10,
        marginBottom: 10,
      }}
    >
      {/* ── Author row ── */}
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
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 700, fontSize: 13, color: C.ink,
            }}
          >
            {review.author}
          </div>
          <div style={{ fontSize: 11, color: C.faint, fontFamily: "'DM Sans',sans-serif" }}>
            {review.time}
          </div>
        </div>
        <Stars value={review.rating} size={12} />
      </div>

      {/* ── Review text ── */}
      <div
        style={{
          fontSize: 12, color: C.roast,
          fontStyle: "italic", fontFamily: "'DM Sans',sans-serif",
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "unset" : 3,
          WebkitBoxOrient: "vertical",
          overflow: expanded ? "visible" : "hidden",
        }}
      >
        "{review.text}"
      </div>

      {/* ── Read more toggle ── */}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 0, marginTop: 4,
            fontSize: 11, color: C.info,
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
