const { Router } = require('express');
const { register, login } = require('../controlers/authController');

const router = new Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
