"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../../@types");
const leaflet_1 = __importDefault(require("../../repositories/leaflet"));
const create_error_1 = require("../../utils/helpers/create-error");
const leafletAccess = async (request, response, next) => {
    const { id } = request.body;
    const { _id: userId } = response.locals;
    if (!id) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "You must provide leaflet id."));
        return;
    }
    const leaflet = await leaflet_1.default.findOne(id);
    if (!leaflet) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.NOT_FOUND, "Leaflet with this id does not exist."));
        return;
    }
    if (!(leaflet.user._id.toString() === userId.toString())) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.FORBIDDEN, "This leaflet is not yours."));
        return;
    }
    next();
};
const LeafletValidator = { leafletAccess };
exports.default = LeafletValidator;
