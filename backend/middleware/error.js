/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server';

  res.status(status).json({
    error: {
      message,
      status,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = errorHandler;
