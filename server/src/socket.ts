import { Server } from "socket.io";
import * as http from "http";
import { ClientToServerEvents, ServerToClientEvents } from "./@types";

interface InterServerEvents {}

interface SocketData {
  name: string;
  age: number;
}

export const setupSocket = (server: http.Server) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    pingTimeout: 60000,
    cors: {
      origin: ["http://localhost:5000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userId) => {
      socket.join(userId);
      socket.emit("connected");
    });

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("sendMessage", (message) => {
      const { users } = message.chat;

      users.forEach((user) => {
        if (!(user._id === message.sender._id)) {
          socket.in(user._id.toString()).emit("messageReceived", message);
        }
      });
    });

    socket.off("setup", (userId) => {
      console.log("Socket - user disconnected");
      socket.leave(userId);
    });
  });
};