const { db, admin } = require('../utils/firebase');

let cachedOverview = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * @desc Get campus-wide analytics overview (Counselor only)
 * @route GET /api/analytics/overview
 */
const getOverviewStats = async (req, res, next) => {
  try {
    // 0. Check Cache
    const now = Date.now();
    if (cachedOverview && (now - lastCacheUpdate < CACHE_DURATION)) {
      console.log('⚡ Serving analytics from cache');
      return res.status(200).json(cachedOverview);
    }

    // 1. Get total students count
    const usersSnapshot = await db.collection('users').where('role', '==', 'student').get();
    const totalStudents = usersSnapshot.size;

    if (totalStudents === 0) {
      return res.status(200).json({ message: 'No student data available yet.' });
    }

    const students = usersSnapshot.docs.map(doc => doc.data());

    // 2. Calculate campus-wide average burnout score
    const avgBurnoutScore = students.reduce((acc, curr) => acc + (curr.latestBurnoutScore || 0), 0) / totalStudents;

    // 3. Risk distribution
    const highRiskCount = students.filter(s => s.latestRiskLevel === 'high' || s.latestRiskLevel === 'critical').length;
    const highRiskPercentage = (highRiskCount / totalStudents) * 100;

    // 4. Check-in rate (today)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const checkinsToday = await db.collection('checkins')
      .where('timestamp', '>=', startOfDay)
      .get();
    
    const checkInRate = (checkinsToday.size / totalStudents) * 100;

    const result = {
      campusAverageBurnout: Math.round(avgBurnoutScore),
      highRiskCount,
      highRiskPercentage: Math.round(highRiskPercentage),
      checkInRate: Math.round(checkInRate),
      totalStudents,
      timestamp: new Date().toISOString()
    };

    cachedOverview = result;
    lastCacheUpdate = Date.now();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get per-department breakdown (Counselor only)
 * @route GET /api/analytics/departments
 */
const getDepartmentBreakdown = async (req, res, next) => {
  try {
    const snapshot = await db.collection('department_analytics')
      .orderBy('date', 'desc')
      .limit(20) // Get latest entries
      .get();

    const analytics = snapshot.docs.map(doc => doc.data());
    
    // Group by department to get the latest for each
    const latestByDept = {};
    analytics.forEach(item => {
      if (!latestByDept[item.department]) {
        latestByDept[item.department] = item;
      }
    });

    res.status(200).json(Object.values(latestByDept));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Internal aggregation task (strips PII and groups by department)
 * @route POST /api/analytics/aggregate
 */
const aggregateAnalytics = async (req, res, next) => {
  try {
    const usersSnapshot = await db.collection('users').where('role', '==', 'student').get();
    const students = usersSnapshot.docs.map(doc => doc.data());

    const departments = {};

    // Group students by department (using 'semester' as proxy for now, or actual 'department' if exists)
    students.forEach(s => {
      const dept = s.department || s.semester || 'Unknown';
      if (!departments[dept]) {
        departments[dept] = {
          scores: [],
          highRiskCount: 0,
          total: 0,
        };
      }
      departments[dept].total++;
      if (s.latestBurnoutScore) departments[dept].scores.push(s.latestBurnoutScore);
      if (s.latestRiskLevel === 'high' || s.latestRiskLevel === 'critical') {
        departments[dept].highRiskCount++;
      }
    });

    const batch = db.batch();
    const today = new Date().toISOString().split('T')[0];

    Object.keys(departments).forEach(deptName => {
      const dept = departments[deptName];

      // Privacy Rule: Only aggregate groups of 5+
      if (dept.total < 5) return;

      const avgScore = dept.scores.length > 0 
        ? dept.scores.reduce((a, b) => a + b, 0) / dept.scores.length 
        : 0;

      const docRef = db.collection('department_analytics').doc(`${deptName}_${today}`);
      batch.set(docRef, {
        department: deptName,
        date: today,
        avgBurnoutScore: Math.round(avgScore),
        highRiskCount: dept.highRiskCount,
        studentCount: dept.total,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    });

    await batch.commit();

    res.status(200).json({ message: 'Analytics aggregated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverviewStats,
  getDepartmentBreakdown,
  aggregateAnalytics
};
