"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const invite_1 = __importDefault(require("../controllers/invite"));
const invite_2 = __importDefault(require("../middlewares/validators/invite"));
const inviteRoutes = express_1.default.Router();
inviteRoutes.route('/').get(invite_1.default.getAll);
inviteRoutes.route('/').post(auth_1.default, invite_2.default.send, invite_1.default.send);
inviteRoutes
    .route('/:inviteId')
    .post(auth_1.default, invite_2.default.setAccepted, invite_1.default.setAccepted);
exports.default = inviteRoutes;
