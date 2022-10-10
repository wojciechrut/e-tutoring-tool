"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../middlewares/validators/user"));
const user_2 = __importDefault(require("../controllers/user"));
const body_1 = require("../middlewares/validators/body");
const actions_1 = require("../middlewares/validators/body/actions");
const auth_1 = __importDefault(require("../middlewares/auth"));
const userRoutes = express_1.default.Router();
userRoutes.route('/').get(user_2.default.getAll);
userRoutes.route('/me').get(auth_1.default, user_2.default.me);
userRoutes
    .route('/')
    .post((0, body_1.bodyValidator)(actions_1.Action.REGISTER_USER), user_1.default.register, user_2.default.register);
userRoutes
    .route('/login')
    .post((0, body_1.bodyValidator)(actions_1.Action.LOGIN_USER), user_2.default.login);
exports.default = userRoutes;
