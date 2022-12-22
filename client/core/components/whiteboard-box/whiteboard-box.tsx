import { SingleMeetingResponseBody, WhiteboardResponse } from "@types";
import { FC } from "react";
import styles from "./whiteboard-box.module.scss";
import clsx from "clsx";
import { WhiteboardTools } from "components/whiteboard-box/whiteboard-tools";
import { MeetingTools } from "components/meeting-tools";
import { isMeetingFinished } from "helpers/meetings";

type WhiteboardBoxProps = {
  meeting: SingleMeetingResponseBody;
  whiteboard: WhiteboardResponse;
  className?: string;
  finishMeeting: () => void;
};

export const WhiteboardBox: FC<WhiteboardBoxProps> = ({
  meeting,
  whiteboard,
  className,
  finishMeeting,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={clsx(styles.toolBox)}>
        <WhiteboardTools
          whiteboard={whiteboard}
          disabled={isMeetingFinished(meeting)}
        />
      </div>
      <div className={styles.canvasContainer}>
        <div>
          <canvas id="fabricCanvas" className={styles.canvas} />
        </div>
      </div>
      <div className={styles.toolBox}>
        <MeetingTools meeting={meeting} finishMeeting={finishMeeting} />
      </div>
    </div>
  );
};
