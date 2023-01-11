"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_1 = require("../../utils/helpers/create-error");
const _types_1 = require("../../@types");
const user_1 = __importDefault(require("../../repositories/user"));
const register = async (request, _response, next) => {
    const { nickname, email } = request.body;
    const errorMessages = [];
    if (await user_1.default.exists({ nickname }))
        errorMessages.push("This nickname is taken.");
    if (await user_1.default.exists({ email }))
        errorMessages.push("This email is taken");
    if (errorMessages.length > 0) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, errorMessages));
        return;
    }
    next();
};
exports.default = { register };
