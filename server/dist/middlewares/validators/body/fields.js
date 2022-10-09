"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFieldRegex = exports.bodyFieldRegex = void 0;
exports.bodyFieldRegex = {
    nickname: {
        pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{5,14}$/,
        message: 'Nickname should have 5-14 alphanumeric characters.',
    },
    password: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%^&*()\d]{8,25}$/,
        message: 'Password too weak.',
    },
    email: {
        pattern: /^\S+@\S+\.\S+$/,
        message: 'Invalid email address.',
    },
};
const validateFieldRegex = ([key, value]) => {
    const validationInfo = exports.bodyFieldRegex[key];
    if (!validationInfo || validationInfo.pattern.test(value)) {
        return null;
    }
    return validationInfo.message;
};
exports.validateFieldRegex = validateFieldRegex;
