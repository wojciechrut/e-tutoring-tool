"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const create_error_1 = require("../utils/helpers/create-error");
const user_1 = __importDefault(require("../repositories/user"));
const jtw_1 = __importDefault(require("./../utils/helpers/jtw"));
const mongo_1 = require("../utils/helpers/mongo");
const auth = async (request, response, next) => {
    const token = jtw_1.default.extractFromHeader(request.header("Authorization"));
    if (!token) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.UNAUTHORIZED, "Authorization failed"));
        return;
    }
    const decodedId = jtw_1.default.decode(token);
    const user = await user_1.default.findOne({ _id: (0, mongo_1._id)(decodedId) }, true);
    if (!user) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.UNAUTHORIZED, "Invalid token."));
        return;
    }
    else {
        response.locals = Object.assign(Object.assign(Object.assign({}, response.locals), user.toObject()), { token });
        next();
    }
};
exports.default = auth;
