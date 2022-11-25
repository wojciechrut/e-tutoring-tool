import { Meeting } from "../../models/meeting";
import { UserResponseBody } from "./user";
import { Whiteboard } from "../../models/whiteboard";

export type MeetingSearchRequestQuery = {
  date?: "ongoing" | "upcoming" | "finished";
};

export type WhiteboardResponse = Whiteboard;

export type SingleMeetingResponseBody = Omit<
  Meeting,
  "organiser" | "invited" | "whiteboard"
> & {
  organiser: UserResponseBody;
  invited: Array<UserResponseBody>;
  whiteboard: WhiteboardResponse;
};

export type MeetingSearchResponseBody = Array<
  Omit<Meeting, "organiser" | "invited"> & {
    organiser: UserResponseBody;
    invited: Array<UserResponseBody>;
  }
>;

export type MeetingCreateRequestBody = {
  description: string;
  startsAt: string;
  invited: Array<string>;
  subjects: string[];
};
