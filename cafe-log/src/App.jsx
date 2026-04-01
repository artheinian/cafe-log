import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
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
      onViewCafe={() => {}}
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

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleAddDrink = (newDrink) => {
    setDrinks((prev) => [newDrink, ...prev]);
  };

  const handleDeleteDrink = (id) => {
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