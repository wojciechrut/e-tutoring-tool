import { AxiosResponse } from "axios";
import {
  LeafletCategoriesResponseBody,
  LeafletSearchQuery,
  LeafletSearchResponseBody,
} from "@types";
import api from "./api";

enum Paths {
  CATEGORIES = "leaflet/categories",
  SEARCH = "leaflet",
}

const getCategories = async () => {
  const { data: categories }: AxiosResponse<LeafletCategoriesResponseBody> =
    await api.get(Paths.CATEGORIES);
  return categories;
};

const search = async (query: LeafletSearchQuery) => {
  const { data: leaflets }: AxiosResponse<LeafletSearchResponseBody> =
    await api.get(Paths.SEARCH, {
      params: {
        ...query,
      },
    });
  return leaflets;
};

const LeafletService = { getCategories, search };

export default LeafletService;
