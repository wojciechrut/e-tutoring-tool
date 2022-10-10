"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._id = exports.id = void 0;
const mongoose_1 = require("mongoose");
const id = (_id) => {
    return exports.id.toString();
};
exports.id = id;
const _id = (id) => {
    return new mongoose_1.Types.ObjectId(id);
};
exports._id = _id;
