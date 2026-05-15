const express = require('express');
const router = express.Router();
const burnoutController = require('../controllers/burnoutController');
const { verifyToken } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

router.get('/me', burnoutController.getMyLatestScore);
router.get('/me/history', burnoutController.getMyScoreHistory);

module.exports = router;
