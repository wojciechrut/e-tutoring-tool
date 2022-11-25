import { SingleMeetingResponseBody } from "@types";
import { FC, useEffect, useState } from "react";
import { WhiteboardBox } from "components/whiteboard-box";
import MeetingService from "services/meeting";
import { parseError } from "helpers/parse-error";
import styles from "./meeting.module.scss";
import { ChatBox } from "components/chat-box";

type MeetingProps = {
  meetingId: string;
};

export const Meeting: FC<MeetingProps> = ({ meetingId }) => {
  const [meeting, setMeeting] = useState<SingleMeetingResponseBody | null>();
  const [fetchError, setFetchError] = useState<string | null>();
  //todo - fullscreen magic

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
  console.log(chat, 1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <WhiteboardBox whiteboard={whiteboard} className={styles.whiteboard} />
        <ChatBox chat={chat} className={styles.chat} />
      </div>
    </div>
  );
};
