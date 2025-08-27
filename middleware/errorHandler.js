const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid user ID format';
  }

  console.error('Error:', err.message);
  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;