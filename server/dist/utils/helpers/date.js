"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMoreThanDayAgo = exports.getMeetingDateTag = exports.isMeetingDateCorrect = void 0;
const isMeetingDateCorrect = (date) => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const errorMargin = 1000 * 60 * 10;
    return parsedDate.getTime() + errorMargin > now.getTime();
};
exports.isMeetingDateCorrect = isMeetingDateCorrect;
const getMeetingDateTag = (date) => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const errorMargin = 1000 * 60;
    if (parsedDate.getTime() > now.getTime()) {
        return "upcoming";
    }
    if (parsedDate.getTime() + errorMargin > yesterday.getTime()) {
        return "ongoing";
    }
    return "finished";
};
exports.getMeetingDateTag = getMeetingDateTag;
const isMoreThanDayAgo = (date) => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    const dayAgo = Date.now() - 1000 * 60 * 60 * 24;
    return parsedDate.getTime() - dayAgo > 1000 * 60 * 60 * 24;
};
exports.isMoreThanDayAgo = isMoreThanDayAgo;
