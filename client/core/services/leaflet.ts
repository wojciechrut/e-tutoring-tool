import { AxiosResponse } from "axios";
import {
  LeafletCategoriesResponseBody,
  LeafletPostRequestBody,
  LeafletSearchQuery,
  LeafletSearchResponseBody,
} from "@types";
import api from "./api";

enum Paths {
  CATEGORIES = "leaflet/categories",
  SEARCH = "leaflet",
  CREATE = "leaflet",
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

const LeafletService = { getCategories, search, create };

export default LeafletService;
