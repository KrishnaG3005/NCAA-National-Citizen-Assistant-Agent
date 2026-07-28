const jwt = require("jsonwebtoken");
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
});

const registerUser = async (req, res) => {
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

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

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
    token: generateToken(user._id),
    user: formatUser(user),
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  res.json({
    success: true,
    token: generateToken(user._id),
    user: formatUser(user),
  });
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    user: formatUser(req.user),
  });
};

const updateProfile = async (req, res) => {
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
  if (password) req.user.password = password;

  const updatedUser = await req.user.save();

  res.json({
    success: true,
    user: formatUser(updatedUser),
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
};
