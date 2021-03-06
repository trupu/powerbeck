const express = require('express');
const mongodb = require('mongodb');
const mongoUrl = require('../config/database');

const login = express.Router();

var client;

login.post('/', async (req,res) => {
    const data = await loadData();
    res.send( await data.find({}).toArray());
    client.close();
});

async function loadData() {
    client = await mongodb.MongoClient.connect(
        mongoUrl, {
            useNewUrlParser : true
        });
    return client.db('powerbeck').collection('login_data');
}

module.exports = login;