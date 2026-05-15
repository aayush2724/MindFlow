const express = require('express');
const router = express.Router();
const healthRoutes = require('./health');
const userRoutes = require('./userRoutes');
const checkinRoutes = require('./checkinRoutes');
const burnoutRoutes = require('./burnoutRoutes');
const alertRoutes = require('./alertRoutes');
const calendarRoutes = require('./calendarRoutes');
const analyticsRoutes = require('./analyticsRoutes');

// Public routes
router.use('/health', healthRoutes);

// Protected modules
router.use('/users', userRoutes);
router.use('/checkins', checkinRoutes);
router.use('/burnout', burnoutRoutes);
router.use('/alerts', alertRoutes);
router.use('/calendar', calendarRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
