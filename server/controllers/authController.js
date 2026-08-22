const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone || null,
  state: user.state || null,
  district: user.district || null,
  gender: user.gender || null,
  dob: user.dob || null,
  occupation: user.occupation || null,
  annualIncome: user.annualIncome ?? 0,
  category: user.category || null,
  savedSchemes: user.savedSchemes || [],
  role: (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .includes(user.email.toLowerCase())
    ? "admin"
    : "citizen",
});

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });

    return true;
  }

  return false;
};

const registerUser = async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  try {
    const {
      name,
      email,
      password,
      phone,
      state,
      district,
      gender,
      dob,
      occupation,
      annualIncome,
      category,
      savedSchemes,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      state,
      district,
      gender,
      dob,
      occupation,
      annualIncome,
      category,
      savedSchemes,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      user: formatUser(user),
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: formatUser(user),
    });
  } catch (error) {
    console.error("Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while logging in",
    });
  }
};

const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: formatUser(req.user),
    });
  } catch (error) {
    console.error("Get Me Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      state,
      district,
      gender,
      dob,
      occupation,
      annualIncome,
      category,
      password,
    } = req.body;

    if (name !== undefined) req.user.name = name;
    if (phone !== undefined) req.user.phone = phone;
    if (state !== undefined) req.user.state = state;
    if (district !== undefined) req.user.district = district;
    if (gender !== undefined) req.user.gender = gender;
    if (dob !== undefined) req.user.dob = dob;
    if (occupation !== undefined) req.user.occupation = occupation;
    if (annualIncome !== undefined) req.user.annualIncome = annualIncome;
    if (category !== undefined) req.user.category = category;

    // Password will be automatically hashed by User.js pre("save") middleware
    if (password) req.user.password = password;

    const updatedUser = await req.user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: formatUser(updatedUser),
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
};
