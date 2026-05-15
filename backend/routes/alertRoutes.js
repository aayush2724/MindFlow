const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { verifyToken, checkRole } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

// Student routes
router.get('/me', alertController.getMyAlerts);

// Counselor only routes
router.get('/', checkRole(['counselor']), alertController.getAllAlerts);
router.put('/:alertId/acknowledge', checkRole(['counselor']), alertController.acknowledgeAlert);

module.exports = router;
