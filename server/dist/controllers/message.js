"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const create_error_1 = require("../utils/helpers/create-error");
const message_1 = __importDefault(require("../repositories/message"));
const chat_1 = __importDefault(require("../repositories/chat"));
const mailer_1 = require("../utils/mailer");
const send = async (request, response, next) => {
    var _a;
    const { _id: sender, uploadedIds: files, nickname } = response.locals;
    const { chat } = request.query;
    const { text } = request.body;
    const message = await message_1.default.create({
        sender,
        files,
        chat,
        text,
    });
    if (!message || !chat) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    const userToNotify = (_a = (await chat_1.default.shouldNotifyNewMessage(chat))) === null || _a === void 0 ? void 0 : _a.filter(({ _id }) => _id.toString() !== sender.toString())[0];
    await chat_1.default.addMessage({ chat, message: message._id });
    if (userToNotify) {
        (0, mailer_1.sendNewMessageEmail)(nickname, userToNotify.email, sender.toString());
    }
    response.send(message);
};
exports.default = { send };
