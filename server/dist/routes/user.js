"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../middlewares/validators/user"));
const userRoutes = express_1.default.Router();
userRoutes.route('/').post(user_1.default.register);
exports.default = userRoutes;
