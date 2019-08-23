const express = require('express');
const coachesController = require('../controllers/coachesController');
const errors = require('../middlewares/errors');

// file upload
const upload = require('../config/multer-conf.js');

const coaches = express.Router();

// GET

coaches.get('/', errors.catchAsync(coachesController.findAll));

// POST

coaches.post('/', upload.single('img'), errors.catchAsync(coachesController.create));

// UPDATE data with image

coaches.put('/:id', upload.single('img'), errors.catchAsync(coachesController.updateAll));

// UPDATE data without img

coaches.patch('/:id', errors.catchAsync(coachesController.updateOne));

// DELETE

coaches.delete('/:id', errors.catchAsync(coachesController.remove));

module.exports = coaches;