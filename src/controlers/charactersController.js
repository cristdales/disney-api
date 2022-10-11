const Character = require('../models/Character');
const sequelize = require('../sequelize');
const { NotFoundError, ValidationError } = require('../utils/customErrors');

exports.getCharacters = async (req, res, next) => {
  try {
    const { name, age, movie } = req.query;
    const characters = await Character.findAll({
      attributes: ['id', 'name', 'img'],
      include: {
        association: 'Movies',
        attributes: [],
      },
      where: {
        ...(name && { name }),
        ...(age && { age }),
        ...(movie && { '$Movies.id$': movie }),
      },
    });
    res.send(characters);
  } catch (err) {
    next(err);
  }
};

exports.getCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findOne({
      where: { id },
      include: {
        association: 'Movies',
        attributes: ['title'],
        through: {
          attributes: [],
        },
      },
    });
    if (!character) throw new NotFoundError('character not found');
    res.send(character);
  } catch (err) {
    next(err);
  }
};

exports.addCharacter = async (req, res, next) => {
  try {
    const { movies, ...characterData } = req.body;
    const image = req.file;
    if (!characterData.name)
      throw new ValidationError('name is a mandatory field');
    if (image) characterData.img = image.path;

    await sequelize.transaction(async (t) => {
      const character = await Character.create(characterData, {
        transaction: t,
      });
      await character.addMovies(movies, {
        transaction: t,
      });
    });

    res.status(201).send();
  } catch (err) {
    next(err);
  }
};

exports.editCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { movies, ...newData } = req.body;
    const image = req.file;
    if (image) newData.img = image.path;
    const character = await Character.findOne({ where: { id } });
    if (!character) throw new NotFoundError('character not found');
    character.set(newData);

    await sequelize.transaction(async (t) => {
      if (movies)
        await character.setMovies(movies, {
          transaction: t,
        });
      else if (movies === '') await character.setMovies([], { transaction: t });
      await character.save({
        transaction: t,
      });
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isCharacterDeleted = await Character.destroy({
      where: { id },
      cascade: true,
    });
    if (!isCharacterDeleted) throw new NotFoundError('character not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
