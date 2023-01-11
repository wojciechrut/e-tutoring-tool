"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../../@types");
const create_error_1 = require("../../utils/helpers/create-error");
const send = (request, response, next) => {
    const { text } = request.body;
    const { uploads } = response.locals;
    if (!text && (!uploads || uploads.length < 1)) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Cannot send an empty message."));
        return;
    }
    next();
};
exports.default = { send };
