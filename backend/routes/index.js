const express = require('express');
const router = express.Router();
const healthRoutes = require('./health');
const userRoutes = require('./userRoutes');
const checkinRoutes = require('./checkinRoutes');
const burnoutRoutes = require('./burnoutRoutes');
const alertRoutes = require('./alertRoutes');

// Public routes
router.use('/health', healthRoutes);

// Protected modules
router.use('/users', userRoutes);
router.use('/checkins', checkinRoutes);
router.use('/burnout', burnoutRoutes);
router.use('/alerts', alertRoutes);

module.exports = router;
