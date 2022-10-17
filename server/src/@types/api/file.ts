import { MeResponseLocals } from "./user";
import { File } from "../../models/file";

export type FileUploadResponseLocals = MeResponseLocals & {
  uploads?: Array<{
    path: string;
    type: File["type"];
  }>;
};
