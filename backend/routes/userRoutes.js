const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, checkRole } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

// Student Onboarding
router.post('/onboard', userController.onboardUser);

// Profile Management
router.get('/me', userController.getMyProfile);
router.put('/me', userController.updateMyProfile);

// Counselor Only: View Student Profiles
router.get('/:uid', checkRole(['counselor']), userController.getUserById);

module.exports = router;
