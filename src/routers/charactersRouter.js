const { Router } = require('express');
const {
  addCharacter,
  deleteCharacter,
  editCharacter,
  getCharacter,
  getCharacters,
} = require('../controlers/charactersController');
const imageHandler = require('../middleware/imageHandler');

const router = new Router();

router.post('', imageHandler, addCharacter);
router.get('', getCharacters);
router.get('/:id', getCharacter);
router.put('/:id', imageHandler, editCharacter);
router.delete('/:id', deleteCharacter);

module.exports = router;
