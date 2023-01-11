"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadType = void 0;
const multer_1 = __importDefault(require("multer"));
const getPath = __importStar(require("path"));
const UPLOAD_DIR = __dirname.concat("/../../../static");
const AVATARS_DIR = UPLOAD_DIR.concat("/avatars");
const FILES_DIR = UPLOAD_DIR.concat("/files");
const fileTypes = {
    image: /jpeg|jpg|png/,
    document: /doc|docx|pdf|txt|xlsx/,
    all: /doc|docx|pdf|txt|xlsx|jpeg|jpg|png/,
};
var UploadType;
(function (UploadType) {
    UploadType["AVATAR"] = "avatar";
    UploadType["MESSAGE"] = "message";
    UploadType["NOTE"] = "note";
})(UploadType = exports.UploadType || (exports.UploadType = {}));
const uploadInfo = {
    avatar: {
        fileSize: 3000000,
        maxCount: 1,
        path: AVATARS_DIR,
        fileType: fileTypes.image,
        fieldName: "avatar",
    },
    message: {
        fileSize: 4000000,
        maxCount: 3,
        path: FILES_DIR,
        fileType: fileTypes.all,
        multipleFiles: true,
    },
    note: {
        fileSize: 4000000,
        maxCount: 1,
        path: FILES_DIR,
        fileType: fileTypes.image,
        multipleFiles: false,
    },
};
const getStorage = (path) => multer_1.default.diskStorage({
    destination: (_request, _file, cb) => {
        cb(null, path);
    },
    filename: (_request, file, cb) => {
        cb(null, "upload-" + Date.now() + getPath.extname(file.originalname));
    },
});
const checkFileType = (fileType, file, cb) => {
    const properExtension = fileType.test(getPath.extname(file.originalname).toLowerCase());
    const properMime = fileType.test(file.mimetype);
    if (properExtension && properMime) {
        return cb(null, true);
    }
    else {
        cb(new Error("Wrong file extension."));
    }
};
const multerUpload = (type) => {
    const { path, fileSize, maxCount, fileType, fieldName, multipleFiles } = uploadInfo[type];
    const multerInstance = (0, multer_1.default)({
        storage: getStorage(path),
        limits: { fileSize },
        fileFilter: (_request, file, cb) => {
            checkFileType(fileType, file, cb);
        },
    });
    return multipleFiles
        ? multerInstance.array(fieldName || "files", maxCount)
        : multerInstance.single(fieldName || "file");
};
exports.default = multerUpload;
