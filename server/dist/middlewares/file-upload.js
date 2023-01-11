"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const _types_1 = require("../@types");
const create_error_1 = require("../utils/helpers/create-error");
const multer_upload_1 = __importDefault(require("../utils/helpers/multer-upload"));
const multerCodeMessages = {
    LIMIT_UNEXPECTED_FILE: "Too many files.",
};
const extractFileMetadata = (type, file) => {
    const { filename, mimetype, originalname } = file;
    const fileType = mimetype.startsWith("image")
        ? "image"
        : "document";
    const folder = type === "avatar" ? "avatars" : "files";
    return {
        path: `/static/${folder}/${filename}`,
        type: fileType,
        originalName: Buffer.from(originalname, "latin1").toString("utf8"),
    };
};
const extractUploadsMetadata = (type, files) => {
    if (!files) {
        return undefined;
    }
    if (!Array.isArray(files)) {
        const paths = [];
        for (const prop of files) {
            paths.push(...files[prop].map((file) => extractFileMetadata(type, file)));
        }
        return paths;
    }
    return files.map((file) => extractFileMetadata(type, file));
};
const upload = (type) => async (request, response, next) => {
    const upload = (0, multer_upload_1.default)(type);
    upload(request, response, async (error) => {
        if (error) {
            const { code } = error;
            const codeMessage = multerCodeMessages[code];
            next((0, create_error_1.createError)(_types_1.ErrorStatus.BAD_REQUEST, codeMessage || error.message));
            return;
        }
        try {
            const { file, files } = request;
            const uploadArray = file ? [file] : files ? files : undefined;
            const uploads = extractUploadsMetadata(type, uploadArray);
            response.locals = Object.assign(Object.assign({}, response.locals), { uploads });
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.upload = upload;
exports.default = exports.upload;
