import { useState } from "react";

const C = {
    muted: "#6b7280",
    espresso: "#4b2e1f",
    roast: "#6b3b24",
    white: "#ffffff",
    caramelLight: "#d9a066",
    cream: "#f8f3ed",
    sand: "#d8c7b8",
    caramel: "#b86b3d",
    bark: "#7a5a46",
    info: "#3b82f6",
};

const inp = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #d6ccc2",
    marginTop: 6,
    boxSizing: "border-box",
    fontSize: 15,
    outline: "none",
    background: "#fff",
};

export default function LoginScreen({ onLogin }) {
    const [tab, setTab] = useState("login");
    const [email, setEmail] = useState("lena@email.com");
    const [password, setPassword] = useState("••••••••");
    const [name, setName] = useState("");

    const lbl = {
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#5f6b7a",
        fontFamily: "'DM Sans', sans-serif",
        display: "block",
        marginBottom: 2,
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                position: "relative",
                background: C.cream,
                overflow: "hidden",
                fontFamily: "'DM Sans', sans-serif",
            }}
        >
            {/* Main Split Layout - No top navbar */}
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                }}
            >
                {/* LEFT SIDE - Branding */}
                <div
                    style={{
                        flex: 1,
                        background: `linear-gradient(135deg, ${C.espresso} 0%, ${C.roast} 60%, #8b5030 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "60px 50px",
                        position: "relative",
                    }}
                >
                    <div style={{ maxWidth: "460px", textAlign: "left" }}>
                        <div
                            style={{
                                fontSize: 11,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "#d4a96a",
                                fontWeight: 700,
                                marginBottom: 8,
                            }}
                        >
                            Your Personal
                        </div>

                        <div
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 54,
                                color: C.white,
                                lineHeight: 1.05,
                                fontWeight: 700,
                                marginBottom: 18,
                            }}
                        >
                            Café Drink
                            <span style={{ color: C.caramelLight, fontStyle: "italic" }}>
                                {" "}
                                Diary
                            </span>
                        </div>

                        <div
                            style={{
                                fontSize: 19,
                                color: "rgba(255,255,255,0.88)",
                                letterSpacing: "0.03em",
                                fontWeight: 500,
                                lineHeight: 1.45,
                            }}
                        >
                            Track. Discover. Share.
                        </div>

                        <div
                            style={{
                                marginTop: 80,
                                fontSize: 15.5,
                                color: "rgba(255,255,255,0.68)",
                                maxWidth: 360,
                                lineHeight: 1.6,
                            }}
                        >
                            Keep all your favorite café drinks, tasting notes, and memories in one beautiful place.
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Login Form */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px 70px",
                        background: C.cream,
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            maxWidth: 440,
                            background: "rgba(248,243,237,0.98)",
                            border: "1px solid rgba(216,199,184,0.9)",
                            borderRadius: 24,
                            boxShadow: "0 25px 80px rgba(0,0,0,0.22)",
                            overflow: "hidden",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <div
                            style={{
                                padding: "38px 40px 26px",
                                borderBottom: "1px solid #eadfd3",
                                background:
                                    "linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(248,243,237,0.96) 100%)",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 28,
                                    fontWeight: 800,
                                    color: "#2b2521",
                                    marginBottom: 10,
                                }}
                            >
                                {tab === "login" ? "Welcome back" : "Create your account"}
                            </div>

                            <div
                                style={{
                                    fontSize: 15,
                                    color: "#74685e",
                                    lineHeight: 1.6,
                                }}
                            >
                                {tab === "login"
                                    ? "Sign in to keep track of your favorite café drinks and notes."
                                    : "Start your own café diary and save your favorite drinks in one place."}
                            </div>
                        </div>

                        <div style={{ padding: "38px 40px 34px" }}>
                            {/* Tab Switcher */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    marginBottom: 30,
                                    background: "#efe7df",
                                    borderRadius: 12,
                                    padding: 6,
                                }}
                            >
                                {["login", "signup"].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTab(t)}
                                        style={{
                                            flex: 1,
                                            padding: "13px 18px",
                                            border: "none",
                                            borderRadius: 10,
                                            cursor: "pointer",
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontWeight: 700,
                                            fontSize: 15,
                                            background: tab === t ? C.caramel : "transparent",
                                            color: tab === t ? C.white : "#5e5a56",
                                            transition: "0.22s ease",
                                        }}
                                    >
                                        {t === "login" ? "Sign In" : "Sign Up"}
                                    </button>
                                ))}
                            </div>

                            {tab === "signup" && (
                                <div style={{ marginBottom: 20 }}>
                                    <label style={lbl}>Display Name</label>
                                    <input
                                        style={inp}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Lena"
                                    />
                                </div>
                            )}

                            <div style={{ marginBottom: 20 }}>
                                <label style={lbl}>Email</label>
                                <input
                                    style={inp}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div style={{ marginBottom: 28 }}>
                                <label style={lbl}>Password</label>
                                <input
                                    style={inp}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                onClick={onLogin}
                                style={{
                                    width: "100%",
                                    padding: "16px",
                                    background: `linear-gradient(135deg, ${C.caramel}, #8b4010)`,
                                    color: C.white,
                                    border: "none",
                                    borderRadius: 12,
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 800,
                                    fontSize: 16,
                                    cursor: "pointer",
                                    boxShadow: "0 12px 30px rgba(139,64,16,0.26)",
                                }}
                            >
                                {tab === "login" ? "Sign In →" : "Create Account"}
                            </button>

                            {tab === "login" && (
                                <div style={{ textAlign: "center", marginTop: 20 }}>
                                    <span
                                        style={{
                                            fontSize: 13.5,
                                            color: C.info,
                                            cursor: "pointer",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Forgot password?
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}