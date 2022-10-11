const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Genre = sequelize.define(
  'Genre',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },
    img: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Genre;
