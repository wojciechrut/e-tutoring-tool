import { Note } from "../../models/note";

export type NoteCreateRequestBody = {
  text: string;
  meetingId: string;
  file?: File;
};

export type NoteCreateResponseBody = Omit<Note, "_id"> & { _id: string };

export type NoteSearchRequestQuery = {
  subject?: string;
  page: string;
};

export type NoteSearchResponseBody = {
  notes: Array<Note>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  totalDocs: number;
  totalPages: number;
};
