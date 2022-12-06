import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  MessageSendResponseBody as Message,
  ServerToClientEvents,
} from "@types";

const ENDPOINT = "http://localhost:5000";

export const useChatSocket = (chatId: string) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    ENDPOINT,
    { transports: ["websocket"] }
  );
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.on("connected", () => {
      setConnected(true);
    });

    socket.emit("joinChat", chatId);

    return () => {
      socket.off("connected");
      socket.off("messageReceived");
    };
  }, [socket, chatId]);

  const sendMessage = (message: Message) => {
    socket.emit("sendMessage", message);
  };

  const handleMessageReceived = (callback: (message: Message) => void) => {
    socket.on("messageReceived", callback);
  };

  return { connected, sendMessage, handleMessageReceived };
};
