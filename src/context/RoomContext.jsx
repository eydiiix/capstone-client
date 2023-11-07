import {
    createContext,
    useEffect,
    useState,
} from "react";
import  { io } from "socket.io-client";
import Peer from "peerjs";
import { v4 as uiid } from "uuid";

export const WS = "https://noon-golden-faucet.glitch.me";

export const RoomContext = createContext();

const ws = io(WS)

export const RoomProvider = ({ children }) => {
    const [me, setMe] = useState();
    const [stream, setStream] = useState();
    const [otherStream, SetOtherStream ]= useState(null);

    useEffect(() => {
        ws.on("disconnect", () => {
            console.log("Socket.io connection is closed.");
        });
        
        ws.on("connect_error", (error) => {
            console.log("Socket.io connection error:", error.message);
        });
    }, [])

   

    const closeCall = (peerId) => {
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
            setStream(null);
        }
        const call = me.call(peerId, stream);
        if (call) {
            call.close();
        }
    };
    const toggleMatching =  () => {
        getMedia()
    };
    var getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
    const getMedia = () => {
        if(stream === null || stream === undefined){
                try {
                    getUserMedia({ video:true, audio: true })
                    .then((stream) => {
                        setStream(stream);
                    });
                } catch (error) {
                    console.log(error.message);
                }
            
        }
    };

    useEffect(() => {
        getMedia()
    }, [])

    useEffect(() => {
        const meId = uiid();
        const peer = new Peer(meId);
        setMe(peer);
    }, []);

    useEffect(() => {
        if (!me) return;
        if (!stream) return;

        ws.on("user-joined", ({ peerId }) => {
            const call = me.call(peerId, stream);
            call.on("stream", (peerStream) => {
                SetOtherStream(peerStream);
                startT
            });
        });

        me.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (peerStream) => {
                SetOtherStream(peerStream);
            });
        });
    }, [me, stream]);

    
    if (me) console.log("myPeer:", me?._id );

    return (
        <RoomContext.Provider
            value={{ ws, me, stream, otherStream, toggleMatching, endCall }}
        >
            {children}
        </RoomContext.Provider>
    );
};
