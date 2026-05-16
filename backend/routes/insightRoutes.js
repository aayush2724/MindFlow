const express = require('express');
const router = express.Router();
const insightController = require('../controllers/insightController');
const { verifyToken } = require('../middleware/auth');
const { apiRateLimiter } = require('../middleware/rateLimit');

// All routes require authentication
router.use(verifyToken);

router.get('/me', apiRateLimiter, insightController.getMyInsights);

module.exports = router;
