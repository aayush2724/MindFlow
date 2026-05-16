const express = require('express');
const router = express.Router();
const checkinController = require('../controllers/checkinController');
const { verifyToken } = require('../middleware/auth');
const { apiRateLimiter } = require('../middleware/rateLimit');

// All routes require authentication
router.use(verifyToken);

router.post('/', apiRateLimiter, checkinController.submitCheckin);
router.get('/me', checkinController.getMyCheckins);
router.get('/me/today', checkinController.getTodayCheckin);

module.exports = router;
