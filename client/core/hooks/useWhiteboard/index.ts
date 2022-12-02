import { Canvas } from "fabric/fabric-impl";
import { useEffect, useState } from "react";
import {
  createRectangle,
  defaultOptions,
  initCanvas,
  Options,
} from "hooks/useWhiteboard/fabric-helpers";
import { fabric } from "fabric";
import { WhiteboardResponse } from "@types";

let canvas: Canvas | null;
export const useWhiteboard = ({
  objects: initialObjects,
}: WhiteboardResponse) => {
  const [drawing, setDrawing] = useState(true);
  //todo - separate hook
  const [options, setOptions] = useState<Options>(defaultOptions);

  useEffect(() => {
    //backend doesn't know fabric types
    canvas = initCanvas(initialObjects as fabric.Object[]);

    return () => {
      canvas && canvas.dispose();
      canvas = null;
    };
  }, [initialObjects]);

  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = drawing;
    }
  }, [drawing]);

  const toggleDrawing = () => {
    setDrawing((prev) => !prev);
  };

  const addObject = (object: fabric.Object) => {
    canvas?.add(object);
    canvas?.renderAll();
  };

  const addRectangle = () => {
    const rectangle = createRectangle(options);
    addObject(rectangle);
  };

  return { canvas, toggleDrawing, addRectangle, options };
};
