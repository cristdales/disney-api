const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Character = sequelize.define(
  'Character',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    age: { type: DataTypes.INTEGER },
    weight: { type: DataTypes.DOUBLE },
    history: { type: DataTypes.TEXT },
    img: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);

module.exports = Character;
