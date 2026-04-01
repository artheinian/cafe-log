const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const { User } = require("../models/User");

const router = express.Router();

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ["id", "username", "displayName"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;