const express = require("express");
const { body } = require("express-validator");
const {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
  saveScheme,
  removeSavedScheme,
  getSavedSchemes,
} = require("../controllers/schemeController");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/admin");

const router = express.Router();

router.get("/", getSchemes);
router.get("/saved", protect, getSavedSchemes);
router.get("/:id", getSchemeById);
router.post(
  "/",
  protect,
  adminOnly,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("benefits").notEmpty().withMessage("Benefits are required"),
  ],
  createScheme
);
router.put("/:id", protect, adminOnly, updateScheme);
router.delete("/:id", protect, adminOnly, deleteScheme);

router.post("/:id/save", protect, saveScheme);
router.delete("/:id/save", protect, removeSavedScheme);

module.exports = router;
