"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const DEFAULT_MESSAGE = 'Something went wrong.';
const createError = (status, messages) => {
    return {
        status,
        messages: Array.isArray(messages)
            ? messages
            : [messages || DEFAULT_MESSAGE],
    };
};
exports.createError = createError;
