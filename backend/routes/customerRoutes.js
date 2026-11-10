const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const auth = require("../middleware/authMiddleware");

// GET /api/customers - Fetch only the logged-in user's customers
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const customers = await Customer.find({ userId }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    console.error("Fetch Customers Error:", err);
    res.status(500).json({ message: "Server error fetching customers" });
  }
});

// POST /api/customers - Save a customer record manually
router.post("/", auth, async (req, res) => {
  try {
    const { name, email, phone, company, notes } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Customer name is required" });
    }

    const userId = req.user._id || req.user.id;
    const newCustomer = new Customer({
      userId,
      name,
      email,
      phone,
      company,
      notes,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error("Save Customer Error:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
