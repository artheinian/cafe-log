// src/components/ScreenHeader.jsx
// Dark espresso header bar used by CafeDetailScreen and AddDrinkScreen.
// Pass onBack={null} to hide the back arrow (e.g. top-level screens).

import { C } from "../theme/colors";

export default function ScreenHeader({ title, onBack }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg,${C.espresso},${C.roast})`,
        padding: "44px 16px 16px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            color: C.caramelLight,
            padding: 0,
            lineHeight: 1,
          }}
        >
          ←
        </button>
      )}
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18,
          color: C.white,
          fontWeight: 700,
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </div>
    </div>
  );
}
