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
const note_1 = __importDefault(require("../models/note"));
const user_1 = require("./user");
const populator = [
    {
        path: "owner",
        select: user_1.UserSelector.STANDARD,
    },
    {
        path: "image",
    },
];
const create = (query) => {
    return note_1.default.create(query);
};
const getByMeeting = (userId, meetingId) => {
    return note_1.default.find({ owner: userId, meeting: meetingId }).populate(populator);
};
const findAll = (userId, page = 1, subject) => {
    const subjectArray = [subject];
    return note_1.default.paginate(Object.assign({
        owner: userId,
        subjects: { $in: subject ? subjectArray : /.*/ },
    }), {
        populate: populator,
        lean: true,
        limit: 10,
        sort: { createdAt: -1 },
        page,
    }).then(({ docs, hasNextPage, hasPrevPage, totalDocs, totalPages }) => ({
        notes: docs.map((_a) => {
            var { id } = _a, rest = __rest(_a, ["id"]);
            return rest;
        }),
        hasNextPage,
        hasPrevPage,
        totalDocs,
        totalPages,
        page,
    }));
};
const remove = async (id) => {
    return note_1.default.deleteOne({ _id: id });
};
const NoteRepository = { create, getByMeeting, findAll, remove };
exports.default = NoteRepository;
