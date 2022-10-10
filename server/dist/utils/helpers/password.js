"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = 10;
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(SALT_ROUNDS);
    return bcryptjs_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
exports.comparePassword = bcryptjs_1.default.compare;
