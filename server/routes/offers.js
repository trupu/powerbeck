const express = require('express');
const mongodb = require('mongodb');

const mongoUrl = 'mongodb+srv://admin:adminzsp5@powerbeck-rpnty.mongodb.net/test?retryWrites=true&w=majority';

const offers = express.Router();

var client;

// GET

offers.get('/', async (req, res) => {
    const data = await loadData();
    res.send( await data.find({}).toArray());
    client.close();
});

// POST



// METHODS

async function loadData() {
    client = await mongodb.MongoClient.connect(
        mongoUrl, {
            useNewUrlParser : true
        });
    return client.db('powerbeck').collection('offers_data');
}

module.exports = offers;