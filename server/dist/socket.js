"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const socket_io_1 = require("socket.io");
const setupSocket = (server) => {
    const io = new socket_io_1.Server(server, {
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
        socket.on("addObject", (whiteboardId, object) => {
            socket.to(whiteboardId).emit("objectReceived", object);
        });
        socket.on("modifyObject", (whiteboardId, object) => {
            socket.to(whiteboardId).emit("objectModified", object);
        });
        socket.on("removeObjects", (whiteboardId, objects) => {
            socket.to(whiteboardId).emit("objectsRemoved", objects);
        });
        socket.on("joinVoicecall", (meetingId, userId) => {
            socket.join(meetingId);
            socket.to(meetingId).emit("voicecallNewUser", userId);
        });
        socket.on("leaveVoicecall", (meetingId, userId) => {
            socket.leave(meetingId);
            socket.to(meetingId).emit("voicecallUserLeft", userId);
        });
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
exports.setupSocket = setupSocket;
