import { ErrorStatus } from "../@types";
import { createError } from "../utils/helpers/create-error";
import { RequestHandler } from "express";
import multerUpload, { UploadType } from "../utils/helpers/multer-upload";
import { FileUploadResponseLocals } from "../@types/api/file";
import { File } from "../models/file";

const multerCodeMessages: Record<string, string> = {
  LIMIT_UNEXPECTED_FILE: "Unexpected file.",
};

const extractFileMetadata = (type: UploadType, file: Express.Multer.File) => {
  const { filename, mimetype } = file;
  const fileType: File["type"] = mimetype.startsWith("image")
    ? "image"
    : "document";
  const folder = type === "avatar" ? "avatars" : "files";
  return { path: `static/${folder}/${filename}`, type: fileType };
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
  ): RequestHandler<{}, {}, any, {}, FileUploadResponseLocals> =>
  async (request, response, next) => {
    const upload = multerUpload(type);

    upload(request, response, (error) => {
      try {
        if (error) {
          const { code } = error;

          const codeMessage = multerCodeMessages[code];
          next(
            createError(ErrorStatus.BAD_REQUEST, codeMessage || error.message)
          );
          return;
        }
        const { file, files } = request;
        const uploadArray = file ? [file] : files ? files : undefined;
        const uploads = extractUploadsMetadata(type, uploadArray);
        response.locals = { ...response.locals, uploads };
        console.log(response.locals);
        next();
      } catch (err) {
        next(err);
      }
    });
  };

export default upload;
