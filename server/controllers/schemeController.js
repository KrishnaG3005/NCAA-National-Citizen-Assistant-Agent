const Scheme = require("../models/Scheme");
const SavedScheme = require("../models/SavedScheme");

const buildSearchFilter = (query) => {
  if (!query) {
    return {};
  }

  const regex = new RegExp(query, "i");

  return {
    $or: [
      { title: regex },
      { description: regex },
      { category: regex },
      { state: regex },
      { gender: regex },
      { benefits: regex },
      { documents: regex },
      { applicationLink: regex },
    ],
  };
};

const getSchemes = async (req, res) => {
  const { q } = req.query;
  const schemes = await Scheme.find(buildSearchFilter(q)).sort({
    lastUpdated: -1,
  });

  res.json({
    success: true,
    count: schemes.length,
    schemes,
  });
};

const getSchemeById = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);

  if (!scheme) {
    return res.status(404).json({
      success: false,
      message: "Scheme not found",
    });
  }

  res.json({
    success: true,
    scheme,
  });
};

const createScheme = async (req, res) => {
  const scheme = await Scheme.create({
    ...req.body,
    createdBy: req.user?._id,
    lastUpdated: req.body.lastUpdated || new Date(),
  });

  res.status(201).json({
    success: true,
    scheme,
  });
};

const updateScheme = async (req, res) => {
  const scheme = await Scheme.findByIdAndUpdate(
    req.params.id,
    { ...req.body, lastUpdated: new Date() },
    { new: true, runValidators: true }
  );

  if (!scheme) {
    return res.status(404).json({
      success: false,
      message: "Scheme not found",
    });
  }

  res.json({
    success: true,
    scheme,
  });
};

const deleteScheme = async (req, res) => {
  const scheme = await Scheme.findByIdAndDelete(req.params.id);

  if (!scheme) {
    return res.status(404).json({
      success: false,
      message: "Scheme not found",
    });
  }

  await SavedScheme.deleteMany({ scheme: req.params.id });

  res.json({
    success: true,
    message: "Scheme deleted",
  });
};

const saveScheme = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);

  if (!scheme) {
    return res.status(404).json({
      success: false,
      message: "Scheme not found",
    });
  }

  const saved = await SavedScheme.findOneAndUpdate(
    { userId: req.user._id, schemeId: req.params.id },
    { userId: req.user._id, schemeId: req.params.id, savedAt: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).populate("schemeId");

  res.status(201).json({
    success: true,
    saved,
  });
};

const removeSavedScheme = async (req, res) => {
  const removed = await SavedScheme.findOneAndDelete({
    userId: req.user._id,
    schemeId: req.params.id,
  });

  if (!removed) {
    return res.status(404).json({
      success: false,
      message: "Saved scheme not found",
    });
  }

  res.json({
    success: true,
    message: "Saved scheme removed",
  });
};

const getSavedSchemes = async (req, res) => {
  const savedSchemes = await SavedScheme.find({
    userId: req.user._id,
  }).populate("schemeId");

  res.json({
    success: true,
    count: savedSchemes.length,
    savedSchemes,
  });
};

module.exports = {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
  saveScheme,
  removeSavedScheme,
  getSavedSchemes,
};
