import { SingleMeetingResponseBody } from "@types";
import { FC, useMemo } from "react";
import styles from "./meeting-card.module.scss";
import { isMeetingFinished, isMeetingOngoing } from "helpers/meetings";
import { stringifyDate } from "helpers/date";
import clsx from "clsx";
import { printArray } from "helpers/string";
import Link from "next/link";
import { UserAvatar } from "components/common/user-avatar";

type MeetingCardProps = {
  meeting: SingleMeetingResponseBody;
};

export const MeetingCard: FC<MeetingCardProps> = ({ meeting }) => {
  const finished = useMemo(() => isMeetingFinished(meeting), [meeting]);
  const ongoing = useMemo(() => isMeetingOngoing(meeting), [meeting]);
  const { _id, startsAt, description, subjects, organiser, invited } = meeting;

  return (
    <div className={clsx(styles.container, ongoing && styles.containerOngoing)}>
      <div className={styles.top}>
        <p className={styles.date}>{stringifyDate(startsAt, true)}</p>
        {(finished || ongoing) && (
          <Link href={`/meetings/${_id}`}>
            <a className={clsx(styles.link, ongoing && styles.linkOngoing)}>
              {ongoing ? "Join" : "View"}
            </a>
          </Link>
        )}
      </div>
      <p className={styles.description}>Description: {description}</p>
      <p className={styles.subjects}>{printArray(subjects)}</p>
      <p className={styles.invited}>{`${invited.length} ${
        invited.length > 1 ? "people" : "person"
      } invited`}</p>{" "}
      <div className={styles.organiser}>
        <span>{`Organiser: ${organiser.nickname}`}</span>{" "}
        <UserAvatar
          avatar={organiser.avatar}
          className={styles.avatar}
          size={20}
        />
      </div>
    </div>
  );
};
