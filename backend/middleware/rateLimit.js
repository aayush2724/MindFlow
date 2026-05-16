const rateLimit = require('express-rate-limit');

/**
 * API Burst Rate Limiter
 * Prevents rapid abuse of AI and check-in endpoints
 */
const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: {
    error: true,
    message: 'Burst limit reached. Please wait 60 seconds before trying again.',
    code: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiRateLimiter };
