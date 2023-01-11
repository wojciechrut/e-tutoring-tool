"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSelector = void 0;
const file_1 = __importDefault(require("../models/file"));
const user_1 = require("./user");
var FileSelector;
(function (FileSelector) {
    FileSelector["STANDARD"] = "_id path uploader type originalName";
})(FileSelector = exports.FileSelector || (exports.FileSelector = {}));
const create = async (query) => {
    return file_1.default.create(query);
};
const findAll = async (query) => {
    return file_1.default.find(query);
};
const findAllWithUsers = async (chats) => {
    return file_1.default.find({ chat: { $in: chats } }).populate({
        path: "uploader",
        select: user_1.UserSelector.STANDARD,
    });
};
const findOne = async (query) => {
    return file_1.default.findOne(query);
};
const createMany = async (query) => {
    return file_1.default.insertMany(query);
};
const FileRepository = {
    create,
    createMany,
    findAll,
    findOne,
    findAllWithUsers,
};
exports.default = FileRepository;
