const multer = require('multer');
const filePublic = require('../config/filePublic');
const path = require('path');
const shortid = require('shortid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePublic.relative);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${shortid.generate()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;