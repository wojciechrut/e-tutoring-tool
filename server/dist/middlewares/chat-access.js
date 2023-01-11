"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_1 = require("../utils/helpers/create-error");
const chat_1 = __importDefault(require("../repositories/chat"));
const mongo_1 = require("../utils/helpers/mongo");
const _types_1 = require("../@types");
const chatAccess = async (request, response, next) => {
    const { chat } = request.query;
    const { _id } = response.locals;
    if (!chat) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "You must specify chats."));
        return;
    }
    if (!(await chat_1.default.userHasAccess((0, mongo_1.id)(_id), (0, mongo_1.id)(chat)))) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.FORBIDDEN, "You don't have access to this chats."));
        return;
    }
    next();
};
exports.default = chatAccess;
