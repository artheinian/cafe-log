import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AddDrinkScreen from "./screens/AddDrinkScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProtectedRoute from "./components/ProtectedRoutes";

function HomePage({ drinks, user, onDeleteDrink }) {
  const navigate = useNavigate();

  return (
    <HomeScreen
      drinks={drinks}
      user={user}
      onAddDrink={() => navigate("/add-drink")}
      onEditDrink={() => navigate("/add-drink")}
      onViewCafe={() => { }}
      onDeleteDrink={onDeleteDrink}
      onGoProfile={() => navigate("/profile")}
    />
  );
}

function AddDrinkPage({ onAddDrink }) {
  const navigate = useNavigate();

  return (
    <AddDrinkScreen
      prefillCafe={null}
      editDrink={null}
      onBack={() => navigate("/home")}
      onAddDrink={onAddDrink}
    />
  );
}

export default function App() {
  const [drinks, setDrinks] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const loadDrinks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setDrinks([]);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/drinks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch drinks");
        }

        setDrinks(data.drinks || []);
      } catch (error) {
        console.error(error);
        setDrinks([]);
      }
    };

    loadDrinks();
  }, [user]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleAddDrink = async (newDrink) => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/drinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newDrink),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save drink");
    }

    setDrinks((prev) => [data.drink, ...prev]);
  };

  const handleDeleteDrink = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/api/drinks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete drink");
    }

    setDrinks((prev) => prev.filter((drink) => drink.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen onLogin={handleLogin} />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage
                drinks={drinks}
                user={user}
                onDeleteDrink={handleDeleteDrink}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-drink"
          element={
            <ProtectedRoute>
              <AddDrinkPage onAddDrink={handleAddDrink} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen drinks={drinks} user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}