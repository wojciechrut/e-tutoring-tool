import { FC } from "react";
import { LeafletSearchResponseBody } from "@types";
import styles from "./leaflet-card.module.scss";

type LeafletCardProps = {
  leaflet: LeafletSearchResponseBody["leaflets"][number];
};

export const LeafletCard: FC<LeafletCardProps> = ({ leaflet }) => {
  return (
    <div className={styles.container}>{JSON.stringify(leaflet, null, 2)}</div>
  );
};
