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
    
    // Fetch role from Firestore if not in token custom claims
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    const role = userDoc.exists ? userDoc.data().role : 'student';

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
