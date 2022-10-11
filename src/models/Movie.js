const { DataTypes } = require('sequelize');
const Character = require('./Character');
const Genre = require('./Genre');
const sequelize = require('../sequelize');

const Movie = sequelize.define(
  'Movie',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    score: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    img: {
      type: DataTypes.STRING,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      get() {
        const date = this.getDataValue('releaseDate');
        if (!date) return null;
        const dateString = this.getDataValue('releaseDate');
        const dateArr = dateString.split('-').reverse();
        return dateArr.join('/');
      },
      set(dateString) {
        const dateArr = dateString.split('/').reverse();
        const newDateString = dateArr.join('');
        this.setDataValue('releaseDate', newDateString);
      },
    },
  },
  {
    timestamps: false,
  }
);

Movie.belongsToMany(Character, {
  through: 'CharactersMovies',
  timestamps: false,
});
Character.belongsToMany(Movie, { through: 'CharactersMovies' });

Movie.belongsToMany(Genre, {
  through: 'GenresMovies',
  timestamps: false,
});
Genre.belongsToMany(Movie, { through: 'GenresMovies' });

module.exports = Movie;
