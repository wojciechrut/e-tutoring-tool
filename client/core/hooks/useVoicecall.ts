import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@types";
import { useAuth } from "contexts/auth";
import { applySoundProcessing } from "helpers/audio";

const ENDPOINT = "http://localhost:5000";

export const useVoicecall = (meetingId: string, userIds: Array<string>) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    ENDPOINT,
    { transports: ["websocket"] }
  );
  const { user } = useAuth();
  const [connected, setConnected] = useState<boolean>(false);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);

  const getUserMedia = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then((stream) => {
        if (localAudioRef.current) {
          applySoundProcessing(localAudioRef.current);
          localAudioRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.log(err, "audio error"));
  };

  useEffect(() => {
    socket.emit("setup", user!!._id.toString());
    getUserMedia();
    socket.on("connected", () => {
      setConnected(true);
    });

    socket.emit("joinVoicecall", meetingId, user!!._id.toString());

    return () => {
      socket.off("connected");
      socket.emit("leaveVoicecall", meetingId, user!!._id.toString());
    };
  }, [socket, meetingId, user]);

  return { connected, localAudioRef, audioRefs };
};
