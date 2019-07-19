const express = require('express');
const mongodb = require('mongodb');

const url = 'mongodb+srv://admin:<adminzsp5>@powerbeck-rpnty.mongodb.net/test?retryWrites=true&w=majority';


const login = express.Router();

login.get('/', (req,res) => {

});

module.exports = login;