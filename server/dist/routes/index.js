"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const invite_1 = __importDefault(require("./invite"));
const chat_1 = __importDefault(require("./chat"));
const message_1 = __importDefault(require("./message"));
const leaflet_1 = __importDefault(require("./leaflet"));
const file_1 = __importDefault(require("./file"));
const meeting_1 = __importDefault(require("./meeting"));
const whiteboard_1 = __importDefault(require("./whiteboard"));
const note_1 = __importDefault(require("./note"));
const apiRoutes = express_1.default.Router();
apiRoutes.use("/user", user_1.default);
apiRoutes.use("/invite", invite_1.default);
apiRoutes.use("/chat", chat_1.default);
apiRoutes.use("/message", message_1.default);
apiRoutes.use("/leaflet", leaflet_1.default);
apiRoutes.use("/file", file_1.default);
apiRoutes.use("/meeting", meeting_1.default);
apiRoutes.use("/whiteboard", whiteboard_1.default);
apiRoutes.use("/note", note_1.default);
const staticRoutes = express_1.default.Router();
staticRoutes.use(express_1.default.static("static"));
const router = express_1.default.Router();
router.use("/api", apiRoutes);
router.use("/static", staticRoutes);
exports.default = router;
