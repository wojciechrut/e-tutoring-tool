"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (status, errors) => {
    return {
        status,
        errors,
    };
};
exports.createError = createError;
