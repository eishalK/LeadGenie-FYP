const express = require("express");
const router = express.Router();
const Deal = require("../models/Deal");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const deals = await Deal.find({ userId })
      .populate("customerId", "name email phone company")
      .sort({ createdAt: -1 });
    res.json(deals);
  } catch (err) {
    console.error("Fetch Deals Error:", err);
    res.status(500).json({ message: "Server error fetching deals" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { customerId, name, amount, stage, account, revenue } = req.body;
    const userId = req.user._id || req.user.id;

    if (!customerId) {
      return res
        .status(400)
        .json({ message: "Please select a customer contact." });
    }

    const newDeal = new Deal({
      userId,
      customerId,
      name,
      amount: Number(amount) || 0,
      stage: stage || "Qualification",
      account: account || "",
      revenue: Number(revenue) || Number(amount) || 0,
    });

    const savedDeal = await newDeal.save();
    const populatedDeal = await savedDeal.populate(
      "customerId",
      "name email phone company",
    );
    res.status(201).json(populatedDeal);
  } catch (err) {
    console.error("Create Deal Error:", err);
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/deals/:id/stage - Update stage status inline
router.patch("/:id/stage", auth, async (req, res) => {
  try {
    const { stage } = req.body;
    const userId = req.user._id || req.user.id;

    const updatedDeal = await Deal.findOneAndUpdate(
      { _id: req.params.id, userId },
      { stage },
      { new: true },
    ).populate("customerId", "name email phone company");

    if (!updatedDeal) {
      return res
        .status(404)
        .json({ message: "Deal not found or unauthorized" });
    }

    res.json(updatedDeal);
  } catch (err) {
    console.error("Update Deal Stage Error:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
