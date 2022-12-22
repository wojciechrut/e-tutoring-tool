import { SingleMeetingResponseBody } from "@types";
import { FC, useEffect, useState } from "react";
import { WhiteboardBox } from "components/whiteboard-box";
import MeetingService from "services/meeting";
import { parseError } from "helpers/parse-error";
import styles from "./meeting.module.scss";
import { MeetingControls } from "components/meeting-controls";
import { isMeetingFinished } from "helpers/meetings";
import { useMeetingStatusRefresh } from "hooks/useMeetingStatus";

type MeetingProps = {
  meetingId: string;
};

export const Meeting: FC<MeetingProps> = ({ meetingId }) => {
  const [meeting, setMeeting] = useState<SingleMeetingResponseBody | null>();
  const [fetchError, setFetchError] = useState<string | null>();
  const [finished, setFinished] = useState<boolean>(false);
  const { finishMeeting } = useMeetingStatusRefresh(meetingId);

  useEffect(() => {
    MeetingService.access(meetingId)
      .then((meeting) => {
        setMeeting(meeting);
        setFinished(isMeetingFinished(meeting));
      })
      .catch((error) => setFetchError(parseError(error)?.messages[0]));
  }, [meetingId]);

  if (fetchError) {
    return <>{"Meeting not found."}</>;
  }

  if (!meeting) {
    return <>Loading...</>;
  }

  const { whiteboard } = meeting;

  return (
    <div className={styles.wrapper}>
      <div className={styles.orientationMessage}>
        Please change device orientation. Whiteboard feature is only available
        for landscape mode
      </div>
      {finished ? (
        <div className={styles.finishedInfo}>this meeting is finished</div>
      ) : (
        <MeetingControls meeting={meeting} className={styles.meetingControls} />
      )}
      <div className={styles.container}>
        <WhiteboardBox
          whiteboard={whiteboard}
          meeting={meeting}
          finishMeeting={finishMeeting}
        />
      </div>
    </div>
  );
};
