"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_categories_1 = require("../utils/constants/leaflet-categories");
const mongoose_1 = require("mongoose");
const common_config_1 = require("./config/common-config");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const leafletSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    parsedTitle: { type: String, required: true },
    description: { type: String, required: true },
    lookingFor: { type: String, enum: leaflet_categories_1.leafletCategories.lookingFor, required: true },
    levels: [{ type: String, enum: leaflet_categories_1.leafletCategories.levels, required: true }],
    subjects: [{ type: String, enum: leaflet_categories_1.leafletCategories.subjects, required: true }],
}, common_config_1.commonSchemaOptions);
leafletSchema.plugin(mongoose_paginate_v2_1.default);
const Model = (0, mongoose_1.model)("Leaflet", leafletSchema);
exports.default = Model;
