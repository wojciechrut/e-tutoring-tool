import { FC, useEffect, useState } from "react";
import styles from "./meeting-tools.module.scss";
import { ChatResponseBody, SingleMeetingResponseBody } from "@types";
import { useRouter } from "next/router";
import { useAuth } from "contexts/auth";
import clsx from "clsx";
import ChatService from "services/chat";
import Spinner from "assets/spinner.svg";
import { ChatBox } from "components/chat-box";

type MeetingToolsProps = {
  meeting: SingleMeetingResponseBody;
};

export const MeetingTools: FC<MeetingToolsProps> = ({ meeting }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isChatOpen, setChatOpen] = useState(false);
  const [chat, setChat] = useState<ChatResponseBody | null>();

  useEffect(() => {
    if (user) {
      ChatService.accessChat({
        chatId: meeting.chat._id.toString(),
        userId: undefined,
      }).then((chat) => {
        setChat(chat);
      });
    }
  }, [user, meeting]);

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
      <div
        className={clsx(
          styles.chatContainer,
          isChatOpen && styles.chatContainerShow
        )}
        draggable={true}
      >
        {!!chat ? <ChatBox chat={chat} className={styles.chat} /> : <Spinner />}
      </div>
    </div>
  );
};
