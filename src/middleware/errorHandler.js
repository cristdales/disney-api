const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'NotFoundError':
      res.status(404).send(err.message);
      break;
    case 'TokenExpiredError':
    case 'JsonWebTokenError':
    case 'AuthenticationError':
      res.status(401).send(err.message);
      break;
    case 'MulterError':
    case 'SequelizeDatabaseError':
    case 'SequelizeValidationError':
    case 'SequelizeForeignKeyConstraintError':
    case 'SequelizeUniqueConstraintError':
    case 'ValidationError':
      res.status(400).send(err.message);
      break;
    default:
      next(err);
  }
};

module.exports = errorHandler;
