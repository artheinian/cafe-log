// src/components/StatCard.jsx
// Small stat tile used in HomeScreen (dark variant) and ProfileScreen (light variant).
// Props:
//   icon     – emoji string
//   value    – string | number
//   label    – string
//   variant  – "dark" | "light"

import { C } from "../theme/colors";

export default function StatCard({ icon, value, label, variant = "dark" }) {
  const isDark  = variant === "dark";
  const bg      = isDark ? "rgba(255,255,255,0.09)" : C.cream;
  const valClr  = isDark ? C.caramelLight           : C.caramel;
  const lblClr  = isDark ? "rgba(255,255,255,0.55)" : C.faint;
  const border  = isDark ? "none"                   : "1.5px solid " + C.sand;

  return (
    <div
      style={{
        flex: 1,
        background: bg,
        borderRadius: 10,
        border,
        padding: "10px 4px",
        textAlign: "center",
      }}
    >
      {icon && <div style={{ fontSize: 18, marginBottom: 2 }}>{icon}</div>}
      <div
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 20,
          color: valClr,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 9,
          color: lblClr,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          fontFamily: "'DM Sans',sans-serif",
          marginTop: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
}
