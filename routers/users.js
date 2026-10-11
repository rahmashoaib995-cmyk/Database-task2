const express = require("express");
const User = require("../models/users");

const router = express.Router();

// 1) POST 
router.post("/", async (req, res) => {
  try {
    const users = Array.isArray(req.body)
      ? await User.insertMany(req.body)
      : await User.create(req.body);
    res.status(201).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2) GET - كل اليوزرز
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3) GET by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// 4) PATCH - تعديل
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5) DELETE
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully", deletedUser: user });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = router;