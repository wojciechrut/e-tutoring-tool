import { FC, useEffect } from "react";
import styles from "./invite-friend-button.module.scss";
import { useFriendInvite } from "hooks/useFriendInvite";
import clsx from "clsx";

type InviteFriendButtonProps = {
  userId: string;
};

export const InviteFriendButton: FC<InviteFriendButtonProps> = ({ userId }) => {
  const { status, setAccepted, sendInvite, loading, error } =
    useFriendInvite(userId);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const buttonLabel =
    status === "invite sent"
      ? "Invited"
      : status === "invited by"
      ? "Accept"
      : status === "friend"
      ? "Friend"
      : "Invite";

  if (loading) {
    return null;
  }

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={styles.container}>
        <span className={styles.label}>{buttonLabel}</span>
        {status === "can invite" && (
          <button
            disabled={!!error}
            className={styles.button}
            onClick={sendInvite}
          >
            <i className="fa-solid fa-user-plus" />
          </button>
        )}
        {status === "invited by" && (
          <>
            <button
              disabled={!!error}
              className={styles.button}
              onClick={() => setAccepted(true)}
            >
              <i className="fa-solid fa-check" />
            </button>
            <button
              disabled={!!error}
              className={styles.button}
              onClick={() => setAccepted(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
