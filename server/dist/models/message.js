"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_config_1 = require("./config/common-config");
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Types.ObjectId, required: true, ref: "User" },
    chat: { type: mongoose_1.Types.ObjectId, required: true, ref: "Chat" },
    text: { type: String, default: "" },
    files: [{ type: mongoose_1.Types.ObjectId, default: [], ref: "File" }],
}, common_config_1.commonSchemaOptions);
const Model = (0, mongoose_1.model)("Message", messageSchema);
exports.default = Model;
