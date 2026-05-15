const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// All routes require authentication
router.use(verifyToken);

// Student routes
router.get('/me', alertController.getMyAlerts);

// Counselor only routes
router.get('/', requireRole('counselor'), alertController.getAllAlerts);
router.put('/:alertId/acknowledge', requireRole('counselor'), alertController.acknowledgeAlert);

module.exports = router;
