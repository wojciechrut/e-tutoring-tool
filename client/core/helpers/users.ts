import { SingleMeetingResponseBody, UserResponseBody } from "@types";

export const getOtherUsersFromMeeting = (
  userId: string,
  meeting: SingleMeetingResponseBody
) => {
  return [...meeting.invited, meeting.organiser].filter(
    ({ _id }) => _id !== userId
  );
};

export const getUsersIds = (users: Array<UserResponseBody>) => {
  return users.map(({ _id }) => _id.toString());
};
