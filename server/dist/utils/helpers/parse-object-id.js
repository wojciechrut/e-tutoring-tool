"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseId = void 0;
const parseId = (entity) => {
    return Object.assign(Object.assign({}, entity), { _id: entity._id.toString() });
};
exports.parseId = parseId;
