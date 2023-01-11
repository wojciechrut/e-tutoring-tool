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
const _types_1 = require("../@types");
const create_error_1 = require("../utils/helpers/create-error");
const user_1 = __importDefault(require("./../repositories/user"));
const jtw_1 = __importDefault(require("./../utils/helpers/jtw"));
const register = async (request, response, next) => {
    const { file } = request;
    const avatar = file && `static/avatars/${file.filename}`;
    const user = await user_1.default.create(Object.assign(Object.assign({}, request.body), { avatar }));
    if (!user) {
        next((0, create_error_1.createError)(500));
        return;
    }
    const _a = user.toObject(), { _id } = _a, userData = __rest(_a, ["_id"]);
    const token = jtw_1.default.generate(_id);
    response.send(Object.assign({ token, _id }, userData));
};
const getAll = async (_request, response, next) => {
    const allUsers = await user_1.default.findAll();
    if (!allUsers) {
        next((0, create_error_1.createError)(500));
        return;
    }
    response.send(allUsers);
};
const login = async (request, response, next) => {
    const user = await user_1.default.findByCredentials(request.body);
    if (!user) {
        next((0, create_error_1.createError)(401, "Wrong credentials."));
        return;
    }
    const _a = user.toObject(), { _id, password } = _a, userData = __rest(_a, ["_id", "password"]);
    const token = jtw_1.default.generate(_id);
    response.send(Object.assign({ token, _id }, userData));
};
const me = async (_request, response, next) => {
    if (!response.locals.email) {
        next((0, create_error_1.createError)(500, "Error parsing user data."));
        return;
    }
    response.send(response.locals);
};
const disfriend = async (request, response) => {
    const { id } = request.body;
    const { _id: userId } = response.locals;
    await user_1.default.disfriend(userId.toString(), id);
    response.send("Friend removed");
};
const recommend = async (request, response, next) => {
    const { id, recommend } = request.body;
    const { _id: userId } = response.locals;
    if (userId.toString() === id) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "You cannot recommend yourself."));
        return;
    }
    await user_1.default.recommend(userId.toString(), id, recommend);
    response.send();
};
exports.default = { register, getAll, login, me, disfriend, recommend };
