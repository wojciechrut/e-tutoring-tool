"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_config_1 = require("./config/common-config");
const mongoose_1 = require("mongoose");
const inviteSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Types.ObjectId, required: true, ref: 'User' },
    receiver: { type: mongoose_1.Types.ObjectId, required: true, ref: 'User' },
    active: { type: Boolean, default: true },
}, common_config_1.commonSchemaOptions);
const Model = (0, mongoose_1.model)('Invite', inviteSchema);
exports.default = Model;
