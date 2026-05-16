const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// Institution-level routes (Counselor only)
router.get('/overview', verifyToken, requireRole('counselor'), analyticsController.getOverviewStats);
router.get('/departments', verifyToken, requireRole('counselor'), analyticsController.getDepartmentBreakdown);

// System aggregation (Internal trigger)
router.post('/aggregate', analyticsController.aggregateAnalytics);

module.exports = router;
