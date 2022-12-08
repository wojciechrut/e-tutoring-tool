import { Canvas } from "fabric/fabric-impl";
import { useEffect, useState } from "react";
import {
  assignId,
  createRectangle,
  defaultOptions,
  enlivenObjects,
  handlePathAdded,
  initCanvas,
  Options,
} from "hooks/useWhiteboard/fabric-helpers";
import { fabric } from "fabric";
import { WhiteboardResponse } from "@types";
import { useWhiteboardSocket } from "hooks/useWhiteboard/useWhiteboardSocket";
import WhiteboardService from "services/whiteboard";

let canvas: Canvas | null;
export const useWhiteboard = ({
  _id: whiteboardId,
  objects: initialObjects,
}: WhiteboardResponse) => {
  const { handleObjectReceived, sendObject } = useWhiteboardSocket(
    whiteboardId.toString()
  );
  const [drawing, setDrawing] = useState(true);
  //todo - separate hook
  const [options, setOptions] = useState<Options>(defaultOptions);

  //initialization
  useEffect(() => {
    canvas = initCanvas(initialObjects);

    return () => {
      if (canvas) {
        canvas.dispose();
        canvas.removeListeners();
      }
      canvas = null;
    };
  }, [initialObjects]);

  //drawing mode
  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = drawing;
      drawing && canvas.off();
      if (drawing) {
        handlePathAdded(canvas, (object) => {
          sendObject(object);
          WhiteboardService.addObject(whiteboardId.toString(), object);
        });
      } else {
        canvas.off("object:added");
      }
    }
  }, [drawing, sendObject, whiteboardId]);

  //object received
  useEffect(() => {
    handleObjectReceived((object: fabric.Object) => {
      //@ts-ignore
      object.noEmit = true;
      canvas && enlivenObjects(canvas, [object]);
    });
  }, [handleObjectReceived]);

  const toggleDrawing = () => {
    setDrawing((prev) => !prev);
  };

  const addObject = (object: fabric.Object) => {
    assignId(object);
    sendObject(object);
    canvas?.add(object);
    setDrawing(false);
    canvas?.renderAll();
    WhiteboardService.addObject(whiteboardId.toString(), object);
  };

  const addRectangle = () => {
    const rectangle = createRectangle(options);
    addObject(rectangle);
  };

  return { canvas, toggleDrawing, addRectangle, options };
};
