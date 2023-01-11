"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const meeting_1 = __importDefault(require("../models/meeting"));
const chat_1 = require("./chat");
const populator = [
    { path: "whiteboard" },
    { path: "invited", select: user_1.UserSelector.STANDARD },
    { path: "organiser", select: user_1.UserSelector.STANDARD },
    { path: "chat", select: chat_1.ChatSelector.STANDARD },
];
const chatPopulator = { path: "chat", select: "_id" };
const findOne = async (_id) => {
    return meeting_1.default.findOne({ _id }).populate(populator).lean();
};
const findAll = async (query) => {
    return meeting_1.default.find(query).populate(populator);
};
const create = async (query) => {
    const meeting = await meeting_1.default.create(query);
    return findOne(meeting._id);
};
const findAllUsers = async (userId) => {
    return meeting_1.default.find({
        $or: [{ organiser: userId }, { invited: userId }],
    })
        .populate(populator)
        .sort({ startsAt: -1 });
};
const getChatIdsBySubject = (userId, subject) => {
    const subjectArray = [subject];
    return meeting_1.default.find({
        subjects: { $in: subject ? subjectArray : /.*/ },
        $or: [{ organiser: userId }, { invited: userId }],
    })
        .populate(chatPopulator)
        .select("chat");
};
const finish = async (meetingId) => {
    return meeting_1.default.updateOne({ _id: meetingId }, { finished: true });
};
const MeetingRepository = {
    findOne,
    findAll,
    create,
    findAllUsers,
    finish,
    getChatIdsBySubject,
};
exports.default = MeetingRepository;
