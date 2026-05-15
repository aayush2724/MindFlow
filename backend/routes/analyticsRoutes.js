const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Institution-level routes (Counselor only)
router.get('/overview', verifyToken, checkRole(['counselor']), analyticsController.getOverviewStats);
router.get('/departments', verifyToken, checkRole(['counselor']), analyticsController.getDepartmentBreakdown);

// System aggregation (Internal trigger)
router.post('/aggregate', analyticsController.aggregateAnalytics);

module.exports = router;
