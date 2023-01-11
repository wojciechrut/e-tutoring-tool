import { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@types";
import { useAuth } from "contexts/auth";
import Peer from "peerjs";
import { applySoundProcessing } from "helpers/audio";

const ENDPOINT = "http://localhost:5000";
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  ENDPOINT,
  { transports: ["websocket"] }
);

export const useVoicecall = (meetingId: string, userIds: Array<string>) => {
  const { user } = useAuth();
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);
  const [myPeer, setMyPeer] = useState<Peer>();
  const [connected, setConnected] = useState<Array<boolean>>([]);

  const userId = useMemo(() => user!!._id.toString(), [user]);

  const getUserMedia = () => {
    return window.navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
        //@ts-ignore
        noiseSuppression: true,
      })
      .then((stream) => stream);
  };

  const setUserConnected = (userId: string, value: boolean) => {
    const callerIndex = userIds.indexOf(userId);
    setConnected((prev) => {
      const newConnected = [...prev];
      newConnected[callerIndex] = value;
      return newConnected;
    });
  };

  useEffect(() => {
    const PeerConstructor = require("peerjs").default;
    const peer: Peer = new PeerConstructor(userId, {
      secure: false,
      iceServers: [
        {
          urls: "stun:relay.metered.ca:80",
        },
        {
          urls: "turn:relay.metered.ca:80",
          username: "423881fae526653378ea758c",
          credential: "ETvrslw6OSwm6vea",
        },
        {
          urls: "turn:relay.metered.ca:443",
          username: "423881fae526653378ea758c",
          credential: "ETvrslw6OSwm6vea",
        },
        {
          urls: "turn:relay.metered.ca:443?transport=tcp",
          username: "423881fae526653378ea758c",
          credential: "ETvrslw6OSwm6vea",
        },
      ],
    });
    setMyPeer(peer);

    return () => {
      peer.disconnect();
      peer.destroy();
    };
  }, [userId]);

  useEffect(() => {
    if (!myPeer) return;

    const setupAudioStream = (callerId: string, callerStream: MediaStream) => {
      const callerIndex = userIds.indexOf(callerId);
      const callerAudio = audioRefs.current[callerIndex];
      if (!callerAudio) return;
      callerAudio.srcObject = callerStream;
      applySoundProcessing(callerAudio);
      setUserConnected(callerId, true);
      callerAudio.addEventListener("loadedmetadata", () => {
        callerAudio.play().then(() => {});
      });
    };

    const call = (callerId: string, myStream: MediaStream) => {
      setTimeout(() => {
        const call = myPeer.call(callerId, myStream, { metadata: userId });
        call.on("stream", (callerStream) => {
          setupAudioStream(callerId, callerStream);
        });

        call.on("close", () => {});
      }, 1000);
    };

    getUserMedia()
      .then((myStream) => {
        myPeer.on("open", () => {
          myPeer.on("call", (call) => {
            const callerId: string = call.metadata;
            call.on("stream", (stream) => {
              setupAudioStream(callerId, stream);
            });
            call.answer(myStream);
          });
          socket.emit("joinVoicecall", meetingId, userId);

          socket.on("voicecallNewUser", (callerId) => {
            call(callerId, myStream);
          });

          socket.on("voicecallUserLeft", (userId) => {
            setUserConnected(userId, false);
          });
        });
      })
      .catch();

    myPeer.on("disconnected", () => {
      socket.off("voicecallNewUser");
    });

    return () => {
      socket.emit("leaveVoicecall", meetingId, userId);
      socket.off("voicecallNewUser");
      socket.off("voicecallUserLeft");
    };
  }, [myPeer]);

  return { audioRefs, connected };
};
