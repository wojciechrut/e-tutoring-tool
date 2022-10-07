"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    nickname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
        type: String,
        default: 'avatars/default.jpg',
    },
}, { timestamps: true, versionKey: false });
const Model = (0, mongoose_1.model)('User', userSchema);
exports.default = Model;
