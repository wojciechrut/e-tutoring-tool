import { FC, useEffect, useState } from "react";
import styles from "./meeting-tools.module.scss";
import { ChatResponseBody, SingleMeetingResponseBody } from "@types";
import { useRouter } from "next/router";
import { useAuth } from "contexts/auth";
import clsx from "clsx";
import { ChatBox } from "components/chat-box";
import ChatService from "services/chat";
import Spinner from "assets/spinner.svg";

type MeetingToolsProps = {
  meeting: SingleMeetingResponseBody;
};

export const MeetingTools: FC<MeetingToolsProps> = ({ meeting }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isChatOpen, setChatOpen] = useState(false);
  const [chat, setChat] = useState<ChatResponseBody | null>();

  useEffect(() => {
    if (user && isChatOpen) {
      ChatService.accessChat({
        chatId: meeting.chat._id.toString(),
        userId: undefined,
      }).then((chat) => {
        console.log("chat");
        setChat(chat);
      });
    }
  }, [user, meeting, isChatOpen]);

  const isOrganiser = user?._id === meeting.organiser._id;
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => router.push("/meetings")}
      >
        <i className="fa-solid fa-arrow-left-long"></i>
      </button>
      <button
        className={clsx(styles.button, styles.buttonText)}
        onClick={() => router.push("/meetings")}
        disabled={!isOrganiser}
      >
        End
      </button>
      <button
        className={styles.button}
        onClick={() => setChatOpen((prev) => !prev)}
      >
        <i className="fa-regular fa-comments"></i>
      </button>
      <button onClick={() => console.log(chat)}>asdf</button>
      {isChatOpen && (
        <div className={styles.chatContainer}>
          {!!chat ? (
            <ChatBox chat={chat} className={styles.chat} />
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </div>
  );
};
