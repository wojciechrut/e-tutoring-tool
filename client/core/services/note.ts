import {
  NoteCreateRequestBody,
  NoteCreateResponseBody,
  NoteSearchRequestQuery,
  NoteSearchResponseBody,
} from "@types";
import api from "services/api";
import UserService from "services/user";
import { AxiosResponse } from "axios";
import { createFormData } from "helpers/form-data";

enum Paths {
  CREATE = "note",
  MINE = "note",
}

export const create = async (body: NoteCreateRequestBody) => {
  UserService.setAuthFromStorage();
  const { data }: AxiosResponse<NoteCreateResponseBody> = await api.post(
    Paths.CREATE,
    createFormData(body)
  );
  return data;
};

export const getMine = async (query: NoteSearchRequestQuery) => {
  UserService.setAuthFromStorage();
  const { data }: AxiosResponse<NoteSearchResponseBody> = await api.get(
    Paths.MINE,
    {
      params: query,
    }
  );
  return data;
};

export const remove = async (id: string) => {
  UserService.setAuthFromStorage();
  const { data }: AxiosResponse<string> = await api.delete(Paths.MINE, {
    data: { id },
  });
  return data;
};

const NoteService = { create, getMine, remove };
export default NoteService;
