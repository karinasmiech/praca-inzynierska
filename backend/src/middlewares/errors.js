const mongoose = require('mongoose');
const httpError = require('http-errors');
const AuthError = require('../modules/auth-module/auth-error');

module.exports = (error, req, res, next) => {
    error = error || {};

    let status = error.status || 500;
    let response;
    let headers;

    if (
        error instanceof mongoose.Error.CastError ||
        error instanceof mongoose.Error.ValidationError
    ) {
        status = 400;
        response = error;
    } else if (error instanceof AuthError) {
        response = error.response;
        headers = error.headers;
    } else if (error instanceof httpError.HttpError) {
        response = error;
    }

    if (!response) {
        response = httpError(status);
    }

    if (headers) {
        res.set(headers);
    }

    if (status >= 500) {
        console.error(error);
    }

    return res.status(status).send(response);
};
