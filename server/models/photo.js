const mongoose = require('mongoose');

const Photo = mongoose.Schema({
    img: String,
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Photo', Photo);