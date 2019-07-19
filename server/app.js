const express = require('express');
const path = require('path');
const router = require('./routes/index');
const bodyParser = require('body-parser');

// routes

const login = require('./routes/login');

// app

const app = express();

// Middleware

app.use('/login', login);

app.use(express.static(path.join(__dirname, '../client/src')));
app.use(bodyParser.json());


app.get('/', router);

module.exports = app;