require('dotenv').config();
require('./src/modules/init-db');

const express = require('express');
const cors = require('cors');
const httpError = require('http-errors');
const morgan = require('morgan');
const router = require('./src/router');
const { errors } = require('./src/middlewares');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(router);
app.use((req, res, next) => next(httpError(404)));
app.use(errors);

module.exports = app;
