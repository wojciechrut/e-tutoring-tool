"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_1 = require("./../utils/helpers/create-error");
const _types_1 = require("../@types");
const user_1 = __importDefault(require("../repositories/user"));
const jtw_1 = __importDefault(require("./../utils/helpers/jtw"));
const mongo_1 = require("../utils/helpers/mongo");
const auth = async (request, _response, next) => {
    try {
        const { token } = request.body;
        const { withFriends } = request.params;
        if (!token) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.UNAUTHORIZED, 'Missing authorization token');
        }
        const decodedId = jtw_1.default.decode(token);
        const user = await user_1.default.findOne({ _id: (0, mongo_1._id)(decodedId) }, withFriends);
        if (!user) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.UNAUTHORIZED, 'Invalid token.');
        }
        request.body = Object.assign(Object.assign({}, user.toObject()), { token });
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
