import { SingleMeetingResponseBody } from "@types";
import { FC, useEffect, useState } from "react";
import { WhiteboardBox } from "components/whiteboard-box";
import MeetingService from "services/meeting";
import { parseError } from "helpers/parse-error";
import styles from "./meeting.module.scss";

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

  const { _id, whiteboard, chat } = meeting;

  return (
    <div className={styles.wrapper}>
      <div className={styles.orientationMessage}>
        Please change device orientation. Whiteboard feature is only available
        for landscape mode
      </div>
      <div className={styles.container}>
        <WhiteboardBox whiteboard={whiteboard} meetingId={_id} />
      </div>
    </div>
  );
};
