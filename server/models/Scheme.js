const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Scheme title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    minIncome: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxIncome: {
      type: Number,
      default: null,
      min: 0,
    },
    state: {
      type: String,
      default: "All",
      trim: true,
    },
    gender: {
      type: String,
      default: "All",
      trim: true,
    },
    ageMin: {
      type: Number,
      default: 18,
      min: 0,
    },
    ageMax: {
      type: Number,
      default: 60,
      min: 0,
    },
    documents: [
      {
        type: String,
        trim: true,
      },
    ],
    benefits: {
      type: String,
      required: [true, "Benefits text is required"],
      trim: true,
    },
    applicationLink: {
      type: String,
      trim: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scheme", schemeSchema);
