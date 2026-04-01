import { useState } from "react";
import { C } from "../theme/colors";
import { avgRating, uniqueCafeCount, filterAndSort } from "../utils/helpers";
import StatCard from "../components/StatCard";
import CategoryFilter from "../components/CategoryFilter";
import SortControls from "../components/SortControls";
import DrinkCard from "../components/DrinkCard";

export default function HomeScreen({
    drinks = [],
    user = null,
    onViewCafe,
    onAddDrink,
    onEditDrink,
    onDeleteDrink,
    onGoProfile,
}) {
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("date");

    const visible = filterAndSort(drinks, filter, sort);

    const totalDrinks = drinks.length;
    const totalCafes = uniqueCafeCount(drinks);
    const avg = drinks.length > 0 ? avgRating(drinks) : 0;

    const displayName = user?.displayName || "Friend";
    const initial = displayName.charAt(0).toUpperCase();

    const handleDelete = (id) => {
        onDeleteDrink?.(id);
    };

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <div
                style={{
                    background: `linear-gradient(135deg,${C.espresso},${C.roast})`,
                    padding: "44px 20px 0",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "radial-gradient(circle at 80% 20%,rgba(255,200,100,0.08) 0%,transparent 60%)",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginBottom: 14,
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: 10,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "#d4a96a",
                                fontFamily: "'DM Sans',sans-serif",
                                fontWeight: 700,
                                marginBottom: 3,
                            }}
                        >
                            Hello, {displayName} 👋
                        </div>
                        <div
                            style={{
                                fontFamily: "'Playfair Display',serif",
                                fontSize: 26,
                                color: C.white,
                                fontWeight: 700,
                                lineHeight: 1.1,
                            }}
                        >
                            Your Drink{" "}
                            <span style={{ color: C.caramelLight, fontStyle: "italic" }}>Diary</span>
                        </div>
                    </div>

                    <button
                        onClick={onGoProfile}
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 19,
                            background: C.caramel,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid " + C.caramelLight,
                            flexShrink: 0,
                            cursor: "pointer",
                            padding: 0,
                        }}
                    >
                        <span style={{ fontSize: 16, color: C.white, fontWeight: 700 }}>
                            {initial}
                        </span>
                    </button>
                </div>

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        gap: 8,
                        paddingBottom: 14,
                    }}
                >
                    <StatCard icon="☕" value={totalDrinks} label="Drinks" variant="dark" />
                    <StatCard icon="🏪" value={totalCafes} label="Cafés" variant="dark" />
                    <StatCard icon="★" value={avg} label="Avg" variant="dark" />
                </div>
            </div>

            <CategoryFilter value={filter} onChange={setFilter} />
            <SortControls value={sort} onChange={setSort} count={visible.length} />

            <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 16px" }}>
                {visible.length === 0 ? (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "48px 20px",
                            color: C.faint,
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 14,
                        }}
                    >
                        <div style={{ fontSize: 40, marginBottom: 10 }}>☕</div>
                        No drinks yet. Tap + to add your first one.
                    </div>
                ) : (
                    visible.map((d, index) => (
                        <DrinkCard
                            key={d.id ?? `${d.name}-${d.cafe}-${index}`}
                            drink={d}
                            onViewCafe={onViewCafe}
                            onEdit={onEditDrink}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>

            <button
                onClick={onAddDrink}
                style={{
                    position: "absolute",
                    bottom: 80,
                    right: 16,
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    background: `linear-gradient(135deg,${C.caramel},#8b4010)`,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 26,
                    color: C.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(120,60,10,0.35)",
                }}
            >
                +
            </button>
        </div>
    );
}