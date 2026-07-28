const User = require("../models/User");
const Scheme = require("../models/Scheme");
const SavedScheme = require("../models/SavedScheme");

const getDashboard = async (req, res) => {
  const [users, schemes, savedSchemes] = await Promise.all([
    User.countDocuments(),
    Scheme.countDocuments(),
    SavedScheme.countDocuments(),
  ]);

  const recentSchemes = await Scheme.find().sort({ lastUpdated: -1 }).limit(5);

  res.json({
    success: true,
    stats: {
      users,
      schemes,
      savedSchemes,
    },
    recentSchemes,
  });
};

const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: users.length,
    users,
  });
};

module.exports = {
  getDashboard,
  getUsers,
};
