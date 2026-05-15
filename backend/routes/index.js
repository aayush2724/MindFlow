const express = require('express');
const router = express.Router();
const healthRoutes = require('./health');
const userRoutes = require('./userRoutes');

// Public routes
router.use('/health', healthRoutes);

// User routes (Internal protection handled within userRoutes)
router.use('/users', userRoutes);

module.exports = router;
