import { NoteCreateRequestBody, NoteCreateResponseBody } from "@types";
import api from "services/api";
import UserService from "services/user";
import { AxiosResponse } from "axios";
import { createFormData } from "helpers/form-data";

enum Paths {
  CREATE = "note",
}

export const create = async (body: NoteCreateRequestBody) => {
  UserService.setAuthFromStorage();
  const { data }: AxiosResponse<NoteCreateResponseBody> = await api.post(
    Paths.CREATE,
    createFormData(body)
  );
  return data;
};

const NoteService = { create };
export default NoteService;
