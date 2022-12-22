import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@types";
import { useRouter } from "next/router";
import MeetingService from "services/meeting";

const ENDPOINT = "http://localhost:5000";

export const useMeetingStatusRefresh = (meetingId: string) => {
  const router = useRouter();
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    ENDPOINT,
    { transports: ["websocket"] }
  );

  useEffect(() => {
    socket.emit("joinMeeting", meetingId);

    socket.on("meetingFinished", () => {
      router.reload();
    });

    return () => {
      socket.emit("leaveMeeting", meetingId);
      socket.off("meetingFinished");
    };
  }, [socket, router, meetingId]);

  const finishMeeting = async () => {
    await MeetingService.finish(meetingId);
    socket.emit("finishMeeting", meetingId);
  };

  return { finishMeeting };
};
