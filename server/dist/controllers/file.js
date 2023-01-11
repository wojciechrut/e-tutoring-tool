"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const file_1 = __importDefault(require("../repositories/file"));
const fs_1 = __importDefault(require("fs"));
const create_error_1 = require("../utils/helpers/create-error");
const chat_1 = __importDefault(require("../repositories/chat"));
const meeting_1 = __importDefault(require("../repositories/meeting"));
const getAll = async (_request, response, _next) => {
    const files = await file_1.default.findAll({});
    response.send(files);
};
const download = async (_request, response, next) => {
    const { filePath } = response.locals;
    const fileExists = fs_1.default.existsSync(filePath);
    if (!fileExists) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.NOT_FOUND, "File was deleted."));
        return;
    }
    response.download(filePath);
};
const getMine = async (request, response, _next) => {
    const { isFromMeeting, subject } = request.query;
    const { _id: userId } = response.locals;
    let chatIds = [];
    if (!(isFromMeeting === "true")) {
        chatIds = await chat_1.default.getIdsOfPrivateChats(userId.toString());
    }
    else {
        chatIds = (await meeting_1.default.getChatIdsBySubject(userId.toString(), subject)).map(({ chat }) => chat._id);
    }
    const files = await file_1.default.findAllWithUsers(chatIds);
    response.send(files);
};
const Controller = { getAll, download, getMine };
exports.default = Controller;
