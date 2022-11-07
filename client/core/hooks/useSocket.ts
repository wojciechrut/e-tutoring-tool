import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@types";

const ENDPOINT = "http://localhost:5000";

export const useSocket = () => {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(ENDPOINT);

    socket.on("connected", (message) => {
      setConnected(true);
      console.log(message + "- cli");
    });
  }, []);

  return { connected };
};
