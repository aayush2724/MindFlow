const { db, admin } = require('./firebase');

/**
 * Calculate and update the burnout score for a user
 * This is a simplified version of the burnout algorithm
 * @param {string} uid - User ID
 */
const calculateBurnoutScore = async (uid) => {
  try {
    console.log(`Calculating burnout score for user: ${uid}`);
    
    // Get last 7 check-ins to see trends
    const checkinsSnapshot = await db.collection('checkins')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .limit(7)
      .get();

    if (checkinsSnapshot.empty) return;

    const checkins = checkinsSnapshot.docs.map(doc => doc.data());
    
    // Calculate average metrics
    const avgMood = checkins.reduce((acc, curr) => acc + curr.moodScore, 0) / checkins.length;
    const avgStress = checkins.reduce((acc, curr) => acc + curr.stressLevel, 0) / checkins.length;
    const avgSleep = checkins.reduce((acc, curr) => acc + curr.sleepHours, 0) / checkins.length;
    const avgWorkload = checkins.reduce((acc, curr) => acc + curr.workloadRating, 0) / checkins.length;

    /**
     * Burnout Score Algorithm (Mental Health Proxy)
     * High stress, high workload, low mood, and low sleep increase the score.
     * Scale: 0 to 100
     */
    let burnoutScore = (
      (avgStress * 3) + 
      (avgWorkload * 3) + 
      ((11 - avgMood) * 2) + 
      ((10 - avgSleep) * 2)
    );

    // Normalize to 0-100 range
    burnoutScore = Math.min(Math.max(burnoutScore, 0), 100);

    // Update user profile with latest burnout score
    await db.collection('users').doc(uid).update({
      burnoutScore: Math.round(burnoutScore),
      lastAnalysisAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`Burnout score for ${uid} updated to: ${Math.round(burnoutScore)}`);
  } catch (error) {
    console.error('Error calculating burnout score:', error);
  }
};

module.exports = { calculateBurnoutScore };
