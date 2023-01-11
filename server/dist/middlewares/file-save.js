"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const file_1 = __importDefault(require("../repositories/file"));
const create_error_1 = require("../utils/helpers/create-error");
const saveFiles = async (request, response, next) => {
    const { uploads, _id } = response.locals;
    try {
        const { chat } = request.query;
        if (uploads) {
            const savedFiles = await file_1.default.createMany(uploads.map((upload) => (Object.assign(Object.assign({}, upload), { uploader: _id, chat }))));
            response.locals.uploadedIds = savedFiles.map((file) => file._id);
        }
        next();
    }
    catch (error) {
        next((0, create_error_1.createError)(_types_1.ErrorStatus.SERVER, "Error occurred while saving files."));
    }
};
exports.default = saveFiles;
