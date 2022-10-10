"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const body_1 = require("../middlewares/validators/body");
const inviteRoutes = express_1.default.Router();
inviteRoutes.route('/').post(auth_1.default, (0, body_1.bodyValidator)(body_1.Action.SEND_INVITE));
exports.default = inviteRoutes;
