import React, { FC, useEffect, useState } from "react";
import { useAuth } from "contexts/auth";
import styles from "./profile-friends.module.scss";
import { MultipleInvitesResponseBody } from "@types";
import InviteService from "services/invite";
import clsx from "clsx";
import { StyledLink } from "components/common/styled-link";
import UserService from "services/user";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { parseError } from "helpers/parse-error";

type FieldValues = {
  nickname: string;
};

export const ProfileFriends: FC = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState(user?.friends);
  const [invites, setInvites] = useState<MultipleInvitesResponseBody>();
  const [inviteMessage, setInviteMessage] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>();

  const inputs: FormInputs<FieldValues> = [
    {
      type: "text",
      noMargin: true,
      htmlType: "text",
      name: "nickname",
      label: "",
      placeholder: "Nickname",
      registerOptions: {
        required: {
          value: true,
          message: "Please specify user nickname.",
        },
      },
    },
  ];

  useEffect(() => {
    InviteService.getReceived().then((invites) => setInvites(invites));
  }, []);

  const handleInvite = (accept: boolean, id: string) => () => {
    InviteService.setAccepted(id, accept).then(() =>
      InviteService.getReceived().then((invites) => setInvites(invites))
    );
  };

  const handleDisfriend = (id: string) => {
    UserService.disfriend(id).then(() =>
      setFriends((prev) => prev?.filter(({ _id }) => _id.toString() !== id))
    );
  };

  const onSubmit = (data: FieldValues) => {
    InviteService.send(data.nickname)
      .then((message) => setInviteMessage(message))
      .catch((err) => {
        setInviteMessage(parseError(err)?.messages[0] || "");
      });
    reset({ nickname: "" });
  };

  if (!user) {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.inviteForm}>
          {renderFormInputs(inputs, register, errors)}
          <button type={"submit"} className={styles.formButton}>
            Invite friend
          </button>
        </form>
        {inviteMessage && (
          <div className={styles.inviteMessage}>{inviteMessage}</div>
        )}
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.heading}>My friends</h3>
            {!(friends && friends?.length > 0) && (
              <div className={styles.info}>No friends added yet</div>
            )}
            <ul className={clsx(styles.friends, styles.list)}>
              {friends?.map(({ _id, nickname }) => (
                <li
                  key={_id.toString()}
                  className={clsx(styles.listItem, styles.friend)}
                >
                  <span>{nickname}</span>
                  <div className={styles.inviteButtons}>
                    <StyledLink
                      path={`/chats?user=${_id.toString()}`}
                      styleType={"icon"}
                    >
                      <i className="fa-solid fa-message" />
                    </StyledLink>
                    <button
                      className={clsx(styles.button, styles.buttonDecline)}
                      onClick={() => handleDisfriend(_id.toString())}
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.heading}>Invites</h3>
            {!(invites && invites?.length > 0) && (
              <div className={styles.info}>No active invites</div>
            )}
            <ul className={clsx(styles.invites, styles.list)}>
              {invites?.map(({ sender, _id }) => (
                <li
                  key={_id.toString()}
                  className={clsx(styles.listItem, styles.invite)}
                >
                  <span>{sender.nickname}</span>
                  <div className={styles.inviteButtons}>
                    <button
                      className={clsx(styles.button, styles.buttonAccept)}
                      onClick={handleInvite(true, _id.toString())}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button
                      className={clsx(styles.button, styles.buttonDecline)}
                      onClick={handleInvite(false, _id.toString())}
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
