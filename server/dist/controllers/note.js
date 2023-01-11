"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const create_error_1 = require("../utils/helpers/create-error");
const note_1 = __importDefault(require("../repositories/note"));
const meeting_1 = __importDefault(require("../repositories/meeting"));
const getMine = async (request, response, next) => {
    const { page, subject } = request.query;
    const { _id: owner } = response.locals;
    const notes = await note_1.default.findAll(owner.toString(), parseInt(page, 10), subject);
    if (!notes) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER));
        return;
    }
    response.send(notes);
};
const create = async (request, response, next) => {
    const { _id: owner, uploadedIds: files } = response.locals;
    const { text, meetingId } = request.body;
    const meeting = await meeting_1.default.findOne(meetingId);
    if (!text || !meeting) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Make sure to specify meeting id and note text."));
        return;
    }
    const note = await note_1.default.create({
        owner,
        image: files && files[0],
        text,
        meeting: meetingId,
        subjects: meeting.subjects,
    });
    if (!note) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER, "Error occurred while creating note."));
        return;
    }
    response.send(note);
};
const remove = async (request, response, _next) => {
    const { id } = request.body;
    await note_1.default.remove(id);
    response.send("Note deleted");
};
const NoteController = { getMine, create, remove };
exports.default = NoteController;
