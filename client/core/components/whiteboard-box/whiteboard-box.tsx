import { WhiteboardResponse } from "@types";
import { FC, useRef } from "react";
import styles from "./whiteboard-box.module.scss";
import clsx from "clsx";
import { useWhiteboard } from "hooks/useWhiteboard";

type WhiteboardBoxProps = {
  meetingId: string;
  whiteboard: WhiteboardResponse;
  className?: string;
};

export const WhiteboardBox: FC<WhiteboardBoxProps> = ({
  whiteboard,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas } = useWhiteboard(canvasRef, containerRef);

  return (
    <div className={clsx(styles.container, className)}>
      {canvas.width}
      <div>whiteboard users avatars</div>
      <div>panel with drawing tools</div>
      <div
        id={"canvas-container"}
        className={styles.canvasContainer}
        ref={containerRef}
      >
        <canvas id={"canvas"} className={styles.canvas} ref={canvasRef} />
      </div>
    </div>
  );
};
