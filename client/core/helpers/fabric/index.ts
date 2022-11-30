import { fabric } from "fabric";

export * from "./FabricToolbox";

export const getInitialCanvas = () =>
  new fabric.Canvas("canvas", {
    height: 900,
    width: 1600,
    backgroundColor: "white",
    controlsAboveOverlay: true,
  });
