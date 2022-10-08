"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_1 = require("./../../utils/helpers/create-error");
const validate_regex_1 = require("../../utils/helpers/validate-regex");
const validate = (request, _response, next) => {
    const regexErrors = (0, validate_regex_1.validateRegexFields)(request.body);
    console.log(regexErrors);
    if (regexErrors)
        throw (0, create_error_1.createError)(400, regexErrors);
    next();
};
exports.default = { validate };
