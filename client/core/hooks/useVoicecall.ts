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
      callerAudio.addEventListener("loadedmetadata", () => {
        callerAudio.play().then(() => {});
      });
    };

    const call = (callerId: string, myStream: MediaStream) => {
      setTimeout(() => {
        const call = myPeer.call(callerId, myStream, { metadata: userId });
        call.on("stream", (callerStream) => {
          console.log("call on stream");
          setupAudioStream(callerId, callerStream);
        });

        call.on("close", () => {
          console.log("call on close");
        });
      }, 1000);
    };

    getUserMedia()
      .then((myStream) => {
        myPeer.on("open", () => {
          myPeer.on("call", (call) => {
            const callerId: string = call.metadata;
            console.log("on call");
            call.on("stream", (stream) => {
              console.log("got called with stream - " + stream.id);
              setupAudioStream(callerId, stream);
            });
            call.answer(myStream);
          });
          socket.emit("joinVoicecall", meetingId, userId);

          socket.on("voicecallNewUser", (callerId) => {
            console.log("new user = " + callerId);
            console.log("calling with stream - " + myStream.id);
            call(callerId, myStream);
          });
        });
      })
      .catch(console.log);

    myPeer.on("disconnected", () => {
      socket.off("voicecallNewUser");
    });

    return () => {
      socket.emit("leaveVoicecall", meetingId, userId);
      socket.off("voicecallNewUser");
    };
  }, [myPeer, meetingId, userId, userIds]);

  return { audioRefs };
};
