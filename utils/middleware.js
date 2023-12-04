import logger from './logger.js';

// Error handler
function errorHandler(error, request, response, next) {
  logger.error(error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else {
    next(error);
  }
}

export default { errorHandler };