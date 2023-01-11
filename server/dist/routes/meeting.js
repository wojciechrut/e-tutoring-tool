"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meeting_1 = __importDefault(require("../controllers/meeting"));
const meeting_2 = __importDefault(require("../middlewares/validators/meeting"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const body_1 = require("../middlewares/validators/body");
const meetingRoutes = express_1.default.Router();
meetingRoutes.route("/").get(auth_1.default, meeting_1.default.getAll);
meetingRoutes.route("/mine").get(auth_1.default, meeting_1.default.getMine);
meetingRoutes.route("/access/:id").get(auth_1.default, meeting_1.default.get);
meetingRoutes
    .route("/")
    .post(auth_1.default, (0, body_1.bodyValidator)(body_1.Action.POST_MEETING), meeting_2.default.create, meeting_1.default.create);
meetingRoutes.route("/:id").patch(auth_1.default, meeting_1.default.finish);
exports.default = meetingRoutes;
