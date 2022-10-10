"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_config_1 = require("./config/common-config");
const userSchema = new mongoose_1.Schema({
    nickname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
        type: String,
        default: '/static/avatars/default.jpg',
    },
    friends: [{ type: mongoose_1.Types.ObjectId, default: [] }],
}, common_config_1.commonSchemaOptions);
const Model = (0, mongoose_1.model)('User', userSchema);
exports.default = Model;
