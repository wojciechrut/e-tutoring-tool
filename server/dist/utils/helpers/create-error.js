"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (status, messages) => {
    return {
        status,
        messages,
    };
};
exports.createError = createError;
