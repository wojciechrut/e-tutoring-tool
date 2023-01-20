"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const meeting_1 = __importDefault(require("../repositories/meeting"));
const create_error_1 = require("../utils/helpers/create-error");
const chat_1 = __importDefault(require("../repositories/chat"));
const whiteboard_1 = __importDefault(require("../repositories/whiteboard"));
const date_1 = require("../utils/helpers/date");
const user_1 = __importDefault(require("../repositories/user"));
const mailer_1 = require("../utils/mailer");
const getAll = async (_request, response, next) => {
    const meetings = await meeting_1.default.findAll({});
    if (!meetings) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    response.send(meetings);
};
const getMine = async (request, response, next) => {
    const { date } = request.query;
    const { _id } = response.locals;
    const userMeetings = await meeting_1.default.findAllUsers(_id);
    if (!userMeetings) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    const filteredUserMeetings = !!date
        ? userMeetings.filter((meeting) => {
            return ((meeting.finished && date === "finished") ||
                (!meeting.finished && (0, date_1.getMeetingDateTag)(meeting.startsAt) === date));
        })
        : userMeetings;
    response.send(filteredUserMeetings);
};
const create = async (request, response, next) => {
    const { startsAt, invited, description, subjects } = request.body;
    const { _id: organiser, nickname } = response.locals;
    const chat = await chat_1.default.create({
        users: [organiser.toString(), ...invited],
        isMeetingChat: true,
    });
    const whiteboard = await whiteboard_1.default.create();
    if (!chat || !whiteboard) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    const meeting = await meeting_1.default.create({
        startsAt: new Date(startsAt),
        invited,
        description,
        subjects,
        organiser,
        chat: chat._id.toString(),
        whiteboard: whiteboard._id.toString(),
    });
    if (!meeting) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER, "Error occurred while creating meeting"));
        return;
    }
    const invitedUsers = await user_1.default.findManyById(invited);
    if (invitedUsers) {
        (0, mailer_1.sendNewMeetingEmail)(nickname, invitedUsers.map(({ email }) => email));
    }
    response.send(meeting);
};
const get = async (request, response, next) => {
    const { id } = request.params;
    const { _id: userId } = response.locals;
    const meeting = await meeting_1.default.findOne(id).catch(() => {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST));
        return;
    });
    if (!meeting) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Meeting with this id doesn't exist"));
        return;
    }
    const participantsIds = [meeting.organiser, ...meeting.invited].map(({ _id }) => _id.toString());
    if (!participantsIds.includes(userId.toString())) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.FORBIDDEN, "You don't have access to this meeting"));
        return;
    }
    response.send(meeting);
};
const finish = async (request, response, next) => {
    const { id } = request.params;
    const { _id: userId } = response.locals;
    const meeting = await meeting_1.default.findOne(id);
    if (!meeting) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Meeting with this id doesn't exist"));
        return;
    }
    if (!(meeting.organiser._id.toString() === userId.toString())) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Only organiser can finish a meeting."));
        return;
    }
    if (!meeting.finished) {
        await meeting_1.default.finish(id);
    }
    response.send("Meeting finished.");
};
exports.default = { getAll, create, get, getMine, finish };
