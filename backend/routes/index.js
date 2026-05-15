const express = require('express');
const router = express.Router();
const healthRoutes = require('./health');

// Public routes
router.use('/health', healthRoutes);

// Protected routes (example structure)
// const studentRoutes = require('./students');
// const counselorRoutes = require('./counselors');
// router.use('/students', verifyToken, checkRole(['student']), studentRoutes);
// router.use('/counselors', verifyToken, checkRole(['counselor']), counselorRoutes);

module.exports = router;
