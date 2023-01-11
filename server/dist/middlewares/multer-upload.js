"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = exports.FileDestination = void 0;
const multer_1 = __importDefault(require("multer"));
const UPLOAD_DIR = __dirname.concat('/../../../static');
const AVATARS_DIR = UPLOAD_DIR.concat('/avatars');
const FILES_DIR = UPLOAD_DIR.concat('/avatars');
var FileDestination;
(function (FileDestination) {
    FileDestination[FileDestination["AVATAR"] = 0] = "AVATAR";
    FileDestination[FileDestination["FILE"] = 1] = "FILE";
})(FileDestination = exports.FileDestination || (exports.FileDestination = {}));
const getPath = (dest) => {
    switch (dest) {
        case FileDestination.AVATAR:
            return AVATARS_DIR;
        case FileDestination.FILE:
            return FILES_DIR;
    }
};
const getStroage = (dest) => multer_1.default.diskStorage({
    destination: (_request, _file, cb) => {
        cb(null, getPath(dest));
    },
    filename: (_request, file, cb) => {
        cb(null, file.originalname + '-' + Date.now().toString());
    },
});
var FileSize;
(function (FileSize) {
    FileSize[FileSize["AVATAR"] = 3000000] = "AVATAR";
    FileSize[FileSize["MESSAGE"] = 5000000] = "MESSAGE";
    FileSize[FileSize["NOTE"] = 5000000] = "NOTE";
})(FileSize || (FileSize = {}));
const multerUpload = ({ dest, maxCount, maxSize }) => (0, multer_1.default)({
    storage: getStroage(dest),
    limits: { fileSize: maxSize },
}).array('files', maxCount);
exports.multerUpload = multerUpload;
