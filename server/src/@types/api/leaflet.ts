import { Leaflet } from "../../models/leaflet";
import { leafletCategories } from "../../utils/constants/leaflet-categories";

export type LeafletPostRequestBody = Omit<Leaflet, "_id" | "user">;
export type LeafletSearchQuery = Partial<
  Omit<Leaflet, "_id" | "user" | "description"> & {
    user: string;
    page: string;
  }
>;
export type LeafletSearchResponseBody = {
  leaflets: Array<Leaflet>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  totalDocs: number;
  totalPages: number;
};

export type LeafletCategoriesResponseBody = typeof leafletCategories;
