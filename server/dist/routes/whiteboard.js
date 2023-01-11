"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const whiteboard_1 = __importDefault(require("../controllers/whiteboard"));
const whiteboardRoutes = express_1.default.Router();
whiteboardRoutes.route("/:id").put(auth_1.default, whiteboard_1.default.addObject);
whiteboardRoutes.route("/:id").patch(auth_1.default, whiteboard_1.default.modifyObject);
whiteboardRoutes
    .route("/removeObjects/:id/")
    .patch(auth_1.default, whiteboard_1.default.removeObjects);
exports.default = whiteboardRoutes;
