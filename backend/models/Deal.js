// backend/models/deals.js
const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer selection is required"],
    },
    name: {
      type: String,
      required: [true, "Deal name is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    stage: {
      type: String,
      enum: [
        "Qualification",
        "Needs Analysis",
        "Negotiation",
        "Closed Won",
        "Closed Lost",
      ],
      default: "Qualification",
    },
    account: {
      type: String,
      trim: true,
      default: "",
    },
    revenue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Deal || mongoose.model("Deal", dealSchema);