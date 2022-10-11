const { DB_CONFIG } = require('./utils/constants');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DB_CONFIG);

module.exports = sequelize;
