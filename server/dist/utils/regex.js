"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patterns = void 0;
exports.patterns = {
    nickname: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{5,14}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%^&*()\d]{8,25}$/,
};
