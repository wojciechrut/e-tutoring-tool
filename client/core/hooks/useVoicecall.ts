import { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@types";
import { useAuth } from "contexts/auth";
import { applySoundProcessing } from "helpers/audio";
import Peer from "peerjs";

const ENDPOINT = "http://localhost:5000";

export const useVoicecall = (meetingId: string, userIds: Array<string>) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    ENDPOINT,
    { transports: ["websocket"] }
  );
  const { user } = useAuth();
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);
  const [myPeer, setMyPeer] = useState<Peer>();

  const userId = useMemo(() => user!!._id.toString(), [user]);

  const getUserMedia = () => {
    return window.navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then((stream) => stream);
  };

  useEffect(() => {
    //nextjs-peerjs weird bug
    const PeerConstructor = require("peerjs").default;

    console.log("con peer obj");
    const peer: Peer = new PeerConstructor(userId, {
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:0.peerjs.com:3478",
            username: "peerjs",
            credential: "peerjs",
          },
        ],
        sdpSemantics: "unified-plan",
        iceTransportPolicy: "relay",
      },
    });

    setMyPeer(peer);

    return () => {
      console.log("dc peer obj");
      peer.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (!myPeer) {
      return;
    }

    const setupAudio = (
      callerId: string,
      peer: Peer,
      myStream: MediaStream
    ) => {
      const callerIndex = userIds.indexOf(callerId);
      const callerAudio = audioRefs.current[callerIndex];
      if (!callerAudio) return;
      callerAudio.addEventListener("loadedmetadata", () => {
        callerAudio.play();
      });

      const call = peer.call(callerId, myStream, { metadata: userId });
      call.on("stream", (callerStream) => {
        console.log("stream", callerStream);
        applySoundProcessing(callerAudio);
        callerAudio.srcObject = callerStream;
      });
      call.on("close", () => {
        console.log("call close");
        callerAudio.srcObject = null;
      });
    };

    getUserMedia()
      .then((myStream) => {
        myPeer.on("open", (id: string) => {
          console.log("peer open - " + id);
          socket.on("voicecallNewUser", (callerId) => {
            console.log("new user socket listener");
            setupAudio(callerId, myPeer, myStream);
          });
          socket.emit("joinVoicecall", meetingId, id);
        });

        myPeer.on("call", (call) => {
          const callerId: string = call.metadata;
          console.log("call " + callerId);
          setupAudio(callerId, myPeer, myStream);
        });
      })
      .catch(console.log);

    myPeer.on("disconnected", () => {
      socket.off("voicecallNewUser");
    });

    return () => {
      socket.emit("leaveVoicecall", meetingId, userId);
      socket.off("voicecallNewUser");
      myPeer.disconnect();
    };
  }, [myPeer, socket, meetingId, userId, userIds]);

  return { audioRefs };
};
