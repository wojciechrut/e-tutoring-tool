import { Canvas } from "fabric/fabric-impl";
import { v1 as uuid } from "uuid";
import { fabric } from "fabric";

type ObjectWithId = fabric.Object & { id?: string };

export class FabricToolbox {
  private readonly canvas: Canvas;
  private color: string;
  private fillColor?: string;
  private strokeWidth: number;

  public constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.color = "black";
    this.strokeWidth = 2;
  }

  public setColor(color: string) {
    this.color = color;
  }

  public setIsDrawingMode(isDrawing = true) {
    this.canvas.isDrawingMode = isDrawing;
  }

  public toggleDrawingMode() {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
  }

  private addObject(object: ObjectWithId) {
    const uniqueId = uuid();
    object.set("id", uniqueId);
    this.canvas.add(object);
    this.canvas.renderAll();
  }

  public drawRectangle() {
    const rectangle = new fabric.Rect({
      width: 200,
      height: 120,
      stroke: this.color,
      strokeWidth: this.strokeWidth,
      fill: this.fillColor,
    });

    this.addObject(rectangle);
  }
}
