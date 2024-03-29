import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@types";
import { fabric } from "fabric";

const ENDPOINT = "http://localhost:5000";

export const useWhiteboardSocket = (whiteboardId: string) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    ENDPOINT,
    { transports: ["websocket"] }
  );
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.emit("joinWhiteboard", whiteboardId);

    socket.on("connected", () => {
      setConnected(true);
    });

    return () => {
      socket.emit("leaveWhiteboard", whiteboardId);
      socket.off("connected");
      socket.off("objectReceived");
    };
  }, [socket, whiteboardId]);

  const sendObject = (object: fabric.Object) => {
    const parsed = object.toJSON(["data", "noEmit"]);
    socket.emit("addObject", whiteboardId, parsed);
  };

  const sendModifiedObject = (object: fabric.Object) => {
    const parsed = object.toJSON ? object.toJSON(["data", "noEmit"]) : object;
    socket.emit("modifyObject", whiteboardId, parsed);
  };

  const sendRemovedObjects = (objects: fabric.Object[]) => {
    socket.emit("removeObjects", whiteboardId, objects);
  };

  const handleObjectReceived = (callback: (object: fabric.Object) => void) => {
    socket.on("objectReceived", callback);
  };

  const handleObjectModified = (callback: (object: fabric.Object) => void) => {
    socket.on("objectModified", callback);
  };

  const handleObjectsRemoved = (
    callback: (objects: Array<fabric.Object>) => void
  ) => {
    socket.on("objectsRemoved", callback);
  };

  return {
    connected,
    handleObjectReceived,
    sendObject,
    sendModifiedObject,
    handleObjectModified,
    sendRemovedObjects,
    handleObjectsRemoved,
  };
};
