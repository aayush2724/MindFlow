const { db, admin } = require('../utils/firebase');

/**
 * @desc Save student profile after first login
 * @route POST /api/users/onboard
 */
const onboardUser = async (req, res, next) => {
  try {
    const { uid, email, name } = req.user; // From verifyToken middleware
    const { semester, subjects, sleepGoal } = req.body;

    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return res.status(200).json({ message: 'Already onboarded', user: userDoc.data() });
    }

    const userData = {
      uid,
      name: name || (req.body.role === 'counselor' ? 'Counselor' : 'Student'),
      email,
      role: req.body.role || 'student', // Allow custom role
      semester: semester || null,
      subjects: subjects || [],
      sleepGoal: sleepGoal || 8,
      onboarded: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await userRef.set(userData);

    res.status(201).json({
      message: 'Onboarding successful',
      user: userData
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get current user profile
 * @route GET /api/users/me
 */
const getMyProfile = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update current user profile
 * @route PUT /api/users/me
 */
const updateMyProfile = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const updates = req.body;

    // Filter out restricted fields
    const restrictedFields = ['uid', 'email', 'role', 'createdAt', 'updatedAt'];
    restrictedFields.forEach(field => delete updates[field]);

    updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();

    const userRef = db.collection('users').doc(uid);
    await userRef.update(updates);

    const updatedDoc = await userRef.get();
    res.status(200).json(updatedDoc.data());
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get specific user profile (Counselor only)
 * @route GET /api/users/:uid
 */
const getUserById = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();

    // Redact PII for non-owner access if needed, but here we just return the profile
    // The middleware checkRole(['counselor']) handles the permission
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  onboardUser,
  getMyProfile,
  updateMyProfile,
  getUserById
};
