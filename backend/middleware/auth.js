const { auth, db } = require('../utils/firebase');

/**
 * Verify Firebase ID Token
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: true, message: 'Unauthorized: No token provided', code: 401 });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    
    let role = 'student';
    try {
      // Try to fetch role from Firestore, but don't crash if it fails
      const userDoc = await db.collection('users').doc(decodedToken.uid).get();
      if (userDoc.exists) role = userDoc.data().role;
    } catch (fsError) {
      console.warn('Firestore unreachable, defaulting to student role:', fsError.message);
    }

    req.user = {
      ...decodedToken,
      role
    };
    
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: true, message: 'Unauthorized: Invalid token', code: 401 });
  }
};

module.exports = { verifyToken };
