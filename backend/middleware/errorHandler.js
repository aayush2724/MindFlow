/**
 * Global Error Handler
 */
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: true,
    message: message,
    code: status
  });
};

module.exports = errorHandler;
