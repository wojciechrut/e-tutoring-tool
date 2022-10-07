"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedFields = void 0;
exports.ValidatedFields = {
    nickname: {
        pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{5,14}$/,
        message: 'Nickname regex msg',
    },
    password: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%^&*()\d]{8,25}$/,
        message: 'Password regex msg',
    },
};
