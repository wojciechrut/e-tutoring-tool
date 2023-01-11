"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const leaflet_categories_1 = require("../utils/constants/leaflet-categories");
const common_config_1 = require("./config/common-config");
const noteSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Types.ObjectId, required: true, ref: "User" },
    image: { type: mongoose_1.Types.ObjectId, required: false, ref: "File" },
    text: { type: String, required: true },
    meeting: { type: mongoose_1.Types.ObjectId, required: true, ref: "Meeting" },
    subjects: [
        {
            type: String,
            required: true,
            enum: leaflet_categories_1.leafletCategories.subjects,
        },
    ],
}, common_config_1.commonSchemaOptions);
noteSchema.plugin(mongoose_paginate_v2_1.default);
const Model = (0, mongoose_1.model)("Note", noteSchema);
exports.default = Model;
