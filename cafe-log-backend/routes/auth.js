const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const router = express.Router();

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const DISPLAY_NAME_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9 '\-]{1,39}$/;

function validateUsername(username) {
  return USERNAME_REGEX.test(username);
}

function validateDisplayName(displayName) {
  return DISPLAY_NAME_REGEX.test(displayName);
}

function validatePassword(password) {
  if (typeof password !== "string") return false;

  const trimmed = password.trim();

  // good practical app rule:
  // at least 8 chars, max 72 for bcrypt simplicity
  return trimmed.length >= 8 && trimmed.length <= 72;
}

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    let { username, displayName, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    username = normalizeUsername(username);
    displayName = (displayName || username).trim();

    if (!validateUsername(username)) {
      return res.status(400).json({
        message:
          "Username must be 3-20 characters and use only letters, numbers, or underscores.",
      });
    }

    if (!validateDisplayName(displayName)) {
      return res.status(400).json({
        message:
          "Display name must be 2-40 characters and may use letters, numbers, spaces, apostrophes, and hyphens.",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password must be between 8 and 72 characters.",
      });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      displayName,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        username: user.username,
        displayName: user.displayName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    username = normalizeUsername(username);

    if (!validateUsername(username)) {
      return res.status(400).json({
        message: "Invalid username format",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Invalid password format",
      });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        displayName: user.displayName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;