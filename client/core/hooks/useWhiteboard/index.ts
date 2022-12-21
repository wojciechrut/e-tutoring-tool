import { Canvas } from "fabric/fabric-impl";
import { useEffect, useState } from "react";
import {
  assignId,
  createCircle,
  createRectangle,
  createText,
  createTriangle,
  enlivenObjects,
  handlePathAdded,
  initCanvas,
  onObjectModified,
  removeObjectsByIds,
  removeSelected,
} from "hooks/useWhiteboard/fabric-helpers";
import { fabric } from "fabric";
import { WhiteboardResponse } from "@types";
import { useWhiteboardSocket } from "hooks/useWhiteboard/useWhiteboardSocket";
import WhiteboardService from "services/whiteboard";
import { useWhiteboardOptions } from "hooks/useWhiteboard/useWhiteboardOptions";

let canvas: Canvas | null;
export const useWhiteboard = ({
  _id: whiteboardId,
  objects: initialObjects,
}: WhiteboardResponse) => {
  const [drawing, setDrawing] = useState(false);
  const {
    handleObjectReceived,
    sendObject,
    handleObjectModified,
    sendModifiedObject,
    sendRemovedObjects,
    handleObjectsRemoved,
  } = useWhiteboardSocket(whiteboardId.toString());
  const { options, setStroke, setStrokeWidth, setFill, setFontSize } =
    useWhiteboardOptions(canvas);

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
  }, [initialObjects, whiteboardId]);

  //handle local object modified
  useEffect(() => {
    if (!canvas) return;
    onObjectModified(canvas, (object) => {
      WhiteboardService.modifyObject(whiteboardId.toString(), object);
      sendModifiedObject(object);
    });
  }, [sendModifiedObject, whiteboardId]);

  //drawing mode
  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = drawing;
      if (drawing) {
        handlePathAdded(canvas, (object) => {
          sendObject(object);
          WhiteboardService.addObject(whiteboardId.toString(), object);
        });
      } else {
        canvas.off("object:added");
      }
    }
  }, [drawing, whiteboardId, sendObject]);

  //object received
  useEffect(() => {
    handleObjectReceived((object: fabric.Object) => {
      //@ts-ignore
      object.noEmit = true;
      canvas && enlivenObjects(canvas, [object]);
    });
  }, [handleObjectReceived]);

  //modified object received
  useEffect(() => {
    handleObjectModified((object: fabric.Object) => {
      //@ts-ignore
      object.noEmit = true;
      if (!object.data) return;
      canvas?.getObjects().forEach((canvasObject) => {
        if (object.data.id === canvasObject.data.id) {
          canvasObject.set(object);
          canvasObject.setCoords();
          canvas?.renderAll();
        }
      });
    });
  }, [handleObjectModified]);

  //removed objects received
  useEffect(() => {
    handleObjectsRemoved((objects) => {
      canvas &&
        removeObjectsByIds(
          canvas,
          objects.map(({ data }) => data && data.id)
        );
    });
  }, [handleObjectsRemoved]);

  const toggleDrawing = () => {
    setDrawing((prev) => !prev);
  };

  const addObject = (object: fabric.Object) => {
    assignId(object);
    sendObject(object);
    canvas?.add(object);
    canvas?.setActiveObject(object);
    canvas?.renderAll();
    setDrawing(false);
    WhiteboardService.addObject(whiteboardId.toString(), object);
  };

  const removeSelectedObjects = () => {
    if (!canvas) return;
    const removed = removeSelected(canvas).map((object) =>
      object.toJSON(["data"])
    );
    sendRemovedObjects(removed);
    WhiteboardService.removeObjects(
      whiteboardId.toString(),
      removed.map(({ data }) => data && data.id)
    );
  };

  const addRectangle = () => {
    const rectangle = createRectangle(options);
    addObject(rectangle);
  };

  const addCircle = () => {
    const circle = createCircle(options);
    addObject(circle);
  };

  const addTriangle = () => {
    const triangle = createTriangle(options);
    addObject(triangle);
  };

  const addText = () => {
    const text = createText(options);
    addObject(text);
    canvas?.setActiveObject(text);
    text.enterEditing();
    text.hiddenTextarea?.focus();
    text.on("selection:changed", (e) => {
      if (!text.selected && text.isEditing) {
        text.exitEditing();
      }
    });
  };

  return {
    canvas,
    toggleDrawing,
    addRectangle,
    removeSelectedObjects,
    options,
    drawing,
    setStrokeWidth,
    setStroke,
    setFill,
    addCircle,
    addTriangle,
    addText,
    setFontSize,
  };
};
