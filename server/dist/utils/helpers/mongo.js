"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._id = exports.id = void 0;
const mongoose_1 = require("mongoose");
const id = (_id) => {
    if (typeof _id === "string")
        return _id;
    return _id.toString();
};
exports.id = id;
const _id = (id) => {
    if (id instanceof mongoose_1.Types.ObjectId)
        return id;
    return new mongoose_1.Types.ObjectId(id);
};
exports._id = _id;
