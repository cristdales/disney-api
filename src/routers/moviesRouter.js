const { Router } = require('express');
const {
  deleteMovie,
  editMovie,
  getMovie,
  getMovies,
  addMovie,
} = require('../controlers/moviesControler');
const imageHandler = require('../middleware/imageHandler');

const router = Router();

router.post('/', imageHandler, addMovie);
router.get('/', getMovies);
router.get('/:id', getMovie);
router.put('/:id', imageHandler, editMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
