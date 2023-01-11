"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_1 = __importDefault(require("../controllers/file"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const file_access_1 = __importDefault(require("../middlewares/file-access"));
const fileRoutes = (0, express_1.default)();
fileRoutes.route("/").get(file_1.default.getAll);
fileRoutes.route("/mine").get(auth_1.default, file_1.default.getMine);
fileRoutes.route("/download").get(auth_1.default, file_access_1.default, file_1.default.download);
exports.default = fileRoutes;
