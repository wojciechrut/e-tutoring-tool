import React, { FC } from "react";
import { LeafletSearchResponseBody } from "@types";
import styles from "./leaflet-card.module.scss";
import { UserAvatar } from "components/common/user-avatar";
import { stringifyDate } from "helpers/date";
import { printArray } from "helpers/string";
import { StyledLink } from "components/common/styled-link";
import clsx from "clsx";

type LeafletCardProps = {
  leaflet: LeafletSearchResponseBody["leaflets"][number];
};

export const LeafletCard: FC<LeafletCardProps> = ({ leaflet }) => {
  const { user, createdAt, title, lookingFor, levels, subjects, _id } = leaflet;
  const { nickname, avatar, _id: userId, recommendedBy } = user;
  const recommends = recommendedBy.length;

  return (
    <div
      className={clsx(
        styles.container,
        recommends > 0 && styles.containerRecommended,
        recommends > 0 && styles.containerRecommendedOften
      )}
    >
      <h2 className={styles.leafletTitle}>{title}</h2>
      <p className={styles.leafletLookingFor}>looking for {lookingFor}</p>
      <p className={styles.leafletSubjects}>to study {printArray(subjects)}</p>
      <p className={styles.leafletLevels}>at {printArray(levels)} level</p>
      <p className={styles.leafletDate}>{stringifyDate(createdAt)}</p>
      <div className={styles.user}>
        <UserAvatar className={styles.userAvatar} avatar={avatar} size={50} />
        <p>{nickname}</p>
      </div>
      <div className={styles.leafletButtons}>
        <StyledLink path={`/leaflets/${_id}`} styleType={"icon"}>
          <i className="fa-solid fa-circle-info" />
        </StyledLink>
        <StyledLink path={`/chats?user=${userId}`} styleType={"icon"}>
          <i className="fa-solid fa-message" />
        </StyledLink>
      </div>
    </div>
  );
};
