import { fabric } from "fabric";
import { IRectOptions, ITextOptions } from "fabric/fabric-impl";

const CANVAS_ID = "fabricCanvas";
export const initCanvas = (objects: fabric.Object[]) => {
  const canvas = new fabric.Canvas(CANVAS_ID, {
    height: 900,
    width: 1600,
    isDrawingMode: true,
    stopContextMenu: true,
  });

  fabric.util.enlivenObjects(
    objects,
    (objects: fabric.Object[]) => {
      objects.forEach((fabricObject) => {
        canvas.add(fabricObject);
      });
      canvas.renderAll();
    },
    "fabric"
  );

  return canvas;
};

export type Options = IRectOptions & ITextOptions;

export const defaultOptions: Options = {
  width: 200,
  height: 200,
  stroke: "#000000",
  strokeWidth: 3,
  fill: undefined,
  top: 200,
  left: 200,
};

type CanvasObjectType = "figure" | "text";

const setOptions = (options: Options, objectType: CanvasObjectType) => {
  const withDefault = Object.assign(defaultOptions, options);
  const { width, height, stroke, fill, strokeWidth, top, left } = withDefault;

  if (objectType === "figure") {
    return { width, height, stroke, fill, strokeWidth, top, left };
  }
};

export const createRectangle = (options: IRectOptions) => {
  return new fabric.Rect(setOptions(options, "figure"));
};
