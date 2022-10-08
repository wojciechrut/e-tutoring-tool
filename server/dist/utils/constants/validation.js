"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedFields = void 0;
exports.validatedFields = {
    nickname: {
        pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{5,14}$/,
        message: 'Wrong nickname.',
    },
    password: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%^&*()\d]{8,25}$/,
        message: 'Wrong password.',
    },
    email: {
        pattern: /^\S+@\S+\.\S+$/,
        message: 'Wrong email.',
    },
};
