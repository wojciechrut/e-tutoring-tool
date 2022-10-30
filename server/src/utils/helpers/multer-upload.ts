import multer from "multer";
import * as getPath from "path";

const UPLOAD_DIR = __dirname.concat("/../../../static");
const AVATARS_DIR = UPLOAD_DIR.concat("/avatars");
const FILES_DIR = UPLOAD_DIR.concat("/files");

const fileTypes = {
  image: /jpeg|jpg|png/,
  document: /doc|docx|pdf|txt|xlsx/,
  all: /doc|docx|pdf|txt|xlsx|jpeg|jpg|png/,
};

export enum UploadType {
  AVATAR = "avatar",
  MESSAGE = "message",
  NOTE = "note",
}

type UploadOptions = {
  fileSize: number;
  maxCount: number;
  fileType: RegExp;
  path: string;
  fieldName?: string;
  multipleFiles?: boolean;
};

const uploadInfo: Record<UploadType, UploadOptions> = {
  avatar: {
    fileSize: 4000000,
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
    maxCount: 3,
    path: FILES_DIR,
    fileType: fileTypes.image,
  },
};

const getStorage = (path: string) =>
  multer.diskStorage({
    destination: (_request, _file, cb) => {
      cb(null, path);
    },
    filename: (_request, file, cb) => {
      cb(null, "upload-" + Date.now() + getPath.extname(file.originalname));
    },
  });

const checkFileType = (
  fileType: RegExp,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const properExtension = fileType.test(
    getPath.extname(file.originalname).toLowerCase()
  );
  const properMime = fileType.test(file.mimetype);

  if (properExtension && properMime) {
    return cb(null, true);
  } else {
    cb(new Error("Wrong file extension."));
  }
};

const multerUpload = (type: UploadType) => {
  const { path, fileSize, maxCount, fileType, fieldName, multipleFiles } =
    uploadInfo[type];
  const multerInstance = multer({
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

export default multerUpload;
