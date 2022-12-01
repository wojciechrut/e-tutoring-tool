import { WhiteboardResponse } from "@types";
import { FC } from "react";
import styles from "./whiteboard-box.module.scss";
import clsx from "clsx";
import { WhiteboardTools } from "components/whiteboard-box/whiteboard-tools";
import { fabric } from "fabric";

type WhiteboardBoxProps = {
  meetingId: string;
  whiteboard: WhiteboardResponse;
  className?: string;
};

const mockObjFromDb = [
  new fabric.Rect({
    width: 200,
    height: 120,
    stroke: "black",
  }),
];

export const WhiteboardBox: FC<WhiteboardBoxProps> = ({
  meetingId,
  whiteboard,
  className,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.canvasContainer}>
        <canvas id="fabricCanvas" className={styles.canvas} />
      </div>
      <div className={styles.toolBox}>
        <WhiteboardTools />
      </div>
      <div className={styles.toolBox}>users and chat</div>
    </div>
  );
};
