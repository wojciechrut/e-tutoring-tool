import { FC } from "react";
import { LeafletSearchResponseBody } from "@types";
import styles from "./leaflet-card.module.scss";
import { UserAvatar } from "components/common/user-avatar";
import { printDatabaseDate } from "helpers/date";

type LeafletCardProps = {
  leaflet: LeafletSearchResponseBody["leaflets"][number];
};

export const LeafletCard: FC<LeafletCardProps> = ({ leaflet }) => {
  const { user, createdAt } = leaflet;
  const { nickname, avatar } = user;
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <UserAvatar className={styles.userAvatar} avatar={avatar} size={50} />
        <div className={styles.userNickname}>{nickname}</div>
        <div className={styles.leafletDate}>{printDatabaseDate(createdAt)}</div>
      </div>
    </div>
  );
};
