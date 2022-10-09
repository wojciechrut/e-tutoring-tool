"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
var Selector;
(function (Selector) {
    Selector["STANDARD"] = "-password -_id";
    Selector["WITH_ID"] = "-password";
})(Selector || (Selector = {}));
const exists = async (query) => {
    return user_1.default.exists(query);
};
const findAll = async () => {
    return user_1.default.find();
};
const findOne = async (query) => {
    return user_1.default.findOne(query).select(Selector.STANDARD);
};
const create = async (query) => {
    await user_1.default.create(query);
    return user_1.default.findOne(query).select(Selector.WITH_ID);
};
exports.default = { findAll, findOne, create, exists };
