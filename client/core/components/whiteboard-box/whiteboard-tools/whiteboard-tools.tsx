import styles from "./whiteboard-tools.module.scss";
import { FC } from "react";
import { useWhiteboard } from "hooks/useWhiteboard";
import { WhiteboardResponse } from "@types";

type WhiteboardToolsProps = {
  whiteboard: WhiteboardResponse;
};

export const WhiteboardTools: FC<WhiteboardToolsProps> = ({ whiteboard }) => {
  const { toggleDrawing, addRectangle } = useWhiteboard(whiteboard);

  return (
    <div className={styles.container}>
      <div>
        <button onClick={addRectangle}>add</button>
        <button onClick={toggleDrawing}>toggle</button>
      </div>
    </div>
  );
};
