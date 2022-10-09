"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
var Selector;
(function (Selector) {
    Selector["STANDARD"] = "-password -_id";
})(Selector || (Selector = {}));
const findOne = async (query) => {
    return user_1.default.findOne(query).select(Selector.STANDARD);
};
const create = async (query) => {
    user_1.default.create(query);
};
exports.default = { findOne, create };
