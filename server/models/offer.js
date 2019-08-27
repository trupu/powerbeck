const mongoose = require('mongoose');

const Offer = mongoose.Schema({
    logo: String,
    name: String,
    description: String,
    price: Number,
});

module.exports = mongoose.model('Offer', Offer);