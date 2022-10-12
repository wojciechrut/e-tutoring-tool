"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../repositories/user"));
const invite_1 = __importDefault(require("../../repositories/invite"));
const create_error_1 = require("../../utils/helpers/create-error");
const _types_1 = require("../../@types");
const mongo_1 = require("../../utils/helpers/mongo");
const send = async (request, _response, next) => {
    var _a;
    try {
        const { userId: receiverId } = request.query;
        const sender = request.body;
        if (!receiverId) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, 'Missing user id parameter.');
        }
        const receiver = (_a = (await user_1.default.findOne({ _id: (0, mongo_1._id)(receiverId) }))) === null || _a === void 0 ? void 0 : _a.toObject();
        if (!receiver) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Couldn't find user with this id.");
        }
        if (receiver._id === sender._id) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Can't invite yourself.");
        }
        const isInviteSentAlready = await invite_1.default.exists({
            sender: (0, mongo_1.id)(sender._id),
            receiver: receiverId,
        });
        if (isInviteSentAlready) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, 'You already invited this user');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
const setAccepted = async (request, _response, next) => {
    try {
        const { inviteId } = request.params;
        const { accept } = request.query;
        const { _id: userId } = request.body;
        if (!accept) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, 'Missing accept query parameter.');
        }
        const invite = await invite_1.default.findOne({
            _id: inviteId,
            receiver: (0, mongo_1.id)(userId),
        });
        if (!invite) {
            throw (0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, 'Invite does not exist or you are not receiver of it.');
        }
        request.body.senderId = (0, mongo_1.id)(invite.sender._id);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = { send, setAccepted };
