"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorWrongEndpoint = exports.errorResponder = exports.errorLogger = exports.errorClearFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const WRONG_ENDPOINT_MESSAGE = "Wrong endpoint";
const UNKNOWN_ERROR = "Unknown error.";
const errorClearFiles = async (error, request, _response, next) => {
    const { files } = request;
    if (files && Array.isArray(files)) {
        for (const file of files) {
            fs_1.default.unlink(file.path, console.log);
        }
    }
    next(error);
};
exports.errorClearFiles = errorClearFiles;
const errorLogger = (error, request, _response, next) => {
    console.log(`====ERROR====\n MESSAGE: ${error.message || JSON.stringify(error.messages)} \n OBJECT: ${JSON.stringify(error)}\n REQUEST BODY: ${JSON.stringify(request.body)}`, "\n=============");
    next(error);
};
exports.errorLogger = errorLogger;
const errorResponder = (error, _request, response, _next) => {
    const status = error.status || 400;
    response.status(status).send(error ? error : UNKNOWN_ERROR);
};
exports.errorResponder = errorResponder;
const errorWrongEndpoint = (_request, response) => {
    response.status(404).send(WRONG_ENDPOINT_MESSAGE);
};
exports.errorWrongEndpoint = errorWrongEndpoint;
