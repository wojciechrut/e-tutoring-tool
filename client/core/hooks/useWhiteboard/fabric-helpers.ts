import { fabric } from "fabric";
import {
  Canvas,
  ICircleOptions,
  IRectOptions,
  ITextOptions,
  ITriangleOptions,
} from "fabric/fabric-impl";
import { v1 as uuid } from "uuid";

const CANVAS_ID = "fabricCanvas";
export const initCanvas = (objects: Object[], disabled = false) => {
  const canvas = new fabric.Canvas(CANVAS_ID, {
    height: 900,
    width: 1600,
    isDrawingMode: !disabled,
    stopContextMenu: true,
    backgroundColor: "#ffffff",
    interactive: !disabled,
  });

  if (disabled) {
    canvas.removeListeners();
  }

  enlivenObjects(canvas, objects as fabric.Object[]);

  //handling selection with double click
  let previousActive: fabric.Object[] | fabric.Object;
  let layer: number;
  canvas.on("mouse:dblclick", (event) => {
    const { x, y } = canvas.getPointer(event as unknown as Event);
    const mousePoint = new fabric.Point(x, y);
    const activeObjects = canvas.getActiveObjects();
    const targets = canvas
      .getObjects()
      .filter((obj) => obj.containsPoint(mousePoint));

    if (previousActive !== activeObjects) {
      layer = Math.max(targets.length - 2, 0);
    } else {
      layer = --layer < 0 ? Math.max(targets.length - 2, 0) : layer;
    }

    const foundObject = targets[layer];
    if (foundObject) {
      previousActive = foundObject;
      foundObject.bringToFront();
      canvas.setActiveObject(foundObject).renderAll();
    }
  });

  return canvas;
};

const isRenderablePath = (object: any) => {
  return !object.data?.id && object.type === "path" && !object.noEmit;
};

export const handlePathAdded = (
  canvas: Canvas,
  cb: (obj: fabric.Object) => void
) => {
  canvas.off("object:added");
  canvas.on("object:added", (event) => {
    const { target } = event;
    if (!target || !isRenderablePath(target)) {
      return;
    }
    const object = target;
    assignId(object);
    object.setCoords();
    object.set("strokeUniform", true);
    //@ts-ignore
    if (object.noEmit) return;
    cb(object);
  });
};

export const onObjectModified = (
  canvas: Canvas,
  cb: (obj: fabric.Object) => void
) => {
  canvas.off("object:modified");
  canvas.on("object:modified", (event) => {
    const { target } = event;
    if (!target) {
      return;
    }

    if (canvas.getActiveObjects().length > 1) {
      canvas.getActiveObjects().forEach((object) => {
        const group = object.group;
        if (group && object) {
          const absolutelyPositioned = object.toJSON(["data", "strokeUniform"]);
          absolutelyPositioned.left =
            //@ts-ignore
            object.left + group.left + group.width / 2;
          absolutelyPositioned.top =
            //@ts-ignore
            object.top + group.top + group.height / 2;
          cb(absolutelyPositioned);
        }
      });
    } else {
      cb(target);
    }
  });
};

export const removeSelected = (canvas: Canvas) => {
  const selected = canvas.getActiveObjects();
  selected.forEach((object) => {
    if (!object.data.id) return;
    canvas.remove(object);
  });

  canvas.renderAll();
  return selected;
};

export const removeObjectsByIds = (canvas: Canvas, ids: Array<string>) => {
  const objectsToRemove = canvas
    .getObjects()
    .filter((object) => object.data.id && ids.includes(object.data.id));

  objectsToRemove.forEach((object) => {
    canvas.remove(object);
  });
  canvas.renderAll();
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

export type Options = IRectOptions &
  ITriangleOptions &
  ICircleOptions &
  ITextOptions;

export const defaultOptions = {
  width: 200,
  height: 150,
  stroke: "#000000",
  strokeWidth: 3,
  fill: "transparent",
  top: 10,
  left: 10,
  strokeUniform: true,
  fontSize: 48,
  text: "",
  fontFamily: "Times New Roman",
};

type CanvasObjectType = "rectangle" | "triangle" | "circle" | "text";

const setOptions = (options: Options, objectType: CanvasObjectType) => {
  const withDefault = Object.assign(defaultOptions, options);
  const {
    width,
    height,
    stroke,
    fill,
    strokeWidth,
    top,
    left,
    strokeUniform,
    fontSize,
    text,
    fontFamily,
  } = withDefault;
  const commonFigureOptions = {
    stroke,
    strokeWidth,
    fill,
    top,
    left,
    strokeUniform,
  };

  if (objectType === "rectangle" || objectType === "triangle") {
    return {
      width,
      height,
      ...commonFigureOptions,
    };
  } else if (objectType === "circle") {
    return {
      radius: width,
      ...commonFigureOptions,
    };
  } else if (objectType === "text") {
    return {
      fontSize,
      fontFamily,
      width: 200,
      top,
      left,
      text,
      editingBorderColor: "#000033",
    };
  }
};

export const adjustBrushToOptions = (canvas: Canvas, options: Options) => {
  const { stroke, strokeWidth } = options;
  if (stroke) canvas.freeDrawingBrush.color = stroke;
  if (strokeWidth) canvas.freeDrawingBrush.width = strokeWidth;
};

export const assignId = (object: fabric.Object) => {
  const id = uuid();
  object.set("data", {
    id,
  });
};

export const createRectangle = (options: IRectOptions) => {
  return new fabric.Rect(setOptions(options, "rectangle"));
};

export const createTriangle = (options: ITriangleOptions) => {
  return new fabric.Triangle(setOptions(options, "triangle"));
};

export const createCircle = (options: ICircleOptions) => {
  return new fabric.Circle(setOptions(options, "circle"));
};

export const createText = (options: ITextOptions) => {
  const { text, ...rest } = setOptions(options, "text") as ITextOptions;
  return new fabric.IText(text || "", rest);
};
