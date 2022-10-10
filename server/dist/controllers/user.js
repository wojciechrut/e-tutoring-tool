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
const create_error_1 = require("./../utils/helpers/create-error");
const user_1 = __importDefault(require("./../repositories/user"));
const jtw_1 = __importDefault(require("./../utils/helpers/jtw"));
const mongo_1 = require("../utils/helpers/mongo");
const register = async (request, response, next) => {
    try {
        const user = await user_1.default.create(request.body);
        if (!user) {
            throw (0, create_error_1.createError)(500);
        }
        const _a = user.toObject(), { _id } = _a, userData = __rest(_a, ["_id"]);
        const token = jtw_1.default.generate((0, mongo_1.id)(_id));
        response.send(Object.assign({ token }, userData));
    }
    catch (error) {
        console.log(1, error);
        next(error);
    }
};
const getAll = async (_request, response, next) => {
    try {
        const allUsers = await user_1.default.findAll();
        if (!allUsers)
            throw (0, create_error_1.createError)(500);
        response.send(allUsers);
    }
    catch (error) {
        next(error);
    }
};
const login = async (request, response, next) => {
    try {
        const user = await user_1.default.findByCredentials(request.body);
        if (!user) {
            throw (0, create_error_1.createError)(401, 'Wrong credentials.');
        }
        const _a = user.toObject(), { _id } = _a, userData = __rest(_a, ["_id"]);
        const token = jtw_1.default.generate((0, mongo_1.id)(_id));
        response.send(Object.assign({ token }, userData));
    }
    catch (error) {
        next(error);
    }
};
exports.default = { register, getAll, login };
