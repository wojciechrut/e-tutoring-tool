import { FC } from "react";
import styles from "./leaflet-view.module.scss";
import { LeafletSearchResponseBody } from "@types";

type LeafletViewProps = {
  leaflet: LeafletSearchResponseBody["leaflets"][number];
};

export const LeafletView: FC<LeafletViewProps> = ({}) => {
  return <div className={styles.container}>asdf</div>;
};
