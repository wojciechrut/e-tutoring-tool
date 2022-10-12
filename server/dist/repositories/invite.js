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
        .populate('sender', user_1.Selector.STANDARD)
        .populate('receiver', user_1.Selector.STANDARD);
};
const exists = async (query) => {
    return invite_1.default.exists(query);
};
const setInactive = async (query) => {
    const { sender, receiver } = query;
    return invite_1.default.updateOne({ sender, receiver }, { active: false });
};
exports.default = { create, findOne, setInactive, exists, findAll };
