import { fabric } from "fabric";
import { Canvas, IRectOptions, ITextOptions } from "fabric/fabric-impl";
import { v1 as uuid } from "uuid";

const CANVAS_ID = "fabricCanvas";
export const initCanvas = (objects: fabric.Object[]) => {
  const canvas = new fabric.Canvas(CANVAS_ID, {
    height: 900,
    width: 1600,
    isDrawingMode: true,
    stopContextMenu: true,
  });

  enlivenObjects(canvas, objects);

  return canvas;
};

export const enlivenObjects = (canvas: Canvas, objects: fabric.Object[]) => {
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
};

export type Options = IRectOptions & ITextOptions;

export const defaultOptions: Options = {
  width: 200,
  height: 150,
  stroke: "#000000",
  strokeWidth: 3,
  fill: "transparent",
  top: 0,
  left: 0,
  strokeUniform: true,
};

type CanvasObjectType = "figure" | "text";

const setOptions = (options: Options, objectType: CanvasObjectType) => {
  const withDefault = Object.assign(defaultOptions, options);
  const { width, height, stroke, fill, strokeWidth, top, left, strokeUniform } =
    withDefault;

  if (objectType === "figure") {
    return {
      width,
      height,
      stroke,
      fill,
      strokeWidth,
      top,
      left,
      strokeUniform,
    };
  }
};

export const assignId = (object: fabric.Object) => {
  const id = uuid();
  object.set("data", {
    id,
  });
};

export const createRectangle = (options: IRectOptions) => {
  const rect = new fabric.Rect(setOptions(options, "figure"));
  console.log(rect);
  return rect;
};
