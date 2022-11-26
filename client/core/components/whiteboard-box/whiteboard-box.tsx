import { WhiteboardResponse } from "@types";
import { FC, useEffect, useState } from "react";
import styles from "./whiteboard-box.module.scss";
import clsx from "clsx";
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";

type WhiteboardBoxProps = {
  meetingId: string;
  whiteboard: WhiteboardResponse;
  className?: string;
};

const getInitialCanvas = () =>
  new fabric.Canvas("canvas", {
    height: 745,
    width: 1200,
    backgroundColor: "white",
    controlsAboveOverlay: true,
  });

export const WhiteboardBox: FC<WhiteboardBoxProps> = ({
  meetingId,
  whiteboard,
  className,
}) => {
  const [canvas, setCanvas] = useState<Canvas>();

  useEffect(() => {
    const canvas = getInitialCanvas();

    canvas?.add(
      new fabric.Triangle({
        width: 100,
        height: 50,
      })
    );

    setCanvas(canvas);
  }, []);

  return (
    <div className={clsx(styles.container, className)}>
      <div>whiteboard users avatars</div>
      <div>panel with drawing tools</div>
      <button
        onClick={() => {
          canvas?.setZoom(10);
        }}
      >
        test
      </button>
      <div className={styles.canvasContainer}>
        <canvas id={"canvas"} className={styles.canvas} />
      </div>
    </div>
  );
};
