// src/components/AddDrinkForm.jsx
// The full add/edit form body used inside AddDrinkScreen.
// Stateless except for local cafe autocomplete suggestions.
// Props:
//   form        – form state object
//   setForm     – state setter
//   onSubmit    – () => void  called when the save button is clicked
//   isEdit      – bool        changes button label
//   prefillCafe – string|null hides autocomplete suggestions when set

import { C, CAT_COLORS, CATEGORIES } from "../theme/colors";
import Stars from "./Stars";

const inp = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 14px",
  border: "1.5px solid " + C.bark,
  borderRadius: 10,
  fontSize: 14,
  fontFamily: "'DM Sans',sans-serif",
  background: C.cream,
  color: C.ink,
  outline: "none",
};

const lbl = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: C.muted,
  fontFamily: "'DM Sans',sans-serif",
  marginBottom: 5,
  display: "block",
};

const CAFE_SUGGESTIONS = [
  "Mellow Yellow Café",
  "The Green Corner",
  "Driftwood Espresso",
  "Bloom Juice Bar",
  "Petal & Brew",
];

export default function AddDrinkForm({ form, setForm, onSubmit, isEdit, prefillCafe }) {
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.name && form.cafe && form.rating;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px 30px" }}>

      {/* ── Drink name ── */}
      <div style={{ marginBottom: 14 }}>
        <label style={lbl}>Drink Name *</label>
        <input
          style={inp}
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Oat Milk Latte"
        />
      </div>

      {/* ── Café name + suggestions ── */}
      <div style={{ marginBottom: 14 }}>
        <label style={lbl}>Café Name *</label>
        <input
          style={inp}
          value={form.cafe}
          onChange={(e) => set("cafe", e.target.value)}
          placeholder="e.g. Mellow Yellow Café"
        />
        {/* Show autocomplete suggestions only when not prefilled */}
        {!prefillCafe && form.cafe.length === 0 && (
          <div
            style={{
              background: C.cream,
              border: "1px solid " + C.bark,
              borderRadius: 8,
              marginTop: 4,
              overflow: "hidden",
            }}
          >
            {CAFE_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => set("cafe", s)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid " + C.sand,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  color: C.ink,
                }}
              >
                ☕ {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Café address ── */}
      <div style={{ marginBottom: 14 }}>
        <label style={lbl}>Café Address</label>
        <input
          style={inp}
          value={form.cafeAddress}
          onChange={(e) => set("cafeAddress", e.target.value)}
          placeholder="Auto-filled or enter manually"
        />
      </div>

      {/* ── Category chips ── */}
      <div style={{ marginBottom: 14 }}>
        <label style={lbl}>Category</label>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => {
            const active = form.category === c;
            return (
              <button
                key={c}
                onClick={() => set("category", c)}
                style={{
                  padding: "5px 13px",
                  borderRadius: 99,
                  border: "1.5px solid",
                  borderColor: active ? CAT_COLORS[c] : C.bark,
                  background: active ? CAT_COLORS[c] : C.cream,
                  color: active ? C.white : C.muted,
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Rating ── */}
      <div style={{ marginBottom: 14 }}>
        <label style={lbl}>Rating *</label>
        <Stars value={form.rating} onChange={(v) => set("rating", v)} size={34} />
      </div>

      {/* ── Notes ── */}
      <div style={{ marginBottom: 14 }}>
        <label style={lbl}>Notes</label>
        <textarea
          style={{ ...inp, resize: "vertical", minHeight: 72, paddingTop: 10 }}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Sweetness, texture, vibes — whatever stood out"
        />
      </div>

      {/* ── Privacy toggle ── */}
      <div
        style={{
          marginBottom: 20,
          background: C.cream,
          borderRadius: 12,
          padding: "12px 14px",
          border: "1.5px solid " + C.sand,
        }}
      >
        <label style={{ ...lbl, marginBottom: 8 }}>Review Visibility</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: C.muted,
              fontFamily: "'DM Sans',sans-serif",
              flex: 1,
              marginRight: 10,
            }}
          >
            {form.isPublic ? "🌍 Public — others can see this" : "🔒 Private — only you see this"}
          </span>
          {/* Toggle switch */}
          <div
            onClick={() => set("isPublic", !form.isPublic)}
            style={{
              width: 46,
              height: 25,
              borderRadius: 13,
              background: form.isPublic ? C.success : C.bark,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0 2px",
              justifyContent: form.isPublic ? "flex-end" : "flex-start",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 21,
                height: 21,
                borderRadius: 11,
                background: C.white,
                boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            color: C.faint,
            fontFamily: "'DM Sans',sans-serif",
            marginTop: 6,
            lineHeight: 1.5,
          }}
        >
          {form.isPublic
            ? "Your review will appear on the café page for all users."
            : "Toggle on to share with the community."}
        </div>
      </div>

      {/* ── Submit button ── */}
      <button
        onClick={onSubmit}
        disabled={!valid}
        style={{
          width: "100%",
          padding: "13px",
          background: valid ? `linear-gradient(135deg,${C.caramel},#8b4010)` : C.bark,
          color: valid ? C.white : C.faint,
          border: "none",
          borderRadius: 10,
          fontFamily: "'DM Sans',sans-serif",
          fontWeight: 700,
          fontSize: 15,
          cursor: valid ? "pointer" : "not-allowed",
        }}
      >
        {isEdit ? "Save Changes" : "Add Drink ☕"}
      </button>
    </div>
  );
}
