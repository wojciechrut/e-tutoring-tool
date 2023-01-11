"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_categories_1 = require("../utils/constants/leaflet-categories");
const common_config_1 = require("./config/common-config");
const mongoose_1 = require("mongoose");
const meetingSchema = new mongoose_1.Schema({
    description: { type: String, required: false },
    organiser: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    chat: { type: mongoose_1.Schema.Types.ObjectId, ref: "Chat", required: true },
    whiteboard: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Whiteboard",
        required: true,
    },
    startsAt: { type: Date, required: true },
    finished: { type: Boolean, default: false },
    invited: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }],
    subjects: [
        {
            type: String,
            required: true,
            enum: leaflet_categories_1.leafletCategories.subjects,
        },
    ],
}, common_config_1.commonSchemaOptions);
const Model = (0, mongoose_1.model)("Meeting", meetingSchema);
exports.default = Model;
