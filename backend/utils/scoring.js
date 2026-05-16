const { db, admin } = require('./firebase');

/**
 * Determine risk level based on score
 */
const getRiskLevel = (score) => {
  if (score <= 30) return 'low';
  if (score <= 55) return 'moderate';
  if (score <= 79) return 'high';
  return 'critical';
};

/**
 * Calculate and update the burnout score for a user
 * @param {string} uid - User ID
 */
const calculateBurnoutScore = async (uid) => {
  try {
    console.log(`🚀 Refining burnout score for user: ${uid}`);
    
    // 1. Get user's sleep goal and previous latest score
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) return;
    const { sleepGoal = 8 } = userDoc.data();

    const previousScoreSnapshot = await db.collection('burnout_scores')
      .where('uid', '==', uid)
      .orderBy('calculatedAt', 'desc')
      .limit(1)
      .get();
    
    const previousScore = previousScoreSnapshot.empty ? null : previousScoreSnapshot.docs[0].data().score;

    // 2. Get last 7 check-ins
    const checkinsSnapshot = await db.collection('checkins')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .limit(7)
      .get();

    if (checkinsSnapshot.empty) return;

    const checkins = checkinsSnapshot.docs.map(doc => doc.data());
    
    // 3. Calculate weighted components
    const avgStress = checkins.reduce((acc, curr) => acc + curr.stressLevel, 0) / checkins.length;
    const avgWorkload = checkins.reduce((acc, curr) => acc + curr.workloadRating, 0) / checkins.length;
    const avgMood = checkins.reduce((acc, curr) => acc + curr.moodScore, 0) / checkins.length;
    const avgSleep = checkins.reduce((acc, curr) => acc + curr.sleepHours, 0) / checkins.length;

    const sleepDeficit = Math.max(0, sleepGoal - avgSleep);
    const moodInverse = 11 - avgMood; // Since mood is 1-10, inverse makes 1 (bad) -> 10 (risk)

    /**
     * Refined Algorithm:
     * Stress: 35%
     * Workload: 30%
     * Mood Inverse: 20%
     * Sleep Deficit: 15% (scaled to 0-10 based on max likely deficit of 5 hours)
     */
    const sleepFactor = Math.min((sleepDeficit / 5) * 10, 10);
    
    let rawScore = (
      (avgStress * 3.5) + 
      (avgWorkload * 3.0) + 
      (moodInverse * 2.0) + 
      (sleepFactor * 1.5)
    );

    // Final score scaled to 0-100
    const finalScore = Math.round(Math.min(Math.max(rawScore * 1, 0), 100));
    const riskLevel = getRiskLevel(finalScore);

    // 4. Determine trend
    let trend = 'stable';
    if (previousScore !== null) {
      if (finalScore > previousScore + 5) trend = 'worsening';
      else if (finalScore < previousScore - 5) trend = 'improving';
    }

    // 5. Save score entry
    const scoreData = {
      uid,
      score: finalScore,
      riskLevel,
      trend,
      calculatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('burnout_scores').add(scoreData);

    // 6. Update user profile for quick access
    await db.collection('users').doc(uid).update({
      latestBurnoutScore: finalScore,
      latestRiskLevel: riskLevel,
      latestTrend: trend,
      lastAnalysisAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // 7. Critical Alert Trigger
    if (riskLevel === 'critical') {
      await db.collection('alerts').add({
        uid,
        type: 'burnout_critical',
        message: 'Student has reached a critical burnout risk level. Intervention recommended.',
        score: finalScore,
        acknowledged: false,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'pending'
      });
      console.log(`⚠️ CRITICAL burnout alert generated for user: ${uid}`);
    }

    console.log(`✅ Burnout calculation complete: ${finalScore} (${riskLevel})`);
  } catch (error) {
    console.error('❌ Error in burnout scoring engine:', error);
  }
};

module.exports = { calculateBurnoutScore };
