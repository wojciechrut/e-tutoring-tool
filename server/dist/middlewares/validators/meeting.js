"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../../@types");
const date_1 = require("../../utils/helpers/date");
const create_error_1 = require("../../utils/helpers/create-error");
const create = (request, response, next) => {
    const { startsAt, invited, description } = request.body;
    const { friends } = response.locals;
    const friendsIds = friends.map(({ _id }) => _id.toString());
    if (!(0, date_1.isMeetingDateCorrect)(startsAt)) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Incorrect meeting date"));
        return;
    }
    if (!invited.every((invitedId) => friendsIds.includes(invitedId))) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "You can only create meetings with your friends"));
        return;
    }
    if (!!description && description.length > 250) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, "Description can have maximum 250 characters."));
        return;
    }
    next();
};
exports.default = { create };
