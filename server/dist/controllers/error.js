"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorWrongEndpoint = exports.errorResponder = exports.errorLogger = void 0;
const WRONG_ENDPOINT_MESSAGE = 'Wrong endpoint';
const UNKNOWN_ERROR = 'Unknown error.';
const errorLogger = (error, _request, _response, next) => {
    console.log(`error ${error.message} \n ${error}`);
    next(error);
};
exports.errorLogger = errorLogger;
const errorResponder = (error, _request, response, _next) => {
    const status = error.status || 400;
    response.status(status).send(error ? error : UNKNOWN_ERROR);
};
exports.errorResponder = errorResponder;
const errorWrongEndpoint = (_request, response, _next) => {
    response.status(404).send(WRONG_ENDPOINT_MESSAGE);
};
exports.errorWrongEndpoint = errorWrongEndpoint;
