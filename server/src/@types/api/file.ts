import { MeResponseLocals } from "./user";
import { File } from "../../models/file";
import { ModelId } from "../../models/types/_id";

export type FileUploadResponseLocals = MeResponseLocals & {
  uploads?: Array<{
    path: string;
    type: File["type"];
  }>;
};

export type UploadedIdsResponseLocals = {
  uploadedIds?: Array<ModelId>;
};

export type FileData = File;
