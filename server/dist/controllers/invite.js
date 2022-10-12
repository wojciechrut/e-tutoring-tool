"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_1 = require("./../utils/helpers/create-error");
const mongo_1 = require("./../utils/helpers/mongo");
const invite_1 = __importDefault(require("../repositories/invite"));
const _types_1 = require("../@types");
const send = async (request, response, next) => {
    try {
        const { userId: receiverId } = request.query;
        const { _id: senderId } = request.body;
        const invite = await invite_1.default.create({
            receiver: receiverId,
            sender: (0, mongo_1.id)(senderId),
        });
        if (!invite) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.SERVER, 'Could not send invite.');
        }
        response.send('Invite sent successfully');
    }
    catch (error) {
        next(error);
    }
};
const getAll = async (_request, response, next) => {
    try {
        const allInvites = await invite_1.default.findAll({});
        if (!allInvites) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.SERVER);
        }
        response.send(allInvites);
    }
    catch (error) {
        next(error);
    }
};
const setAccepted = async (request, response, next) => {
    try {
        response.send(request.body);
    }
    catch (error) {
        next(error);
    }
};
exports.default = { send, getAll, setAccepted };
