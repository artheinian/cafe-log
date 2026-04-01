const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const drinkRoutes = require("./routes/drinks");

const { sequelize } = require("./models/User");
require("./models/drink"); // make sure Drink model is loaded

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/drinks", drinkRoutes);

const PORT = 5000;

sequelize.sync().then(() => {
    console.log("Database synced");

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to sync database:", error);
});