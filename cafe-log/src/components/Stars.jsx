import { C } from "../theme/colors";

export default function Stars({ value = 0, size = 18, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          onClick={() => onChange?.(s)}
          style={{
            fontSize: size,
            color: s <= value ? C.caramel : C.hint,
            cursor: onChange ? "pointer" : "default",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
