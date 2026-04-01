const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const { Drink } = require("../models/drink");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const drinks = await Drink.findAll({
      where: { userId: req.user.userId },
      order: [["createdAt", "DESC"]],
    });

    res.json({ drinks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch drinks" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, cafe, cafeAddress, category, rating, notes, isPublic } = req.body;

    const drink = await Drink.create({
      userId: req.user.userId,
      name,
      cafe,
      cafeAddress,
      category,
      rating,
      notes,
      isPublic,
    });

    res.status(201).json({ drink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save drink" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Drink.destroy({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Drink not found" });
    }

    res.json({ message: "Drink deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete drink" });
  }
});

module.exports = router;