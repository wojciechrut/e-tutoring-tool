import { DetailedMultipleFiles, FileSearchRequestQuery } from "@types";
import { AxiosResponse } from "axios";
import api from "services/api";

const getFiles = async (query: FileSearchRequestQuery) => {
  const { data }: AxiosResponse<DetailedMultipleFiles> = await api.get(
    "/file/mine",
    {
      params: query,
    }
  );
  return data;
};

const FileService = { getFiles };
export default FileService;
