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

    //chat
    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("sendMessage", (message) => {
      const { chat } = message;

      socket.to(chat._id.toString()).emit("messageReceived", message);
    });

    //whiteboard
    socket.on("joinWhiteboard", (whiteboardId) => {
      socket.join(whiteboardId);
    });

    socket.on("leaveWhiteboard", (whiteboardId) => {
      socket.leave(whiteboardId);
    });

    socket.on("addObject", (whiteboardId, object) => {
      socket.to(whiteboardId).emit("objectReceived", object);
    });

    socket.on("modifyObject", (whiteboardId, object) => {
      socket.to(whiteboardId).emit("objectModified", object);
    });

    socket.on("removeObjects", (whiteboardId, objects) => {
      socket.to(whiteboardId).emit("objectsRemoved", objects);
    });

    //voicecall
    socket.on("joinVoicecall", (meetingId, userId) => {
      socket.join(meetingId);
      console.log("join voicecall - " + userId);
      socket.to(meetingId).emit("voicecallNewUser", userId);
    });

    socket.on("leaveVoicecall", (meetingId, userId) => {
      socket.leave(meetingId);
      socket.to(meetingId).emit("voicecallUserLeft", userId);
    });

    //meeting status
    socket.on("joinMeeting", (meetingId) => {
      socket.join(`status:${meetingId}`);
    });

    socket.on("leaveMeeting", (meetingId) => {
      socket.leave(`status:${meetingId}`);
    });

    socket.on("finishMeeting", (meetingId) => {
      socket.in(`status:${meetingId}`).emit("meetingFinished");
    });

    socket.off("setup", (userId) => {
      console.log("Socket - user disconnected");
      socket.leave(userId);
    });
  });
};
