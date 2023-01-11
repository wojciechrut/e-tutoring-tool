"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const invite_1 = __importDefault(require("./../models/invite"));
const create = async (query) => {
    return invite_1.default.create(query);
};
const findOne = async (query) => {
    return invite_1.default.findOne(query);
};
const findAll = async (query) => {
    return invite_1.default.find(query)
        .populate("sender", user_1.UserSelector.STANDARD)
        .populate("receiver", user_1.UserSelector.STANDARD);
};
const findUsersActive = async (userId) => {
    return invite_1.default.find({ receiver: userId, active: true }).populate("sender", user_1.UserSelector.STANDARD);
};
const findUsersReceived = async (userId) => {
    return invite_1.default.find({ receiver: userId, active: true })
        .populate("receiver", user_1.UserSelector.STANDARD)
        .populate("sender", user_1.UserSelector.STANDARD);
};
const exists = async (query) => {
    return invite_1.default.exists(query);
};
const setInactive = async (query) => {
    const { _id } = query;
    return invite_1.default.updateOne({ _id }, { $set: { active: false } });
};
const InviteRepository = {
    create,
    findOne,
    setInactive,
    exists,
    findAll,
    findUsersActive,
    findUsersReceived,
};
exports.default = InviteRepository;
