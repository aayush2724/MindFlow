const rateLimit = require('express-rate-limit');

/**
 * Daily activity rate limiter
 * Limit check-ins and AI requests to prevent abuse
 */
const dailyActivityLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: {
    error: true,
    message: 'Too many requests, please try again after a minute.',
    code: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { dailyActivityLimiter };
