"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_1 = require("../utils/helpers/create-error");
const mongo_1 = require("../utils/helpers/mongo");
const _types_1 = require("../@types");
const invite_1 = __importDefault(require("../repositories/invite"));
const user_1 = __importDefault(require("../repositories/user"));
const send = async (request, response, next) => {
    const { userId: receiverId } = request.query;
    const { _id: senderId } = response.locals;
    const invite = await invite_1.default.create({
        receiver: response.locals.parsedId || receiverId,
        sender: (0, mongo_1.id)(senderId),
    });
    if (!invite) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER, "Could not send invite."));
        return;
    }
    response.send("Invite sent successfully");
};
const getAll = async (_request, response, next) => {
    const allInvites = await invite_1.default.findAll({});
    if (!allInvites) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    response.send(allInvites);
};
const setAccepted = async (request, response) => {
    const { accept } = request.query;
    const { inviteId } = request.params;
    const { senderId: sender } = request.body;
    const { _id: receiver } = response.locals;
    await invite_1.default.setInactive({
        _id: inviteId,
    });
    if (accept === "true") {
        await user_1.default.makeFriends((0, mongo_1.id)(receiver), sender);
        response.send("Invite accepted.");
    }
    else {
        response.send("Invite declined.");
    }
};
const getInviteStatus = async (request, response, next) => {
    const { _id: requesterId, friends: requesterFriends } = response.locals;
    const { user } = request.query;
    if (!user || user === requesterId) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "You must specify user other than ourself"));
    }
    const isFriend = requesterFriends.some((friend) => {
        return friend._id.toString() === user;
    });
    if (isFriend) {
        response.send({ status: "friend", inviteId: undefined });
        return;
    }
    const isSent = await invite_1.default.exists({
        sender: requesterId,
        receiver: user,
        active: true,
    });
    if (isSent) {
        response.send({ status: "invite sent", inviteId: undefined });
        return;
    }
    const receivedInvite = await invite_1.default.findOne({
        sender: user,
        receiver: requesterId.toString(),
        active: true,
    });
    if (receivedInvite) {
        response.send({
            status: "invited by",
            inviteId: receivedInvite._id.toString(),
        });
        return;
    }
    response.send({ status: "can invite", inviteId: undefined });
};
const getMine = async (_request, response, _next) => {
    const invites = await invite_1.default.findUsersActive(response.locals._id.toString());
    response.send(invites);
};
const getMineReceived = async (_request, response, _next) => {
    const invites = await invite_1.default.findUsersReceived(response.locals._id.toString());
    response.send(invites);
};
exports.default = {
    send,
    getAll,
    setAccepted,
    getInviteStatus,
    getMine,
    getMineReceived,
};
