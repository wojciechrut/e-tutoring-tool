import { Canvas } from "fabric/fabric-impl";
import { useEffect, useState } from "react";
import {
  assignId,
  createRectangle,
  defaultOptions,
  enlivenObjects,
  initCanvas,
  Options,
} from "hooks/useWhiteboard/fabric-helpers";
import { fabric } from "fabric";
import { WhiteboardResponse } from "@types";
import { useAuth } from "contexts/auth";
import { useWhiteboardSocket } from "hooks/useWhiteboard/useWhiteboardSocket";
import WhiteboardService from "services/whiteboard";

let canvas: Canvas | null;
export const useWhiteboard = ({
  _id: whiteboardId,
  objects: initialObjects,
}: WhiteboardResponse) => {
  const { user } = useAuth();
  const { handleObjectReceived, sendObject } = useWhiteboardSocket(
    whiteboardId.toString()
  );
  const [drawing, setDrawing] = useState(true);
  //todo - separate hook
  const [options, setOptions] = useState<Options>(defaultOptions);

  //initialization
  useEffect(() => {
    canvas = initCanvas(initialObjects as fabric.Object[]);
    canvas.getActiveObject();

    return () => {
      canvas && canvas.dispose();
      canvas = null;
    };
  }, [initialObjects]);

  //drawing mode
  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = drawing;
    }
  }, [drawing]);

  //object received
  useEffect(() => {
    handleObjectReceived((object: fabric.Object) => {
      canvas && enlivenObjects(canvas, [object]);
    });
  }, [handleObjectReceived, user]);

  const toggleDrawing = () => {
    setDrawing((prev) => !prev);
  };

  const addObject = (object: fabric.Object) => {
    assignId(object);
    sendObject(object);
    canvas?.add(object);
    setDrawing(false);
    canvas?.renderAll();
    WhiteboardService.addObject(whiteboardId.toString(), object).then(
      console.log
    );
  };

  const addRectangle = () => {
    const rectangle = createRectangle(options);
    addObject(rectangle);
  };

  return { canvas, toggleDrawing, addRectangle, options };
};
