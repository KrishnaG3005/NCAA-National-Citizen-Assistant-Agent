const adminOnly = (req, res, next) => {
  const adminEmails = (
    process.env.ADMIN_EMAILS ||
    process.env.ADMIN_EMAIL ||
    ""
  )
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const userEmail = req.user?.email?.toLowerCase();

  if (
    !req.user ||
    adminEmails.length === 0 ||
    !adminEmails.includes(userEmail)
  ) {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

module.exports = { adminOnly };
