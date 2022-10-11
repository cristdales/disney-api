const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    hashedPwd: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
