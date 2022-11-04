import { LeafletSearchResponseBody } from "@types";
import { FC } from "react";
import styles from "./leaflet-list.module.scss";
import { LeafletCard } from "components/leaflet-card";

type LeafletListProps = {
  leaflets: LeafletSearchResponseBody["leaflets"];
};

export const LeafletList: FC<LeafletListProps> = ({ leaflets }) => {
  return (
    <div className={styles.container}>
      {leaflets.map((leaflet) => (
        <LeafletCard leaflet={leaflet} key={leaflet._id} />
      ))}
    </div>
  );
};
