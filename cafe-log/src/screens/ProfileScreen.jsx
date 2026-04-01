import { useNavigate } from "react-router-dom";
import { C, CAT_COLORS, CATEGORIES } from "../theme/colors";
import {
    avgRating,
    uniqueCafeCount,
    cafeLeaderboard,
    categoryCounts,
} from "../utils/helpers";
import StatCard from "../components/StatCard";
import Stars from "../components/Stars";

export default function ProfileScreen({ drinks = [], user = null }) {
    const navigate = useNavigate();

    const totalDrinks = drinks.length;
    const totalCafes = uniqueCafeCount(drinks);
    const avg = drinks.length > 0 ? avgRating(drinks) : 0;
    const publicCount = drinks.filter((d) => d.isPublic).length;

    const top3 = [...drinks].sort((a, b) => b.rating - a.rating).slice(0, 3);
    const cafeLb = cafeLeaderboard(drinks).slice(0, 5);
    const cats = categoryCounts(drinks, CATEGORIES);
    const maxCat = Math.max(...cats.map((x) => x.count), 1);

    const displayName = user?.displayName || "User";
    const initial = displayName.charAt(0).toUpperCase();

    const handleGoHome = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div style={{ flex: 1, overflowY: "auto" }}>
            <div
                style={{
                    background: `linear-gradient(135deg,${C.espresso},${C.roast})`,
                    padding: "44px 20px 28px",
                    textAlign: "center",
                    flexShrink: 0,
                    position: "relative",
                }}
            >
                <button
                    onClick={handleGoHome}
                    style={{
                        position: "absolute",
                        top: 44,
                        left: 16,
                        padding: "6px 12px",
                        borderRadius: 99,
                        border: "1.5px solid rgba(255,255,255,0.3)",
                        background: "transparent",
                        color: "rgba(255,255,255,0.85)",
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 12,
                        cursor: "pointer",
                    }}
                >
                    ← Home
                </button>

                <div
                    style={{
                        width: 68,
                        height: 68,
                        borderRadius: 34,
                        background: C.caramel,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                        border: "3px solid " + C.caramelLight,
                    }}
                >
                    <span style={{ fontSize: 30, color: C.white, fontWeight: 700 }}>
                        {initial}
                    </span>
                </div>

                <div
                    style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: 22,
                        color: C.white,
                        fontWeight: 700,
                    }}
                >
                    {displayName}
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: 12,
                        padding: "6px 20px",
                        borderRadius: 99,
                        border: "1.5px solid rgba(255,255,255,0.3)",
                        background: "transparent",
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 12,
                        cursor: "pointer",
                    }}
                >
                    Sign Out
                </button>
            </div>

            <div style={{ padding: "12px 12px 24px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <StatCard icon="☕" value={totalDrinks} label="Drinks" variant="light" />
                    <StatCard icon="🏪" value={totalCafes} label="Cafés" variant="light" />
                    <StatCard icon="★" value={avg} label="Avg" variant="light" />
                    <StatCard icon="🌍" value={publicCount} label="Public" variant="light" />
                </div>

                <div
                    style={{
                        background: C.cream,
                        border: "1.5px solid " + C.sand,
                        borderRadius: 14,
                        padding: "14px",
                        marginBottom: 10,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Playfair Display',serif",
                            fontSize: 15,
                            color: C.ink,
                            fontWeight: 700,
                            marginBottom: 12,
                        }}
                    >
                        🏆 Top Drinks
                    </div>

                    {top3.length === 0 ? (
                        <div
                            style={{
                                fontSize: 12,
                                color: C.faint,
                                fontFamily: "'DM Sans',sans-serif",
                            }}
                        >
                            No drinks yet.
                        </div>
                    ) : (
                        top3.map((d, i) => (
                            <div
                                key={d.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    paddingBottom: 8,
                                    marginBottom: 8,
                                    borderBottom: i < 2 ? "1px solid " + C.sand : "none",
                                }}
                            >
                                <span style={{ fontSize: 18, width: 24 }}>
                                    {["🥇", "🥈", "🥉"][i]}
                                </span>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontFamily: "'Playfair Display',serif",
                                            fontSize: 14,
                                            color: C.ink,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {d.name}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: C.faint,
                                            fontFamily: "'DM Sans',sans-serif",
                                        }}
                                    >
                                        {d.cafe}
                                    </div>
                                </div>
                                <Stars value={d.rating} size={13} />
                            </div>
                        ))
                    )}
                </div>

                <div
                    style={{
                        background: C.cream,
                        border: "1.5px solid " + C.sand,
                        borderRadius: 14,
                        padding: "14px",
                        marginBottom: 10,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Playfair Display',serif",
                            fontSize: 15,
                            color: C.ink,
                            fontWeight: 700,
                            marginBottom: 12,
                        }}
                    >
                        📍 Café Leaderboard
                    </div>

                    {cafeLb.length === 0 ? (
                        <div
                            style={{
                                fontSize: 12,
                                color: C.faint,
                                fontFamily: "'DM Sans',sans-serif",
                            }}
                        >
                            No café data yet.
                        </div>
                    ) : (
                        cafeLb.map((c, i) => (
                            <div
                                key={c.cafe}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingBottom: 8,
                                    marginBottom: 8,
                                    borderBottom: i < cafeLb.length - 1 ? "1px solid " + C.sand : "none",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            fontFamily: "'DM Sans',sans-serif",
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: C.ink,
                                        }}
                                    >
                                        {c.cafe}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: C.faint,
                                            fontFamily: "'DM Sans',sans-serif",
                                        }}
                                    >
                                        {c.count} drink{c.count !== 1 ? "s" : ""}
                                    </div>
                                </div>
                                {c.avg && (
                                    <div
                                        style={{
                                            background: C.biscuit,
                                            borderRadius: 99,
                                            padding: "3px 10px",
                                            fontFamily: "'DM Sans',sans-serif",
                                            fontWeight: 700,
                                            color: C.caramel,
                                            fontSize: 12,
                                        }}
                                    >
                                        ★ {c.avg}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div
                    style={{
                        background: C.cream,
                        border: "1.5px solid " + C.sand,
                        borderRadius: 14,
                        padding: "14px",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Playfair Display',serif",
                            fontSize: 15,
                            color: C.ink,
                            fontWeight: 700,
                            marginBottom: 12,
                        }}
                    >
                        ☕ Categories
                    </div>

                    {cats.map(({ cat, count }) => (
                        <div
                            key={cat}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 6,
                            }}
                        >
                            <div
                                style={{
                                    width: 58,
                                    fontSize: 12,
                                    color: C.muted,
                                    fontFamily: "'DM Sans',sans-serif",
                                    fontWeight: 600,
                                }}
                            >
                                {cat}
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    height: 7,
                                    background: C.sand,
                                    borderRadius: 4,
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        height: "100%",
                                        width: `${(count / maxCat) * 100}%`,
                                        background: CAT_COLORS[cat],
                                        borderRadius: 4,
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    width: 16,
                                    fontSize: 11,
                                    color: C.caramel,
                                    fontWeight: 700,
                                    fontFamily: "'DM Sans',sans-serif",
                                    textAlign: "right",
                                }}
                            >
                                {count}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}