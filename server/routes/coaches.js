const express = require('express');
const coachesController = require('../controllers/coachesController');
const errors = require('../middlewares/errors');

const coaches = express.Router();

// GET

coaches.get('/', errors.catchAsync(coachesController.findAll));

// POST

coaches.post('/', errors.catchAsync(coachesController.create));

// UPDATE

coaches.put('/:id', errors.catchAsync(coachesController.update));

// DELETE

coaches.delete('/:id', errors.catchAsync(coachesController.remove));

module.exports = coaches;