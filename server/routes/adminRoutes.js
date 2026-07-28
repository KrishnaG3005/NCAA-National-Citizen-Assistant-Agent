const express = require("express");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/admin");
const { getDashboard, getUsers } = require("../controllers/adminController");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/dashboard", getDashboard);
router.get("/users", getUsers);

module.exports = router;
