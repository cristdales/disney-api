const { Router } = require('express');
const {
  addGenre,
  deleteGenre,
  editGenre,
  getGenre,
  getGenres,
} = require('../controlers/genresController');
const imageHandler = require('../middleware/imageHandler');

const router = new Router();

router.post('', imageHandler, addGenre);
router.get('', getGenres);
router.get('/:id', getGenre);
router.put('/:id', imageHandler, editGenre);
router.delete('/:id', deleteGenre);

module.exports = router;
