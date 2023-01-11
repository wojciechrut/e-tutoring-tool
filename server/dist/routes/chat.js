"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const chat_1 = __importDefault(require("../controllers/chat"));
const chat_2 = __importDefault(require("../middlewares/validators/chat"));
const chatRoutes = express_1.default.Router();
chatRoutes.route("/").get(auth_1.default, chat_2.default.get, chat_1.default.get);
chatRoutes.route("/mine").get(auth_1.default, chat_1.default.mine);
exports.default = chatRoutes;
