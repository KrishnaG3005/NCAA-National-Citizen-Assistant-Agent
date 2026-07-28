const mongoose = require("mongoose");

const savedSchemeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

savedSchemeSchema.index({ userId: 1, schemeId: 1 }, { unique: true });

module.exports = mongoose.model("SavedScheme", savedSchemeSchema);
