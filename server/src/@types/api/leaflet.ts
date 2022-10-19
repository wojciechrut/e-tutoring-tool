import { Leaflet } from "../../models/leaflet";

export type LeafletPostRequestBody = Omit<Leaflet, "_id" | "user">;
export type LeafletSearchQuery = Partial<
  Omit<Leaflet, "_id" | "user" | "description"> & {
    user: string;
  }
>;
export type LeafletSearchResponseBody = Array<Leaflet>;
