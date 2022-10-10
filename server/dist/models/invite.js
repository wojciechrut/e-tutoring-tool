"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_config_1 = require("./config/common-config");
const mongoose_1 = require("mongoose");
const inviteSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Types.ObjectId, required: true },
    receiver: { type: mongoose_1.Types.ObjectId, required: true },
    accepted: { type: Boolean, required: false },
}, common_config_1.commonSchemaOptions);
const Model = (0, mongoose_1.model)('Invite', inviteSchema);
exports.default = Model;
