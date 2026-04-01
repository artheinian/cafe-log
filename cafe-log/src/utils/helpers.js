export const avgRating = (drinks) => {
    const rated = drinks.filter((d) => d.rating);
    if (!rated.length) return "—";
    return (rated.reduce((s, d) => s + d.rating, 0) / rated.length).toFixed(1);
};

/** Returns unique café count from a drinks array. */
export const uniqueCafeCount = (drinks) =>
    new Set(drinks.map((d) => d.cafe)).size;

/**
 * Returns sorted café leaderboard array.
 * [{ cafe: string, avg: string|null, count: number }]
 */
export const cafeLeaderboard = (drinks) => {
    const map = {};
    drinks.forEach((d) => {
        if (!map[d.cafe]) map[d.cafe] = { total: 0, rated: 0, count: 0 };
        map[d.cafe].count++;
        if (d.rating) { map[d.cafe].total += d.rating; map[d.cafe].rated++; }
    });
    return Object.entries(map)
        .map(([cafe, v]) => ({
            cafe,
            count: v.count,
            avg: v.rated ? (v.total / v.rated).toFixed(1) : null,
        }))
        .sort((a, b) => (b.avg || 0) - (a.avg || 0));
};

/**
 * Returns category counts sorted descending, zeros excluded.
 * [{ cat: string, count: number }]
 */
export const categoryCounts = (drinks, categories) =>
    categories
        .map((cat) => ({ cat, count: drinks.filter((d) => d.category === cat).length }))
        .filter((x) => x.count > 0)
        .sort((a, b) => b.count - a.count);

/** Filters and sorts a drinks array by the given filter and sort key. */
export const filterAndSort = (drinks, filter, sort) => {
    let list = filter === "All" ? [...drinks] : drinks.filter((d) => d.category === filter);
    if (sort === "rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sort === "cafe") list.sort((a, b) => a.cafe.localeCompare(b.cafe));
    else list.sort((a, b) => b.id - a.id); // newest first (id as proxy)
    return list;
};
