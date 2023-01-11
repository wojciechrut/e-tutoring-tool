"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const note_1 = __importDefault(require("../controllers/note"));
const multer_upload_1 = require("../utils/helpers/multer-upload");
const file_upload_1 = __importDefault(require("../middlewares/file-upload"));
const file_save_1 = __importDefault(require("../middlewares/file-save"));
const body_1 = require("../middlewares/validators/body");
const noteRoutes = express_1.default.Router();
noteRoutes
    .route("/")
    .post(auth_1.default, (0, file_upload_1.default)(multer_upload_1.UploadType.NOTE), file_save_1.default, (0, body_1.bodyValidator)(body_1.Action.POST_NOTE), note_1.default.create);
noteRoutes.route("/").get(auth_1.default, note_1.default.getMine);
noteRoutes.route("/").delete(auth_1.default, note_1.default.remove);
exports.default = noteRoutes;
