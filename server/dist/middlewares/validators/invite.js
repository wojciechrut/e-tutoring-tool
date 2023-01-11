"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../../@types");
const user_1 = __importDefault(require("../../repositories/user"));
const invite_1 = __importDefault(require("../../repositories/invite"));
const create_error_1 = require("../../utils/helpers/create-error");
const mongo_1 = require("../../utils/helpers/mongo");
const send = async (request, response, next) => {
    var _a;
    let { userId: receiverId } = request.query;
    const sender = response.locals;
    const userByNickname = await user_1.default.findOne({ nickname: receiverId });
    if (userByNickname) {
        response.locals.parsedId = userByNickname._id.toString();
        receiverId = userByNickname._id.toString();
    }
    if (!receiverId) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Missing user id parameter."));
        return;
    }
    const userFound = (_a = (await user_1.default.findOne({ _id: receiverId }))) === null || _a === void 0 ? void 0 : _a.toObject();
    if (!userFound) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Couldn't find this user"));
        return;
    }
    if (receiverId.toString() === sender._id.toString()) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Can't invite yourself."));
        return;
    }
    const isInviteSentAlready = await invite_1.default.exists({
        sender: sender._id.toString(),
        receiver: receiverId,
        active: true,
    });
    if (isInviteSentAlready) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "You already invited this user"));
        return;
    }
    const isInviteReceivedAlready = await invite_1.default.exists({
        sender: receiverId,
        receiver: sender._id.toString(),
        active: true,
    });
    if (isInviteReceivedAlready) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "This user already invited you!"));
        return;
    }
    const areFriends = sender.friends.map(({ _id }) => (_id.toString())).includes(receiverId.toString());
    if (areFriends) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "You are already friends."));
        return;
    }
    next();
};
const setAccepted = async (request, response, next) => {
    const { inviteId } = request.params;
    const { accept } = request.query;
    const { _id: userId } = response.locals;
    if (!accept) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Missing accept query parameter."));
        return;
    }
    const invite = await invite_1.default.findOne({
        _id: inviteId,
        receiver: (0, mongo_1.id)(userId),
        active: true,
    });
    if (!invite) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Invite does not exist or you are not receiver of it."));
        return;
    }
    request.body.senderId = (0, mongo_1.id)(invite.sender._id);
    next();
};
exports.default = { send, setAccepted };
