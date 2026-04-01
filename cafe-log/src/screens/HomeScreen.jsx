import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        fetch("http://localhost:5000/api/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Unauthorized");
                }
                return res.json();
            })
            .then((data) => {
                setUser(data.user);
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/");
            });
    }, [navigate]);

    if (!user) {
        return <div style={{ padding: 40 }}>Loading...</div>;
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                background: "#f8f3ed",
                padding: 40,
                boxSizing: "border-box",
            }}
        >
            <h1>Home Screen</h1>
            <p>Welcome, {user.displayName}!</p>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                }}
            >
                Logout
            </button>
        </div>
    );
}