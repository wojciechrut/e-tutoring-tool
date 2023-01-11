"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
const fields_1 = require("./fields");
const create_error_1 = require("../../../utils/helpers/create-error");
const actions_1 = require("./actions");
const _types_1 = require("../../../@types");
const validateRequired = (action, body) => {
    const messages = [];
    const { required } = actions_1.actionConstraints[action];
    required.forEach((fieldName) => {
        if (!body[fieldName]) {
            messages.push(`Required body field missing: ${fieldName}`);
        }
    });
    return messages.length > 0 ? messages : null;
};
const validateRegex = (action, body) => {
    const messages = [];
    const { regexValidated } = actions_1.actionConstraints[action];
    regexValidated.forEach((fieldName) => {
        const validationInfo = fields_1.bodyFieldRegex[fieldName];
        if (validationInfo && !validationInfo.pattern.test(body[fieldName])) {
            messages.push(validationInfo.message);
        }
    });
    return messages.length > 0 ? messages : null;
};
const validateEnum = (action, body) => {
    const messages = [];
    const { enumValidated } = actions_1.actionConstraints[action];
    enumValidated.forEach((fieldName) => {
        const validValues = fields_1.bodyFieldEnum[fieldName];
        if (validValues) {
            const value = body[fieldName];
            if (Array.isArray(value)
                ? !value.every((val) => validValues.includes(val))
                : !validValues.includes(value)) {
                messages.push(`Unexpected request body value: ${fieldName}.`);
            }
        }
    });
    return messages.length > 0 ? messages : null;
};
const bodyValidator = (action) => {
    const validator = (request, _response, next) => {
        const { body } = request;
        const requiredErrors = validateRequired(action, body);
        if (requiredErrors) {
            next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, requiredErrors));
            return;
        }
        const regexErrors = validateRegex(action, body);
        if (regexErrors) {
            next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, regexErrors));
            return;
        }
        const enumErrors = validateEnum(action, body);
        if (enumErrors) {
            next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, enumErrors));
            return;
        }
        next();
    };
    return validator;
};
exports.bodyValidator = bodyValidator;
