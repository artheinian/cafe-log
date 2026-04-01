import { C } from "../theme/colors";

export default function SearchBar({ value, onChange, onRefresh }) {
    return (
        <div style={{ padding: "12px 12px 6px", display: "flex", gap: 8, flexShrink: 0 }}>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search cafés…"
                style={{
                    flex: 1,
                    padding: "9px 14px",
                    border: "1.5px solid " + C.bark,
                    borderRadius: 10,
                    fontSize: 13,
                    fontFamily: "'DM Sans',sans-serif",
                    background: C.cream,
                    color: C.ink,
                    outline: "none",
                }}
            />
            <button
                onClick={onRefresh}
                style={{
                    width: 40, height: 40,
                    borderRadius: 10,
                    background: C.cream,
                    border: "1.5px solid " + C.bark,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, cursor: "pointer",
                }}
            >
                🔄
            </button>
        </div>
    );
}
