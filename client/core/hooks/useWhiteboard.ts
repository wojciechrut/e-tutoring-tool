import { fabric } from "fabric";
import { RefObject, useEffect, useState } from "react";

export const useWhiteboard = (
  canvasRef: RefObject<HTMLCanvasElement>,
  containerRef: RefObject<HTMLDivElement>
) => {
  const prefetchCanvas = new fabric.Canvas(canvasRef.current?.id || "", {
    width: 300,
    height: 200,
    backgroundColor: "white",
    controlsAboveOverlay: true,
  });
  const [canvas, setCanvas] = useState(prefetchCanvas);
  //cp only whiteboard...

  useEffect(() => {
    const adjustCanvasSize = () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      canvas.setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    adjustCanvasSize();
    window.addEventListener("resize", adjustCanvasSize);

    return () => window.removeEventListener("resize", adjustCanvasSize);
  }, [canvas, containerRef]);

  return { canvas };
};
