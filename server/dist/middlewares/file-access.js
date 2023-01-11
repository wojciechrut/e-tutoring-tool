"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const file_1 = __importDefault(require("../repositories/file"));
const create_error_1 = require("../utils/helpers/create-error");
const chat_1 = __importDefault(require("../repositories/chat"));
const fileAccess = async (request, response, next) => {
    const { file } = request.query;
    const { _id: userId } = response.locals;
    const fileData = await file_1.default.findOne({ _id: file });
    if (!fileData) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "File doesn't exists."));
        return;
    }
    const { uploader, chat, path } = fileData;
    const isUploader = uploader.toString() === userId.toString();
    const hasChatAccess = chat &&
        (await chat_1.default.userHasAccess(userId.toString(), chat.toString()));
    if (!(isUploader || hasChatAccess)) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.FORBIDDEN, "You don't have access to this file"));
        return;
    }
    response.locals = Object.assign(Object.assign({}, response.locals), { filePath: path });
    next();
};
exports.default = fileAccess;
