"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_config_1 = require("./config/common-config");
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    users: [{ type: mongoose_1.Types.ObjectId, required: true, ref: "User" }],
    messages: [{ type: mongoose_1.Types.ObjectId, default: [], ref: "Message" }],
    lastMessage: { type: mongoose_1.Types.ObjectId, required: false, ref: "Message" },
    isMeetingChat: { type: Boolean, default: false },
}, common_config_1.commonSchemaOptions);
const Model = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = Model;
