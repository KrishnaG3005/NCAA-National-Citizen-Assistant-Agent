const express = require("express");
const { body } = require("express-validator");
const { evaluateEligibility } = require("../controllers/eligibilityController");

const router = express.Router();

router.post(
  "/check",
  [
    body("income")
      .optional({ nullable: true })
      .isNumeric()
      .withMessage("Income must be numeric"),
    body("age")
      .optional({ nullable: true })
      .isNumeric()
      .withMessage("Age must be numeric"),
  ],
  evaluateEligibility
);

module.exports = router;
