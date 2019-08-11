const mongoose = require('mongoose');

const Coach = mongoose.Schema({
    img: String,
    position: String,
    quotation: String,
    description: String,
});

module.exports = mongoose.model('Coach', Coach);