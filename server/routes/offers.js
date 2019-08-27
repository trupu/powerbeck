const express = require('express');
const offersController = require('../controllers/offersController');
const errors = require('../middlewares/errors');

const offers = express.Router();

// GET

offers.get('/', errors.catchAsync(offersController.findAll));

// POST

offers.post('/', errors.catchAsync(offersController.create));

// UPDATE

offers.put('/:id', errors.catchAsync(offersController.update));

// DELETE

offers.delete('/:id', errors.catchAsync(offersController.remove));

module.exports = offers;