"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generate = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env['JWT_SECRET'], {
        expiresIn: '14d',
    });
};
const decode = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env['JWT_SECRET']);
};
exports.default = { generate, decode };
