const mongoose = require('mongoose');

const Coach = mongoose.Schema({
    img: String,
    name: String,
    quotation: String,
    description: String,
    about: String,
});

module.exports = mongoose.model('Coach', Coach);