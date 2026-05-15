const { db, admin } = require('../utils/firebase');
const { calculateBurnoutScore } = require('../utils/scoring');

/**
 * @desc Submit a daily check-in
 * @route POST /api/checkins
 */
const submitCheckin = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const { moodScore, sleepHours, stressLevel, workloadRating, notes } = req.body;

    // 1. Check if user already checked in today (UTC)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingCheckin = await db.collection('checkins')
      .where('uid', '==', uid)
      .where('timestamp', '>=', startOfDay)
      .where('timestamp', '<=', endOfDay)
      .limit(1)
      .get();

    if (!existingCheckin.empty) {
      return res.status(400).json({ error: 'You have already submitted a check-in for today' });
    }

    // 2. Create the check-in
    const checkinData = {
      uid,
      moodScore: Number(moodScore),
      sleepHours: Number(sleepHours),
      stressLevel: Number(stressLevel),
      workloadRating: Number(workloadRating),
      notes: notes || '',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('checkins').add(checkinData);
    
    // 3. Trigger burnout calculation asynchronously
    // Note: We don't 'await' it to avoid delaying the response
    calculateBurnoutScore(uid);

    res.status(201).json({
      message: 'Check-in submitted successfully',
      id: docRef.id
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get last 30 check-ins for the user
 * @route GET /api/checkins/me
 */
const getMyCheckins = async (req, res, next) => {
  try {
    const { uid } = req.user;

    const snapshot = await db.collection('checkins')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .limit(30)
      .get();

    const checkins = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate() // Convert Firestore timestamp to JS Date
    }));

    res.status(200).json(checkins);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get today's check-in for the user
 * @route GET /api/checkins/me/today
 */
const getTodayCheckin = async (req, res, next) => {
  try {
    const { uid } = req.user;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const snapshot = await db.collection('checkins')
      .where('uid', '==', uid)
      .where('timestamp', '>=', startOfDay)
      .where('timestamp', '<=', endOfDay)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(200).json({ checkedIn: false });
    }

    const doc = snapshot.docs[0];
    res.status(200).json({
      checkedIn: true,
      data: {
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitCheckin,
  getMyCheckins,
  getTodayCheckin
};
