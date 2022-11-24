import { WhiteboardResponse } from "@types";
import { FC } from "react";

type WhiteboardBoxProps = {
  whiteboard: WhiteboardResponse;
};
export const WhiteboardBox: FC<WhiteboardBoxProps> = ({ whiteboard }) => {
  return <>whiteboard id: {whiteboard._id}</>;
};
