const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../utils/constants');
const {
  AuthenticationError,
  ValidationError,
} = require('../utils/customErrors');
const { sendWelcomeMessage } = require('../utils/mailer');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password) throw new ValidationError('password is a mandatory field');
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(password, saltRounds);
    const user = User.build({ email, hashedPwd });
    await user.save();
    sendWelcomeMessage(email);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) throw new AuthenticationError('invalid username');
    const pwMatch = await bcrypt.compare(password, user.hashedPwd);
    if (!pwMatch) throw new AuthenticationError('wrong password');
    delete user.dataValues.hashedPwd;
    const token = jwt.sign(user.dataValues, JWT_SECRET, { expiresIn: '2h' });
    res.send({ user: user.dataValues, token });
  } catch (err) {
    next(err);
  }
};
