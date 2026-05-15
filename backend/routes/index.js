const express = require('express');
const router = express.Router();
const healthRoutes = require('./health');
const userRoutes = require('./userRoutes');
const checkinRoutes = require('./checkinRoutes');

// Public routes
router.use('/health', healthRoutes);

// Protected modules
router.use('/users', userRoutes);
router.use('/checkins', checkinRoutes);

module.exports = router;
