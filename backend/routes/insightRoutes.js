const express = require('express');
const router = express.Router();
const insightController = require('../controllers/insightController');
const { verifyToken } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

router.get('/me', insightController.getMyInsights);

module.exports = router;
