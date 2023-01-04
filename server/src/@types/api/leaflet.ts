import { Leaflet } from "../../models/leaflet";
import { leafletCategories } from "../../utils/constants/leaflet-categories";
import { UserResponseBody } from "./user";

export type LeafletPostRequestBody = Omit<
  Leaflet,
  "_id" | "user" | "parsedTitle" | "createdAt"
>;
export type LeafletSearchQuery = Partial<
  Omit<Leaflet, "_id" | "user" | "description"> & {
    user: string;
    page: string;
  }
>;

export type LeafletSearchResponseBody = {
  leaflets: Array<Omit<Leaflet, "user"> & { user: UserResponseBody }>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  totalDocs: number;
  totalPages: number;
};

export type LeafletCategoriesResponseBody = typeof leafletCategories;
