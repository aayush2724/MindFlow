const express = require('express');
const router = express.Router();
const healthRoutes = require('./health');
const userRoutes = require('./userRoutes');
const checkinRoutes = require('./checkinRoutes');
const burnoutRoutes = require('./burnoutRoutes');

// Public routes
router.use('/health', healthRoutes);

// Protected modules
router.use('/users', userRoutes);
router.use('/checkins', checkinRoutes);
router.use('/burnout', burnoutRoutes);

module.exports = router;
