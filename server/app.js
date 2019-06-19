const express = require('express');
const path = require('path');
const router = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, '../client/src')));

app.get('/', router);

module.exports = app;