const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Month: {
      type: String,
      required: true,
      default: () => new Date().toLocaleString("default", { month: "long" }), // e.g., "April"
    },
    Year: {
      type: String,
      required: true,
      default: () => new Date().getFullYear().toString(), // e.g., "2025"
    },
    food: {
      type: Number,
      required: true,
    },
    entertainment: {
      type: Number,
      required: true,
    },
    "tour/travel": {
      type: Number,
      required: true,
    },
    fashion: {
      type: Number,
      required: true,
    },
    academics: {
      type: Number,
      required: true,
    },
    Budget: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

budgetSchema.post("find", function (results) {
  results.reverse();
});

const budgetModel = mongoose.model("Budget", budgetSchema);
module.exports = budgetModel;
