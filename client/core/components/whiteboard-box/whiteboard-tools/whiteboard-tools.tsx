import styles from "./whiteboard-tools.module.scss";
import { FC, useEffect, useState } from "react";
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";

let canvas: Canvas | undefined;
export const WhiteboardTools: FC = () => {
  const [drawing, setDrawing] = useState(true);

  useEffect(() => {
    const initCanvas = () =>
      new fabric.Canvas("fabricCanvas", {
        height: 900,
        width: 1600,
        isDrawingMode: true,
      });

    canvas = initCanvas();

    return () => {
      if (canvas) canvas.dispose();
      canvas = undefined;
    };
  }, []);

  useEffect(() => {
    if (canvas) canvas.isDrawingMode = drawing;
  }, [drawing]);

  const x = () => {
    setDrawing(!drawing);
  };

  const y = () => {
    const x = Math.floor(Math.random() * 1000);
    if (canvas)
      canvas.add(
        new fabric.Rect({
          width: x,
          top: Math.floor(Math.random() * 100),
          height: 100,
          fill: "red",
        })
      );
  };
  return (
    <div className={styles.container}>
      <div>
        <button onClick={() => x()}>{drawing ? "yes" : "no"}</button>
        <button onClick={() => y()}>{"add"}</button>
        {drawing.toString()}
        {canvas && canvas.isDrawingMode?.toString()}
      </div>
    </div>
  );
};
