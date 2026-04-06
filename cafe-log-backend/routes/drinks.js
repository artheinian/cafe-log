const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const { Drink } = require("../models/drink");

const router = express.Router();

// GET drinks
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

// POST new drink
router.post("/", requireAuth, async (req, res) => {
    try {
        const drink = await Drink.create({
            userId: req.user.userId,
            ...req.body,
            isPublic: req.body.isPublic || false,
        });
        res.status(201).json({ drink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save drink" });
    }
});

// PUT - Update drink (Simplified for now)
router.put("/:id", requireAuth, async (req, res) => {
    try {
        const drink = await Drink.findByPk(req.params.id);

        if (!drink) {
            return res.status(404).json({ message: "Drink not found" });
        }

        // Update the drink (ignore userId check for now)
        await drink.update({
            name: req.body.name,
            cafe: req.body.cafe,
            cafeAddress: req.body.cafeAddress,
            category: req.body.category,
            rating: req.body.rating,
            notes: req.body.notes,
            isPublic: req.body.isPublic || false,
        });

        res.json({ drink: drink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update drink" });
    }
});

// DELETE
router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const deleted = await Drink.destroy({
            where: { id: req.params.id }
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