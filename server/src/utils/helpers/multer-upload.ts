import multer from 'multer';
import * as getPath from 'path';

const UPLOAD_DIR = __dirname.concat('/../../../static');
const AVATARS_DIR = UPLOAD_DIR.concat('/avatars');
const FILES_DIR = UPLOAD_DIR.concat('/files');

const fileTypes = {
  image: /jpeg|jpg|png/,
  document: /doc|docx|pdf|txt/,
  all: /doc|docx|pdf|txt|jpeg|jpg|png/,
};

export enum UploadType {
  AVATAR = 'avatar',
  MESSAGE = 'message',
  NOTE = 'note',
}

type UploadOptions = {
  fileSize: number;
  maxCount: number;
  fileType: RegExp;
  path: string;
};

const uploadInfo: Record<UploadType, UploadOptions> = {
  avatar: {
    fileSize: 3000000,
    maxCount: 1,
    path: AVATARS_DIR,
    fileType: fileTypes.image,
  },
  message: {
    fileSize: 4000000,
    maxCount: 3,
    path: FILES_DIR,
    fileType: fileTypes.all,
  },
  note: {
    fileSize: 4000000,
    maxCount: 3,
    path: FILES_DIR,
    fileType: fileTypes.image,
  },
};

export enum FileDestination {
  AVATAR,
  FILE,
}

const getStorage = (path: string) =>
  multer.diskStorage({
    destination: (_request, _file, cb) => {
      cb(null, path);
    },
    filename: (_request, file, cb) => {
      cb(null, 'upload-' + Date.now() + getPath.extname(file.originalname));
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
    cb(new Error('Wrong file extension.'));
  }
};

const multerUpload = (type: UploadType) => {
  const { path, fileSize, maxCount, fileType } = uploadInfo[type];
  console.log(path);
  return multer({
    storage: getStorage(path),
    limits: { fileSize },
    fileFilter: (_request, file, cb) => {
      checkFileType(fileType, file, cb);
    },
  }).array('files', maxCount);
};

export default multerUpload;
