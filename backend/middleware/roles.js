/**
 * Role Guard Middleware
 * @param {string} role - Required role ("student" | "counselor")
 */
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: true, message: 'Unauthorized', code: 401 });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ 
        error: true, 
        message: `Forbidden: Requires ${role} role`, 
        code: 403 
      });
    }

    next();
  };
};

module.exports = { requireRole };
