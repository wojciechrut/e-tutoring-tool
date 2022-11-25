import { WhiteboardResponse } from "@types";
import { FC } from "react";
import styles from "./whiteboard-box.module.scss";
import clsx from "clsx";

type WhiteboardBoxProps = {
  whiteboard: WhiteboardResponse;
  className?: string;
};

export const WhiteboardBox: FC<WhiteboardBoxProps> = ({
  whiteboard,
  className,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div>whiteboard users avatars</div>
      <div>panel with drawing tools</div>
      <div>canvas</div>
    </div>
  );
};
