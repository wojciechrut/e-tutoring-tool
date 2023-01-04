import { SingleMeetingResponseBody } from "@types";
import { FC, useEffect, useState } from "react";
import styles from "./meeting-controls.module.scss";
import clsx from "clsx";
import { useVoicecall } from "hooks/useVoicecall";
import { useAuth } from "contexts/auth";
import { UserAvatar } from "components/common/user-avatar";
import { getOtherUsersFromMeeting, getUsersIds } from "helpers/users";

type MeetingControlsProps = {
  meeting: SingleMeetingResponseBody;
  className?: string;
};

export const MeetingControls: FC<MeetingControlsProps> = ({
  meeting,
  className,
}) => {
  const { user } = useAuth();
  const otherUsers = getOtherUsersFromMeeting(user!!._id.toString(), meeting);
  const { audioRefs, connected } = useVoicecall(
    meeting._id,
    getUsersIds(otherUsers)
  );
  const [muted, setMuted] = useState<Array<boolean>>(
    otherUsers.map(() => false)
  );
  const [showMobile, setShowMobile] = useState<boolean>(false);

  const toggleMute = (userIndex: number) => {
    setMuted((previous) => {
      const newValue = [...previous];
      newValue[userIndex] = !newValue[userIndex];
      return newValue;
    });
  };

  useEffect(() => {
    muted.map((singleMutedState, i) => {
      const audioElement = audioRefs.current[i];
      if (audioElement) {
        audioElement.muted = singleMutedState;
      }
    });
  }, [muted, audioRefs]);

  return (
    <div
      className={clsx(
        styles.container,
        className,
        showMobile && styles.containerWithBackground
      )}
    >
      {otherUsers.map((user, i) => {
        return (
          <div
            className={clsx(
              styles.userAudio,
              showMobile && styles.userAudioShow,
              connected[i] && styles.userAudioActive
            )}
            key={user._id.toString()}
          >
            <audio
              ref={(element) => {
                audioRefs.current[i] = element;
              }}
              autoPlay
            />
            <div className={styles.userAudioControl}>
              <UserAvatar
                avatar={user.avatar}
                size={40}
                className={styles.userAudioAvatar}
              />
              <div className={styles.userAudioNickname}>{user.nickname}</div>
              <button
                onClick={() => toggleMute(i)}
                className={styles.userAudioButton}
              >
                {muted[i] ? (
                  <i className="fa-solid fa-microphone-slash" />
                ) : (
                  <i className="fa-solid fa-microphone" />
                )}
              </button>
            </div>
          </div>
        );
      })}
      <button
        className={styles.toggleButton}
        onClick={() => {
          setShowMobile((prev) => !prev);
        }}
      >
        <i className="fa-solid fa-users" />
      </button>
    </div>
  );
};
