"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSelector = void 0;
const user_1 = require("./user");
const chat_1 = __importDefault(require("../models/chat"));
const file_1 = require("./file");
const date_1 = require("../utils/helpers/date");
var ChatSelector;
(function (ChatSelector) {
    ChatSelector["STANDARD"] = "-createdAt -updatedAt";
})(ChatSelector = exports.ChatSelector || (exports.ChatSelector = {}));
const populator = [
    { path: "users", select: user_1.UserSelector.STANDARD },
    { path: "lastMessage" },
    {
        path: "messages",
        options: {
            sort: { createdAt: 1 },
            populate: [
                { path: "files", select: file_1.FileSelector.STANDARD },
                { path: "sender", select: "nickname avatar" },
            ],
        },
    },
];
const allPopulator = [
    { path: "users", select: user_1.UserSelector.STANDARD },
    { path: "lastMessage" },
];
const findOrCreate = async (query) => {
    const chatExists = await exists(query);
    if (!chatExists) {
        await create(query);
    }
    return findOne(query);
};
const create = async (query) => {
    const { _id } = await chat_1.default.create(query);
    return chat_1.default.findOne({ _id });
};
const exists = async (_a) => {
    var { users } = _a, rest = __rest(_a, ["users"]);
    if (users) {
        return chat_1.default.exists(Object.assign({ $and: users.map((user) => ({
                users: {
                    $elemMatch: {
                        $eq: user,
                    },
                },
            })) }, rest));
    }
    else {
        return chat_1.default.exists(Object.assign({}, rest));
    }
};
const findOne = async (_a) => {
    var { users } = _a, rest = __rest(_a, ["users"]);
    if (users) {
        return chat_1.default.findOne(Object.assign({ $and: users &&
                users.map((user) => ({
                    users: {
                        $elemMatch: {
                            $eq: user,
                        },
                    },
                })) }, rest))
            .populate(populator)
            .select(ChatSelector.STANDARD);
    }
    else {
        return chat_1.default.findOne(Object.assign({}, rest))
            .populate(populator)
            .select(ChatSelector.STANDARD);
    }
};
const findAll = async (query) => {
    return chat_1.default.find(query)
        .sort({ updatedAt: -1 })
        .select(ChatSelector.STANDARD)
        .populate(allPopulator);
};
const getIdsOfPrivateChats = async (user) => {
    return chat_1.default.find({
        users: { $elemMatch: { $eq: user } },
        isMeetingChat: false,
    }).select("_id");
};
const userHasAccess = async (user, chat) => {
    return chat_1.default.exists({
        users: user,
        _id: chat,
    });
};
const addMessage = async ({ chat, message }) => {
    return chat_1.default.updateOne({ _id: chat }, { lastMessage: message, $push: { messages: message } });
};
const shouldNotifyNewMessage = async (id) => {
    const chat = await chat_1.default.findOne({ _id: id }).populate([
        {
            path: "messages",
            options: {
                sort: { createdAt: -1 },
                limit: 1,
            },
        },
        { path: "users", select: user_1.UserSelector.STANDARD },
    ]);
    if (chat &&
        !chat.isMeetingChat &&
        (!chat.messages[0] || (0, date_1.isMoreThanDayAgo)(chat.messages[0].createdAt))) {
        return chat.users;
    }
    return null;
};
const ChatRepository = {
    findOrCreate,
    create,
    exists,
    findOne,
    findAll,
    userHasAccess,
    addMessage,
    shouldNotifyNewMessage,
    getIdsOfPrivateChats,
};
exports.default = ChatRepository;
