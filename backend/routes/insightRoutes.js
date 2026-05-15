const express = require('express');
const router = express.Router();
const insightController = require('../controllers/insightController');
const { verifyToken } = require('../middleware/auth');
const { dailyActivityLimiter } = require('../middleware/rateLimit');

// All routes require authentication
router.use(verifyToken);

router.get('/me', dailyActivityLimiter, insightController.getMyInsights);

module.exports = router;
