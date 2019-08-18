const multer = require('multer');
const filePublic = require('../config/filePublic');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePublic.relative);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;