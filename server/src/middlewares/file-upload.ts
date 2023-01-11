import { ErrorStatus, FileUploadResponseLocals } from "../@types";
import { createError } from "../utils/helpers/create-error";
import { RequestHandler } from "express";
import multerUpload, { UploadType } from "../utils/helpers/multer-upload";
import { File } from "../models/file";

const multerCodeMessages: Record<string, string> = {
  LIMIT_UNEXPECTED_FILE: "Too many files.",
};

const extractFileMetadata = (type: UploadType, file: Express.Multer.File) => {
  const { filename, mimetype, originalname } = file;
  const fileType: File["type"] = mimetype.startsWith("image")
    ? "image"
    : "document";
  const folder = type === "avatar" ? "avatars" : "files";
  return {
    path: `/static/${folder}/${filename}`,
    type: fileType,
    originalName: Buffer.from(originalname, "latin1").toString("utf8"),
  };
};

const extractUploadsMetadata = (
  type: UploadType,
  files?: Express.Multer.File[] | { [p: string]: Express.Multer.File[] }
) => {
  if (!files) {
    return undefined;
  }
  if (!Array.isArray(files)) {
    const paths = [];
    // @ts-ignore
    for (const prop of files) {
      paths.push(...files[prop].map((file) => extractFileMetadata(type, file)));
    }
    return paths;
  }

  return files.map((file) => extractFileMetadata(type, file));
};

export const upload =
  (
    type: UploadType
  ): RequestHandler<
    any,
    any,
    any,
    { chat?: string },
    FileUploadResponseLocals
  > =>
  async (request, response, next) => {
    const upload = multerUpload(type);
    upload(request, response, async (error) => {
      if (error) {
        const { code } = error;

        const codeMessage = multerCodeMessages[code];
        next(
          createError(ErrorStatus.BAD_REQUEST, codeMessage || error.message)
        );
        return;
      }
      try {
        const { file, files } = request;
        const uploadArray = file ? [file] : files ? files : undefined;
        const uploads = extractUploadsMetadata(type, uploadArray);
        response.locals = { ...response.locals, uploads };
        next();
      } catch (err) {
        next(err);
      }
    });
  };

export default upload;
