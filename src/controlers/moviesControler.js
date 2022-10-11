const moment = require('moment');
const Movie = require('../models/Movie');
const sequelize = require('../sequelize');
const { ValidationError, NotFoundError } = require('../utils/customErrors');

exports.getMovies = async (req, res, next) => {
  try {
    const { name, genre, order } = req.query;
    const movies = await Movie.findAll({
      attributes: ['id', 'title', 'img', 'releaseDate'],
      include: {
        association: 'Genres',
        attributes: [],
        through: { attributes: [] },
      },
      where: {
        ...(name && { title: name }),
        ...(genre && { '$Genres.id$': genre }),
      },
      order: [['releaseDate', order || 'ASC']],
    });
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

exports.getMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({
      where: { id },
      include: [
        {
          association: 'Genres',
          attributes: ['name'],
          through: { attributes: [] },
        },
        {
          association: 'Characters',
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });
    if (!movie) throw new NotFoundError('movie not found');
    res.send(movie);
  } catch (err) {
    next(err);
  }
};

exports.addMovie = async (req, res, next) => {
  try {
    const { genres, characters, ...movieData } = req.body;
    const image = req.file;
    if (!movieData.title)
      throw new ValidationError('title is a mandatory field');
    if (image) movieData.img = image.path;
    if (
      movieData.releaseDate &&
      !moment(movieData.releaseDate, 'DD/MM/YYYY', true).isValid()
    )
      throw new ValidationError('invalid date');

    await sequelize.transaction(async (t) => {
      const movie = await Movie.create(movieData, { transaction: t });
      await movie.addGenres(genres, { transaction: t });
      await movie.addCharacters(characters, { transaction: t });
    });

    res.status(201).send();
  } catch (err) {
    next(err);
  }
};

exports.editMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { genres, characters, ...newData } = req.body;
    const image = req.file;
    if (
      newData.releaseDate &&
      !moment(newData.releaseDate, 'DD/MM/YYYY', true).isValid()
    )
      throw new ValidationError('invalid date');
    if (image) newData.img = image.path;
    const movie = await Movie.findOne({ where: { id } });
    if (!movie) throw new NotFoundError('movie not found');
    movie.set(newData);

    await sequelize.transaction(async (t) => {
      if (genres) await movie.setGenres(genres, { transaction: t });
      else if (genres === '') await movie.setGenres([], { transaction: t });
      if (characters) await movie.setCharacters(characters, { transaction: t });
      else if (characters === '')
        await movie.setCharacters([], { transaction: t });
      await movie.save({ transaction: t });
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isMovieDeleted = await Movie.destroy({
      where: { id },
      cascade: true,
    });
    if (!isMovieDeleted) throw new NotFoundError('movie not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
