import { MeResponseLocals } from "./user";
import { File } from "../../models/file";
import { ModelId } from "../../models/types/_id";
import { User } from "../../models/user";

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
export type DetailedMultipleFiles = Array<
  Omit<File, "uploader"> & { uploader: User }
>;

export type FileDownloadRequestQuery = {
  file: ModelId;
};

export type FileSearchRequestQuery = {
  isFromMeeting: "true" | "false";
  subject?: string;
};

export type FileDownloadResponseLocals = {
  filePath: string;
};
