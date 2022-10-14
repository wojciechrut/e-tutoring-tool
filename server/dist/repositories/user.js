"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
const user_1 = __importDefault(require("../models/user"));
const password_1 = require("../utils/helpers/password");
var Selector;
(function (Selector) {
    Selector["STANDARD"] = "-password";
    Selector["WITH_PASSWORD"] = "";
})(Selector = exports.Selector || (exports.Selector = {}));
const exists = async (query) => {
    return user_1.default.exists(query);
};
const findAll = async () => {
    return user_1.default.find();
};
const findOne = async (query, withFriends = false) => {
    const result = await user_1.default.findOne(query).select(Selector.STANDARD);
    return withFriends && result
        ? result.populate('friends', Selector.STANDARD)
        : result;
};
const findByCredentials = async (query) => {
    const { email, password } = query;
    const user = await user_1.default.findOne({ email });
    if (user && (await (0, password_1.comparePassword)(password, user.password))) {
        return user;
    }
    return null;
};
const create = async (query) => {
    const { email, password } = query;
    const hashedPassword = await (0, password_1.hashPassword)(password);
    await user_1.default.create(Object.assign(Object.assign({}, query), { password: hashedPassword }));
    return user_1.default.findOne({ email }).select(Selector.STANDARD);
};
const makeFriends = async (userId1, userId2) => {
    return Promise.all([
        user_1.default.updateOne({ _id: userId1 }, { $push: { friends: userId2 } }),
        user_1.default.updateOne({ _id: userId2 }, { $push: { friends: userId1 } }),
    ]);
};
exports.default = {
    findAll,
    findOne,
    findByCredentials,
    create,
    exists,
    makeFriends,
};
