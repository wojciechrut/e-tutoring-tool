"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const body_1 = require("../middlewares/validators/body");
const leaflet_1 = __importDefault(require("../controllers/leaflet"));
const leaflet_2 = __importDefault(require("../middlewares/validators/leaflet"));
const leafletRoutes = express_1.default.Router();
leafletRoutes
    .route("/")
    .post(auth_1.default, (0, body_1.bodyValidator)(body_1.Action.POST_LEAFLET), leaflet_1.default.post);
leafletRoutes
    .route("/")
    .delete(auth_1.default, leaflet_2.default.leafletAccess, leaflet_1.default.deleteOne);
leafletRoutes
    .route("/")
    .patch(auth_1.default, leaflet_2.default.leafletAccess, (0, body_1.bodyValidator)(body_1.Action.UPDATE_LEAFLET), leaflet_1.default.update);
leafletRoutes.route("/").get(leaflet_1.default.search);
leafletRoutes.route("/details/:id").get(leaflet_1.default.get);
leafletRoutes.route("/categories").get(leaflet_1.default.getCategories);
exports.default = leafletRoutes;
