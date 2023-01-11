"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_1 = require("../../utils/helpers/create-error");
const _types_1 = require("../../@types");
const user_1 = __importDefault(require("../../repositories/user"));
const mongo_1 = require("../../utils/helpers/mongo");
const chat_1 = __importDefault(require("../../repositories/chat"));
const get = async (request, _response, next) => {
    const { userId, chatId } = request.query;
    if (!(userId || chatId)) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Missing id of user or meeting."));
        return;
    }
    if (userId && chatId) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Specify id of either user or meeting, not both."));
        return;
    }
    if (chatId) {
        if (!(await chat_1.default.exists({ _id: chatId }))) {
            next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Chat does not exist."));
            return;
        }
    }
    if (userId) {
        if (!(await user_1.default.exists({ _id: (0, mongo_1._id)(userId) }))) {
            next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "User does not exist"));
            return;
        }
    }
    next();
};
exports.default = { get };
