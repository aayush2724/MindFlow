const { db, admin } = require('./utils/firebase');

async function seedData() {
  console.log('Seeding mock data into Firestore...');

  const batch = db.batch();

  // Seed Users (Students)
  const depts = ['School of Engineering', 'Faculty of Fine Arts', 'Medical Sciences'];
  
  for (let i = 0; i < 50; i++) {
    const dept = depts[i % 3];
    const riskLevels = ['low', 'moderate', 'high', 'critical'];
    const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const score = risk === 'critical' ? 80 + Math.random() * 20 : risk === 'high' ? 60 + Math.random() * 20 : 20 + Math.random() * 40;

    const userRef = db.collection('users').doc(`student_mock_${i}`);
    batch.set(userRef, {
      role: 'student',
      department: dept,
      latestBurnoutScore: Math.round(score),
      latestRiskLevel: risk,
      email: `student${i}@mindflow.mock`
    });
  }

  // Seed Checkins for today to boost the checkInRate
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  for (let i = 0; i < 20; i++) {
    const checkinRef = db.collection('checkins').doc(`checkin_mock_${i}`);
    batch.set(checkinRef, {
      uid: `student_mock_${i}`,
      timestamp: startOfDay,
      score: 50
    });
  }

  // Seed Alerts
  const alertsData = [
    {
      uid: 'student_mock_1',
      riskLevel: 'critical',
      score: 85,
      message: 'Burnout threshold exceeded [0.85] for this node.',
      acknowledged: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      uid: 'student_mock_2',
      riskLevel: 'high',
      score: 65,
      message: 'High intensity activity detected. Intervention suggested.',
      acknowledged: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      uid: 'student_mock_3',
      riskLevel: 'low',
      score: 25,
      message: 'Positive trend. Calm Sessions up 22% vs 24H AVG.',
      acknowledged: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    }
  ];

  for (let i = 0; i < alertsData.length; i++) {
    const alertRef = db.collection('alerts').doc(`alert_mock_${i}`);
    batch.set(alertRef, alertsData[i]);
  }

  await batch.commit();
  console.log('Users, Checkins, and Alerts seeded successfully!');

  // Now, we need to generate the department aggregated data.
  // We can just call the aggregation function directly or simulate its output.
  const deptBatch = db.batch();
  const today = new Date().toISOString().split('T')[0];
  
  depts.forEach((deptName, i) => {
    const docRef = db.collection('department_analytics').doc(`${deptName}_${today}`);
    const isCritical = i === 0;
    deptBatch.set(docRef, {
      department: deptName,
      date: today,
      avgBurnoutScore: isCritical ? 75 : 45 - i * 5,
      highRiskCount: isCritical ? 12 : 2,
      studentCount: 1500 + i * 200,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });

  await deptBatch.commit();
  console.log('Department analytics seeded successfully!');
  
  process.exit(0);
}

seedData().catch(console.error);
