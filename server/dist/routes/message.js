"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_upload_1 = __importDefault(require("./../middlewares/file-upload"));
const multer_upload_1 = require("../utils/helpers/multer-upload");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const chat_access_1 = __importDefault(require("../middlewares/chat-access"));
const file_save_1 = __importDefault(require("../middlewares/file-save"));
const message_1 = __importDefault(require("../middlewares/validators/message"));
const message_2 = __importDefault(require("../controllers/message"));
const messageRoutes = express_1.default.Router();
messageRoutes
    .route("/")
    .post((0, file_upload_1.default)(multer_upload_1.UploadType.MESSAGE), auth_1.default, chat_access_1.default, message_1.default.send, file_save_1.default, message_2.default.send);
exports.default = messageRoutes;
