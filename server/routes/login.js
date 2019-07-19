const express = require('express');
const mongodb = require('mongodb');

const mongoUrl = 'mongodb+srv://admin:adminzsp5@powerbeck-rpnty.mongodb.net/test?retryWrites=true&w=majority';


const login = express.Router();

login.post('/', async (req,res) => {
    const data = await loadData();
    res.send( await data.find({}).toArray());
});

async function loadData() {
    const client = await mongodb.MongoClient.connect(
        mongoUrl, {
            useNewUrlParser : true
        });
    return client.db('powerbeck').collection('login_data');
}

module.exports = login;