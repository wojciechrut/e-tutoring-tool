import { SingleMeetingResponseBody } from "@types";

const errorMargin = 1000 * 60; //1min

export const isMeetingFinished = (meeting: SingleMeetingResponseBody) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    meeting.finished ||
    new Date(meeting.startsAt).getTime() < yesterday.getTime() + errorMargin
  );
};

export const isMeetingOngoing = (meeting: SingleMeetingResponseBody) => {
  return (
    !isMeetingFinished(meeting) &&
    new Date(meeting.startsAt).getTime() - errorMargin < new Date().getTime()
  );
};
