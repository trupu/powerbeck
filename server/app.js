const express = require('express');
const path = require('path');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const errors = require('./middlewares/errors');

// database
const dbConfig = require('./config/database');
const mongoose = require('mongoose');

// routes

const login = require('./routes/login');
const offers = require('./routes/offers');

mongoose.connect(dbConfig, {
    useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// app

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, '../client/src')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware

app.use(cors());
app.use('/login', login);
app.use('/adminpanel/offers', offers);

// error handlers

app.use(errors.notFound);
app.use(errors.catchErrors);

app.get('/', router);

module.exports = app;