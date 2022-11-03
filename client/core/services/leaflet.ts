import { AxiosResponse } from "axios";
import { LeafletCategoriesResponseBody } from "@types";
import api from "./api";

enum Paths {
  CATEGORIES = "leaflet/categories",
}

const getCategories = async () => {
  const { data: categories }: AxiosResponse<LeafletCategoriesResponseBody> =
    await api.get(Paths.CATEGORIES);
  return categories;
};

const LeafletService = { getCategories };

export default LeafletService;
