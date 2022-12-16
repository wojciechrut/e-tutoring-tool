import styles from "./whiteboard-tools.module.scss";
import { FC } from "react";
import { useWhiteboard } from "hooks/useWhiteboard";
import { WhiteboardResponse } from "@types";
import Rectangle from "assets/icons/rectangle.svg";

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
        <i className="fa-solid fa-xmark"></i>
      </button>
      <button className={styles.button} onClick={addRectangle}>
        <Rectangle />
      </button>
      <button className={styles.button} onClick={() => setStroke("#ff0000")}>
        test
      </button>
    </div>
  );
};
