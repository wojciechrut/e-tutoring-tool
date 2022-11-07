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
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected");

    socket.emit("connected", "Connected to socket");
    socket.on("test", (message) => {
      console.log("test socket send: " + message);
    });
  });
};
