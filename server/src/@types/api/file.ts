import { MeResponseLocals } from "./user";
import { File } from "../../models/file";
import { ModelId } from "../../models/types/_id";

export type FileData = File;

export type FileUploadResponseLocals = MeResponseLocals & {
  uploads?: Array<{
    path: string;
    type: File["type"];
    originalName: string;
    chat?: ModelId;
  }>;
};

export type UploadedIdsResponseLocals = {
  uploadedIds?: Array<ModelId>;
};

export type MultipleFilesResponseBody = Array<File>;

export type FileDownloadRequestQuery = {
  file: ModelId;
};

export type FileDownloadResponseLocals = {
  filePath: string;
};
