"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const create_error_1 = require("../utils/helpers/create-error");
const mongo_1 = require("../utils/helpers/mongo");
const chat_1 = __importDefault(require("../repositories/chat"));
const get = async (request, response, next) => {
    const { userId, chatId } = request.query;
    const { _id: requesterId } = response.locals;
    let chat = undefined;
    if (userId) {
        chat = await chat_1.default.findOrCreate({
            users: [userId, (0, mongo_1.id)(requesterId)],
            isMeetingChat: false,
        });
    }
    if (chatId) {
        chat = await chat_1.default.findOrCreate({
            _id: chatId,
        });
    }
    if (!chat) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER, "Could not access this chat."));
        return;
    }
    response.send(chat);
};
const mine = async (_request, response, _next) => {
    const { _id: requesterId } = response.locals;
    const chats = await chat_1.default.findAll({
        users: requesterId,
        isMeetingChat: false,
    });
    response.send(chats);
};
exports.default = { get, mine };
