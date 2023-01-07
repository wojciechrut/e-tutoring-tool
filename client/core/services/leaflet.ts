import { AxiosResponse } from "axios";
import {
  LeafletCategoriesResponseBody,
  LeafletEditRequestBody,
  LeafletPostRequestBody,
  LeafletSearchQuery,
  LeafletSearchResponseBody,
  SingleLeafletResponseBody,
} from "@types";
import api from "./api";

enum Paths {
  CATEGORIES = "leaflet/categories",
  SEARCH = "leaflet",
  CREATE = "leaflet",
  DELETE = "leaflet",
  UPDATE = "leaflet",
  DETAILS = "leaflet/details",
}

const getCategories = async () => {
  const { data: categories }: AxiosResponse<LeafletCategoriesResponseBody> =
    await api.get(Paths.CATEGORIES);
  return categories;
};

const search = async (query: LeafletSearchQuery) => {
  const { data }: AxiosResponse<LeafletSearchResponseBody> = await api.get(
    Paths.SEARCH,
    {
      params: {
        ...query,
      },
    }
  );
  return data;
};

const create = async (requestBody: LeafletPostRequestBody) => {
  const { data }: AxiosResponse<string> = await api.post(
    Paths.CREATE,
    requestBody
  );
  return data;
};

const get = async (id: string) => {
  const { data }: AxiosResponse<SingleLeafletResponseBody> = await api.get(
    `${Paths.DETAILS}/${id}`
  );
  return data;
};

const update = async (requestBody: LeafletEditRequestBody) => {
  const { data }: AxiosResponse<SingleLeafletResponseBody> = await api.patch(
    Paths.UPDATE,
    requestBody
  );
  return data;
};

const remove = async (id: string) => {
  const { data }: AxiosResponse = await api.delete(`${Paths.DELETE}`, {
    data: { id },
  });
  return data;
};

const LeafletService = { getCategories, search, create, get, remove, update };

export default LeafletService;
