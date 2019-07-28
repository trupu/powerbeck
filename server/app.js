const express = require('express');
const path = require('path');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');

// routes

const login = require('./routes/login');
const offers = require('./routes/offers');

// app

const app = express();

// Middleware

app.use(cors());
app.use('/login', login);
app.use('/adminpanel/offers', offers);

// Rest

app.use(express.static(path.join(__dirname, '../client/src')));
app.use(bodyParser.json());

app.get('/', router);

module.exports = app;