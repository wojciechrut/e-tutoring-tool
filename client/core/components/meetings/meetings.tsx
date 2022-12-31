import { FC, useState } from "react";
import styles from "./meetings.module.scss";
import { Button } from "components/common/button";
import { MeetingCreator } from "components/meeting-creator";
import clsx from "clsx";
import { MeetingSearch } from "components/meeting-search";
import { MeetingSearchResponseBody } from "@types";
import { MeetingCard } from "components/meeting-card";
import Spinner from "assets/spinner.svg";

type MeetingsProps = {};

export const Meetings: FC<MeetingsProps> = () => {
  const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false);
  const [searchedMeetings, setSearchedMeetings] =
    useState<null | MeetingSearchResponseBody>();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Your meetings</h1>
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.button}
            styleType={isCreatorOpen ? "secondary" : "primary"}
            onClick={() => setIsCreatorOpen(false)}
          >
            Search
          </Button>
          <Button
            className={styles.button}
            onClick={() => setIsCreatorOpen(true)}
            styleType={isCreatorOpen ? "primary" : "secondary"}
          >
            Create
          </Button>
        </div>
      </div>
      {isCreatorOpen ? (
        <div className={clsx(styles.container, styles.creator)}>
          <MeetingCreator />
        </div>
      ) : (
        <>
          <MeetingSearch
            setLoading={setLoading}
            setMeetings={setSearchedMeetings}
          />
          <div className={styles.searchResult}>
            {loading ? (
              <Spinner />
            ) : searchedMeetings && searchedMeetings.length > 0 ? (
              searchedMeetings.map((meeting) => (
                <MeetingCard meeting={meeting} key={meeting._id} />
              ))
            ) : (
              <div className={styles.noMeetings}>No meetings found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
