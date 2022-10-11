"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invite_1 = __importDefault(require("./../models/invite"));
const create = async (query) => {
    return invite_1.default.create(query);
};
const findOne = async (query) => {
    return invite_1.default.findOne(query);
};
const findAll = async (query) => {
    return invite_1.default.find(query);
};
const exists = async (query) => {
    return invite_1.default.exists(query);
};
const setInactive = async (query) => {
    const { sender, receiver } = query;
    return invite_1.default.updateOne({ sender, receiver }, { active: false });
};
exports.default = { create, findOne, setInactive, exists, findAll };
