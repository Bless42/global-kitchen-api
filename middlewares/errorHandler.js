const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Catches invalid/bad Hex MongoDB ObjectIDs gracefully without locking up the Node application runtime loop
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Resource not found. Invalid ID format.',
      });
    }
  
    // Handles document structural constraint validation warnings directly
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
  
    return res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Internal Server Error',
    });
  };
  
  module.exports = errorHandler;