import { Leaflet } from "../../models/leaflet";

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
};
