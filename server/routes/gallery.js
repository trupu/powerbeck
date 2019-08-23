const express = require('express');
const galleryController = require('../controllers/galleryController');
const errors = require('../middlewares/errors');

// file upload
const upload = require('../config/multer-conf-gallery.js');

const gallery = express.Router();

// GET

gallery.get('/', errors.catchAsync(galleryController.findAll));

// POST

gallery.post('/', upload.single('img'), errors.catchAsync(galleryController.create));

// UPDATE data with image

gallery.put('/:id', upload.single('img'), errors.catchAsync(galleryController.updateAll));

// UPDATE data without img

gallery.patch('/:id', errors.catchAsync(galleryController.updateOne));

// DELETE

gallery.delete('/:id', errors.catchAsync(galleryController.remove));

module.exports = gallery;