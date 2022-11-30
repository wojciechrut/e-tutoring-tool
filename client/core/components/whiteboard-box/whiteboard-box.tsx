import { WhiteboardResponse } from "@types";
import { FC, useEffect, useState } from "react";
import styles from "./whiteboard-box.module.scss";
import clsx from "clsx";
import { Canvas } from "fabric/fabric-impl";
import { getInitialCanvas } from "helpers/fabric";

type WhiteboardBoxProps = {
  meetingId: string;
  whiteboard: WhiteboardResponse;
  className?: string;
};

export const WhiteboardBox: FC<WhiteboardBoxProps> = ({
  meetingId,
  whiteboard,
  className,
}) => {
  const [canvas, setCanvas] = useState<Canvas>();

  useEffect(() => {
    const canvas = getInitialCanvas();

    setCanvas(canvas);
  }, []);

  return (
    <div className={clsx(styles.container, className)}>
      {/*<div>whiteboard users avatars</div>*/}
      <div className={styles.toolBox}>tools</div>
      <div className={styles.canvasContainer}>
        <canvas id={"canvas"} className={styles.canvas} />
      </div>
      <div className={styles.toolBox}>users and chat</div>
    </div>
  );
};
