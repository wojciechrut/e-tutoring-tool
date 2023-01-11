"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_config_1 = require("./config/common-config");
const whiteboardSchema = new mongoose_1.Schema({
    objects: [{ type: Object, required: true, default: [] }],
}, common_config_1.commonSchemaOptions);
const Model = (0, mongoose_1.model)("Whiteboard", whiteboardSchema);
exports.default = Model;
