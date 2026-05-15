const { auth, db } = require('../utils/firebase');

/**
 * Verify Firebase ID Token
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

/**
 * Role-Based Access Control Middleware
 * @param {Array} allowedRoles - List of roles allowed to access the route
 */
const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { uid } = req.user;
      
      // Fetch user role from Firestore
      const userDoc = await db.collection('users').doc(uid).get();
      
      if (!userDoc.exists) {
        return res.status(403).json({ error: 'Forbidden: User profile not found' });
      }

      const userData = userDoc.data();
      const userRole = userData.role; // Assuming role is stored in user document

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: `Forbidden: Requires one of [${allowedRoles}] roles` });
      }

      req.userProfile = userData;
      next();
    } catch (error) {
      console.error('Error checking role:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};

module.exports = { verifyToken, checkRole };
