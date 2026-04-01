
import { C, CAT_COLORS } from "../theme/colors";

export default function Badge({ cat }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        color: C.white,
        background: CAT_COLORS[cat] || C.hint,
        borderRadius: 99,
        padding: "2px 9px",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      {cat}
    </span>
  );
}
