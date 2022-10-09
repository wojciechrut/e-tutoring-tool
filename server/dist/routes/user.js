"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../middlewares/validators/user"));
const body_1 = require("../middlewares/validators/body");
const actions_1 = require("../middlewares/validators/body/actions");
const userRoutes = express_1.default.Router();
userRoutes
    .route('/')
    .post((0, body_1.bodyValidator)(actions_1.Action.REGISTER_USER), user_1.default.register);
exports.default = userRoutes;
