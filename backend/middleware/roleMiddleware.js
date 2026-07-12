// Middleware to restrict route access by user roles
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated and has permitted role
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }
    next();
  };
};

module.exports = authorize;
