const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new jwt.JsonWebTokenError('missing token');
    const token = authorization.split('Bearer ')[1];
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
