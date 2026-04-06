import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AddDrinkScreen from "./screens/AddDrinkScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProtectedRoute from "./components/ProtectedRoutes";

function HomePage({ drinks, user, onDeleteDrink }) {
  const navigate = useNavigate();

  const handleEditDrink = (drink) => {
    navigate("/add-drink", {
      state: { editDrink: drink }
    });
  };

  const handleAddDrink = () => {
    navigate("/add-drink");
  };

  return (
    <HomeScreen
      drinks={drinks}
      user={user}
      onAddDrink={handleAddDrink}
      onEditDrink={handleEditDrink}
      onViewCafe={() => { }}
      onDeleteDrink={onDeleteDrink}
      onGoProfile={() => navigate("/profile")}
    />
  );
}

function AddDrinkPage({ onAddDrink, onUpdateDrink }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const editDrink = state?.editDrink || null;

  const handleSubmit = async (drinkData) => {
    try {
      if (editDrink) {
        // EDIT MODE
        await onUpdateDrink(editDrink.id, drinkData);
        alert("Drink updated successfully!");
      } else {
        // ADD MODE
        await onAddDrink(drinkData);
        alert("Drink added successfully!");
      }
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to save drink");
    }
  };

  return (
    <AddDrinkScreen
      prefillCafe={null}
      editDrink={editDrink}
      onBack={() => navigate("/home")}
      onAddDrink={handleSubmit}        // ← Now handles both add and edit
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
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/drinks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setDrinks(data.drinks || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadDrinks();
  }, [user]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  // ADD new drink
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
    if (!response.ok) throw new Error(data.message || "Failed to add drink");

    setDrinks((prev) => [data.drink, ...prev]);
  };

  // UPDATE existing drink
  const handleUpdateDrink = async (id, updatedDrink) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/api/drinks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedDrink),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update drink");
    }

    // Update local state
    setDrinks((prev) =>
      prev.map((drink) => (drink.id === id ? data.drink : drink))
    );
  };

  const handleDeleteDrink = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/drinks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const data = await response.json();
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
              <AddDrinkPage
                onAddDrink={handleAddDrink}
                onUpdateDrink={handleUpdateDrink}
              />
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