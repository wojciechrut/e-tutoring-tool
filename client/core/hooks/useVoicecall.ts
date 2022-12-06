import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@types";
import { useAuth } from "contexts/auth";

const ENDPOINT = "http://localhost:5000";

export const useVoicecall = (meetingId: string) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    ENDPOINT,
    { transports: ["websocket"] }
  );
  const { user } = useAuth();
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.emit("setup", user!!._id.toString());

    socket.on("connected", () => {
      setConnected(true);
    });

    socket.emit("joinVoicecall", meetingId);

    return () => {
      socket.off("connected");
      socket.emit("leaveVoicecall", meetingId);
    };
  }, [socket, meetingId]);

  return { connected };
};
