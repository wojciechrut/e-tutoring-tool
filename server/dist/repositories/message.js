"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSelector = void 0;
const message_1 = __importDefault(require("../models/message"));
var MessageSelector;
(function (MessageSelector) {
    MessageSelector["STANDARD"] = "-createdAt -updatedAt";
})(MessageSelector = exports.MessageSelector || (exports.MessageSelector = {}));
const singleChatPopulator = [
    {
        path: "chat",
        select: "users",
        populate: [{ path: "users", select: "_id nickname" }],
    },
    {
        path: "sender",
        select: "-friends",
    },
    {
        path: "files",
        select: "-uploader",
    },
];
const create = async (query) => {
    const message = await message_1.default.create(query);
    const { _id } = message.toObject();
    return findOne({ _id });
};
const findAll = (query) => {
    return message_1.default.find(query).select(MessageSelector.STANDARD);
};
const findOne = (query) => {
    return message_1.default.findOne(query)
        .select(MessageSelector.STANDARD)
        .populate(singleChatPopulator);
};
exports.default = { create, findAll, findOne };
