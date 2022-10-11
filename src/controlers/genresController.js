const { ValidationError } = require('sequelize');
const Genre = require('../models/Genre');
const { NotFoundError } = require('../utils/customErrors');

exports.getGenres = async (req, res, next) => {
  try {
    const genres = await Genre.findAll({ attributes: ['id', 'name'] });
    res.send(genres);
  } catch (err) {
    next(err);
  }
};

exports.getGenre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findOne({ where: { id } });
    if (!genre) throw new NotFoundError('genre not found');
    res.send(genre);
  } catch (err) {
    next(err);
  }
};

exports.addGenre = async (req, res, next) => {
  try {
    const genreData = req.body;
    const image = req.file;
    if (!genreData.name) throw new ValidationError('name is a mandatory field');
    if (image) genreData.img = image.path;
    await Genre.create(genreData);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};

exports.editGenre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const image = req.file;
    if (image) newData.img = image.path;
    const isUserUpdated = await Genre.update(newData, { where: { id } });
    if (!isUserUpdated[0]) throw new NotFoundError('genre not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.deleteGenre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isGenreDeleted = await Genre.destroy({
      where: { id },
      cascade: true,
    });
    if (!isGenreDeleted) throw new NotFoundError('genre not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
