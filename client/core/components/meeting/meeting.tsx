import { SingleMeetingResponseBody } from "@types";
import { FC, useEffect, useState } from "react";
import { WhiteboardBox } from "components/whiteboard-box";
import MeetingService from "services/meeting";
import { parseError } from "helpers/parse-error";

type MeetingProps = {
  meetingId: string;
};

export const Meeting: FC<MeetingProps> = ({ meetingId }) => {
  const [meeting, setMeeting] = useState<SingleMeetingResponseBody | null>();
  const [fetchError, setFetchError] = useState<string | null>();

  useEffect(() => {
    MeetingService.access(meetingId)
      .then((meeting) => setMeeting(meeting))
      .catch((error) => setFetchError(parseError(error)?.messages[0]));
  }, [meetingId]);

  if (fetchError) {
    return <>{"Couldn't fetch meeting - todo"}</>;
  }

  if (!meeting) {
    return <>Loading...</>;
  }

  const { _id, whiteboard } = meeting;

  return (
    <>
      meeting id: {_id}
      <WhiteboardBox whiteboard={whiteboard}></WhiteboardBox>
    </>
  );
};
