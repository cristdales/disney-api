const config = require('config');
require('dotenv').config();

const env = process.env;

exports.PORT = env.PORT || 5000;
exports.JWT_SECRET = env.JWT_SECRET || 'secret';
exports.MAX_FILE_SIZE = 3 * 1024 * 1024;
exports.DB_URI = env.DB_URI;
exports.SB_API_KEY = env.SB_API_KEY;
exports.SB_EMAIL = env.SB_EMAIL;
exports.DB_CONFIG = config.get('database');
