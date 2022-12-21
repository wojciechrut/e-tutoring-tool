import styles from "./whiteboard-tools.module.scss";
import { FC, useState } from "react";
import { useWhiteboard } from "hooks/useWhiteboard";
import { WhiteboardResponse } from "@types";
import Rectangle from "assets/icons/rectangle.svg";
import clsx from "clsx";
import { Modal } from "components/common/modal";
import { CompactPicker } from "react-color";

type WhiteboardToolsProps = {
  whiteboard: WhiteboardResponse;
};

export const WhiteboardTools: FC<WhiteboardToolsProps> = ({ whiteboard }) => {
  const {
    toggleDrawing,
    addRectangle,
    drawing,
    removeSelectedObjects,
    setStroke,
    setStrokeWidth,
  } = useWhiteboard(whiteboard);
  const [areSettingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={toggleDrawing}>
        {drawing ? (
          <i className="fa-solid fa-pencil"></i>
        ) : (
          <i className="fa-solid fa-arrow-pointer"></i>
        )}
      </button>
      <button className={styles.button} onClick={removeSelectedObjects}>
        <i className="fa-solid fa-trash"></i>
      </button>
      <button className={styles.button} onClick={addRectangle}>
        <Rectangle />
      </button>
      <button
        className={clsx(styles.button, styles.buttonOpenSettings)}
        onClick={() => setSettingsOpen((prev) => !prev)}
      >
        <i className="fa-solid fa-gear"></i>
      </button>
      <Modal
        open={areSettingsOpen}
        setOpen={setSettingsOpen}
        className={styles.settings}
      >
        <CompactPicker
          colors={availableColors}
          onChangeComplete={(color) => {
            setStroke(color.hex);
          }}
        />
        <div className={styles.settingsRow}>
          <span>Stroke width:</span>
        </div>
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
