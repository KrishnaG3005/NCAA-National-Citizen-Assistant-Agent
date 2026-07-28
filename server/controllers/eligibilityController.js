const Scheme = require("../models/Scheme");

const evaluateEligibility = async (req, res) => {
  const {
    annualIncome = null,
    state = "",
    age = null,
    gender = "",
    category = "",
  } = req.body;

  const schemes = await Scheme.find();

  const matches = schemes.filter((scheme) => {
    const income = annualIncome == null ? null : Number(annualIncome);
    const minIncomeAllowed =
      income == null || income >= (scheme.minIncome ?? 0);
    const maxIncomeAllowed =
      income == null || scheme.maxIncome == null || income <= scheme.maxIncome;
    const stateAllowed =
      !state || scheme.state === "All" || scheme.state === state;
    const genderAllowed =
      !gender || scheme.gender === "All" || scheme.gender === gender;
    const categoryAllowed = !category || scheme.category === category;

    let ageAllowed = true;
    if (age !== null && age !== undefined && age !== "") {
      const numericAge = Number(age);
      ageAllowed = numericAge >= scheme.ageMin && numericAge <= scheme.ageMax;
    }

    return (
      minIncomeAllowed &&
      maxIncomeAllowed &&
      stateAllowed &&
      genderAllowed &&
      categoryAllowed &&
      ageAllowed
    );
  });

  res.json({
    success: true,
    count: matches.length,
    schemes: matches,
  });
};

module.exports = { evaluateEligibility };
