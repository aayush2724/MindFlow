const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// All routes require authentication
router.use(verifyToken);

// Student Onboarding
router.post('/onboard', userController.onboardUser);

// Profile Management
router.get('/me', userController.getMyProfile);
router.put('/me', userController.updateMyProfile);

// Counselor Only: View Student Profiles
router.get('/:uid', requireRole('counselor'), userController.getUserById);

module.exports = router;
