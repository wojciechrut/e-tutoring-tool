import styles from "./whiteboard-tools.module.scss";
import { FC, useEffect, useState } from "react";
import { useWhiteboard } from "hooks/useWhiteboard";
import { WhiteboardResponse } from "@types";
import Rectangle from "assets/icons/rectangle.svg";
import RectangleFill from "assets/icons/rectangle-fill.svg";
import Triangle from "assets/icons/triangle.svg";
import Circle from "assets/icons/circle.svg";
import clsx from "clsx";
import { Modal } from "components/common/modal";
import { CompactPicker } from "react-color";
import { defaultOptions } from "hooks/useWhiteboard/fabric-helpers";

type WhiteboardToolsProps = {
  whiteboard: WhiteboardResponse;
  disabled?: boolean;
};

export const WhiteboardTools: FC<WhiteboardToolsProps> = ({
  whiteboard,
  disabled,
}) => {
  const {
    toggleDrawing,
    addRectangle,
    drawing,
    removeSelectedObjects,
    setStroke,
    setStrokeWidth,
    setFill,
    addCircle,
    addTriangle,
    addText,
    setFontSize,
  } = useWhiteboard({ ...whiteboard, disabled });
  const [areSettingsOpen, setSettingsOpen] = useState(false);
  const [isFill, setIsFill] = useState(false);

  useEffect(() => {
    if (!isFill) setFill(false);
  }, [isFill]);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={toggleDrawing}
        disabled={disabled}
      >
        {drawing ? (
          <i className="fa-solid fa-pencil"></i>
        ) : (
          <i className="fa-solid fa-arrow-pointer"></i>
        )}
      </button>
      <button
        className={styles.button}
        onClick={removeSelectedObjects}
        disabled={disabled}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
      <button
        className={styles.button}
        onClick={addRectangle}
        disabled={disabled}
      >
        <Rectangle />
      </button>
      <button className={styles.button} onClick={addCircle} disabled={disabled}>
        <Circle />
      </button>
      <button
        className={styles.button}
        onClick={addTriangle}
        disabled={disabled}
      >
        <Triangle />
      </button>
      <button className={styles.button} onClick={addText} disabled={disabled}>
        T
      </button>
      <button
        className={clsx(styles.button, styles.buttonOpenSettings)}
        onClick={() => setSettingsOpen((prev) => !prev)}
        disabled={disabled}
      >
        <i className="fa-solid fa-gear"></i>
      </button>
      <Modal
        open={areSettingsOpen}
        setOpen={setSettingsOpen}
        className={styles.settings}
      >
        <div>
          Stroke color:
          <CompactPicker
            colors={availableColors}
            onChangeComplete={(color) => {
              setStroke(color.hex);
            }}
          />
        </div>
        <div className={styles.settingsRow}>
          <span>Stroke width:</span>
          <input
            className={styles.settingsStrokeWidthInput}
            type="range"
            defaultValue={defaultOptions.strokeWidth}
            min={1}
            max={20}
            onChange={(event) => setStrokeWidth(parseInt(event.target.value))}
          />
        </div>
        <div className={styles.settingsRow}>
          <span>Font size:</span>
          <input
            className={styles.settingsStrokeWidthInput}
            type="range"
            defaultValue={defaultOptions.fontSize}
            min={16}
            step={8}
            max={120}
            onChange={(event) => setFontSize(parseInt(event.target.value))}
          />
        </div>
        <div className={styles.settingsRow}>
          <span>Fill figures: </span>
          <button
            className={styles.button}
            onClick={() => setIsFill((prev) => !prev)}
          >
            {isFill ? <RectangleFill /> : <Rectangle />}
          </button>
        </div>
        {isFill && (
          <div>
            Fill color:
            <CompactPicker
              colors={availableColors}
              onChangeComplete={(color) => {
                setFill(color.hex);
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

const availableColors = [
  "#000000",
  "#ffffff",
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];
