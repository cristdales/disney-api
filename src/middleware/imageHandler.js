const multer = require('multer');
const uuid = require('uuid');
const { MAX_FILE_SIZE } = require('../utils/constants');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const mimetypeRegex = /^image\/\w+$/;
  if (file && !mimetypeRegex.test(file.mimetype)) {
    return cb(new Error('invalid image'));
  }
  cb(null, true);
};

const limits = { fileSize: MAX_FILE_SIZE };

const imageHandler = multer({ storage, fileFilter, limits }).single('img');

module.exports = imageHandler;
