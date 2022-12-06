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
      const { chat } = message;

      socket.to(chat._id.toString()).emit("messageReceived", message);
    });

    socket.on("joinWhiteboard", (whiteboardId) => {
      socket.join(whiteboardId);
    });

    socket.on("leaveWhiteboard", (whiteboardId) => {
      socket.leave(whiteboardId);
    });

    socket.on("joinVoicecall", (meetingId) => {
      socket.join(meetingId);
    });

    socket.on("leaveVoicecall", (meetingId) => {
      socket.leave(meetingId);
    });

    socket.on("addObject", (whiteboardId, object) => {
      console.log("object added ");
      socket.to(whiteboardId).emit("objectReceived", object);
    });

    socket.off("setup", (userId) => {
      console.log("Socket - user disconnected");
      socket.leave(userId);
    });
  });
};
