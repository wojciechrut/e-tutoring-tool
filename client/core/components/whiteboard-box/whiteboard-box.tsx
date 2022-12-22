import { SingleMeetingResponseBody, WhiteboardResponse } from "@types";
import { FC } from "react";
import styles from "./whiteboard-box.module.scss";
import clsx from "clsx";
import { WhiteboardTools } from "components/whiteboard-box/whiteboard-tools";
import { MeetingTools } from "components/meeting-tools";

type WhiteboardBoxProps = {
  meeting: SingleMeetingResponseBody;
  whiteboard: WhiteboardResponse;
  className?: string;
};

export const WhiteboardBox: FC<WhiteboardBoxProps> = ({
  meeting,
  whiteboard,
  className,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.toolBox}>
        <WhiteboardTools whiteboard={whiteboard} />
      </div>
      <div className={styles.canvasContainer}>
        <div>
          <canvas id="fabricCanvas" className={styles.canvas} />
        </div>
      </div>
      <div className={styles.toolBox}>
        <MeetingTools meeting={meeting} />
      </div>
    </div>
  );
};
