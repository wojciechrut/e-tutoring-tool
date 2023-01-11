"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_config_1 = require("./config/common-config");
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    path: { type: String, required: true },
    type: { type: String, enum: ["image", "document"], required: true },
    uploader: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    originalName: { type: String, required: true },
    chat: { type: mongoose_1.Types.ObjectId, ref: "Chat", required: false },
}, common_config_1.commonSchemaOptions);
const Model = (0, mongoose_1.model)("File", fileSchema);
exports.default = Model;
