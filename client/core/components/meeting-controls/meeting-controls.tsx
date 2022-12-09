import { SingleMeetingResponseBody } from "@types";
import { FC } from "react";
import styles from "./meeting-controls.module.scss";
import clsx from "clsx";
import { useVoicecall } from "hooks/useVoicecall";
import { useAuth } from "contexts/auth";

type MeetingControlsProps = {
  meeting: SingleMeetingResponseBody;
  className?: string;
};

export const MeetingControls: FC<MeetingControlsProps> = ({
  meeting,
  className,
}) => {
  const { user } = useAuth();
  const otherUsers = [...meeting.invited, meeting.organiser].filter(
    ({ _id }) => _id !== user?._id
  );
  const { audioRefs } = useVoicecall(
    meeting._id,
    otherUsers.map((u) => u._id.toString())
  );

  return (
    <div className={clsx(styles.container, className)}>
      {otherUsers.map((user, i) => (
        <audio
          key={user._id.toString()}
          ref={(element) => {
            audioRefs.current[i] = element;
          }}
          autoPlay
        />
      ))}
      {`${user?._id.toString()}`}
    </div>
  );
};
