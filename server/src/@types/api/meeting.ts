import { Meeting } from "../../models/meeting";
import { UserResponseBody } from "./user";
import { Whiteboard } from "../../models/whiteboard";

export type MeetingSearchResponseBody = Array<
  Omit<Meeting, "organiser" | "invited"> & {
    organiser: UserResponseBody;
    invited: Array<UserResponseBody>;
  }
>;

export type MeetingSearchRequestQuery = {
  date?: "ongoing" | "upcoming" | "finished";
};

export type SingleMeetingResponseBody = Omit<
  Meeting,
  "organiser" | "invited" | "whiteboard"
> & {
  organiser: UserResponseBody;
  invited: Array<UserResponseBody>;
  whiteboard: Whiteboard;
};

export type MeetingCreateRequestBody = {
  description: string;
  startsAt: string;
  invited: Array<string>;
  subjects: string[];
};
