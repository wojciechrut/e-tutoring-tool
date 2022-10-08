"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegexFields = void 0;
const validation_1 = require("../constants/validation");
const validateRegex = ([key, value]) => {
    const validationInfo = validation_1.validatedFields[key];
    if (!validationInfo || validationInfo.pattern.test(value)) {
        return null;
    }
    return [validationInfo.message];
};
const validateRegexFields = (fields) => {
    const errors = Object.entries(fields).reduce((prev, curr) => prev.concat(validateRegex(curr) || []), []);
    return errors.length > 0 ? errors : null;
};
exports.validateRegexFields = validateRegexFields;
