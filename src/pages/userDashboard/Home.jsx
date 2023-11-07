import EmotionChart from "@/components/home/video/EmotionChart";
import MiniEmotionChart from "@/components/home/video/MiniEmotionChart";
import RoomButtons from "@/components/room/RoomButtons";
import Video from "@/components/room/Video";
import { AuthContext } from "@/context/AuthContext";
import { calculateTime } from "@/utils/time";
import { emptyEmotionData } from "@/utils/variable";
import {
    faMaximize,
    faMinimize,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import Matching from "@/components/loader/matching";

const URL = "https://spicy-hilarious-territory.glitch.me";
// const URL = "https://abstracted-soapy-stream.glitch.me";
const ws = io(URL);

function Home() {
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const { currentUserData } = useContext(AuthContext);
    const { firstname, lastname, userId, interest } = currentUserData;
    const [emotionData, setEmotionData] = useState(emptyEmotionData);
    const [graphLoaded, setGraphLoaded] = useState(false);

    const [happy, setHappy] = useState();
    const [sad, setSad] = useState();
    const [neutral, setNeutral] = useState();
    const [angry, setAngry] = useState();

    const [roomContainer, setRoomContainer] = useState(false);
    const [matching, setMatching] = useState(false);

    const [myPeer, setMyPeer] = useState(null);
    const [stream, setStream] = useState(null);
    const [otherStream, setOtherStream] = useState(null);

    useEffect(() => {
        const initializeWebsocket = () => {
            const socket = io(URL);
            return socket;
        }

        const socket = initializeWebsocket();
        socket.on("error", (error) => {
            console.error("WebSocket connection error:", error);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (graphLoaded) {
            toast.success("Facial Emotion Graph Loaded");
        }
    }, [graphLoaded]);

    useEffect(() => {
        const peer = new Peer(uuid());
        setMyPeer(peer);
    }, []);

    const StartMedia = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((userMediaStream) => {
                setStream(userMediaStream);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        ws.on("end-call", () => {
            closeCall()
        });
    }, [ws])

    useEffect(() => {
        if (!myPeer) return;
        if (!stream) return;

        // ANSWER CALL
        myPeer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (peerStream) => {
                setOtherStream(peerStream);
                startTimer();
                setMatching(false);
            });

            console.log("Answered");
        });

        // INITIATE CALL
        ws.on("user-connected", (peerId) => {
            console.log("User connected: ", peerId);
            const call = myPeer.call(peerId, stream);

            call.on("stream", (peerStream) => {
                setOtherStream(peerStream);
                startTimer();
                setMatching(false);
                console.log("Call: ", peerId);
            });

            call.on("close", () => {
                setRoomContainer(false);
                setOtherStream(null);
                console.log("Close");
            });
        });
    }, [myPeer, stream]);

    // WEBSOCKET CONNECTIONS

    const startCallMatching = () => {
        StartMedia();
        ws.emit("join-room", { peerId: myPeer._id, roomId: 112345 });
        setRoomContainer(true);
        setMatching(true);
    };

    const handleEndCall = () => {
        ws.emit("call-ended");
        closeCall();
    };

    const closeCall = () => {
        if (stream) {
            const tracks = stream.getTracks();

            tracks.forEach((track) => {
                track.stop();
            });

            setStream(null);
        }
        setRoomContainer(false);
        setMatching(false);
        resetTimer();
    };

    // ===================================================================================== //

    const [muteSound, setMuteSound] = useState(false);
    const [muteMic, setMuteMic] = useState(false);
    const [hideChart, setHideChart] = useState(true);
    const [hideOwnCam, setHideOwnCam] = useState(false);

    useEffect(() => {
        setMuteMic(false);
        setMuteSound(false);
    }, [roomContainer]);

    const handleMuteMic = () => {
        setMuteMic((status) => !status);
    };

    useEffect(() => {
        if (!roomContainer) {
            setHideChart(true);
            setMuteMic(false);
            setMuteSound(false);
            if (isTimeRunning) resetTimer();
        }
    }, [roomContainer]);

    const startTimer = () => {
        setIsTimeRunning(true);
    };

    const resetTimer = () => {
        setTotalSeconds(0);
        setIsTimeRunning(false);
    };

    const { hours, minutes, seconds } = calculateTime(totalSeconds);

    useEffect(() => {
        let timer;
        if (isTimeRunning) {
            timer = setInterval(() => {
                setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isTimeRunning]);

    var formattedTime = `${hours === 0 ? "" : hours + ":"}${
        minutes === 0 ? "" : minutes < 10 ? "0" + minutes + ":" : minutes + ":"
    }${seconds < 10 ? "0" + seconds : seconds}${
        hours !== 0 ? "hr" : minutes !== 0 ? "min" : "s"
    }`;

    return (
        <div className="flex  w-full h-full justify-center items-center ">
            <div
                className={`absolute flex flex-col first-letter:lg:p-10 top-0 left-0 ${
                    roomContainer
                        ? "h-screen w-screen opacity-100 block"
                        : "h-32 w-32 opacity-0 hidden"
                }  z-40 bg-slate-800`}
            >
                <Toaster />
                <div
                    className={`w-screen ${
                        matching
                            ? "opacity-100 z-[60] flex"
                            : "opacity-0 z-0 hidden"
                    } duration-200 transition-all ease-linear flex-col items-center justify-center p-10 bg-gradient-to-br from-primary to-secondary h-screen absolute  top-0 left-0`}
                >
                    <Matching />
                    <h1 className="absolute top-14 text-lg font-medium text-white">
                        Matching...
                    </h1>
                    <button
                        className="absolute bottom-12 text-lg border px-4 py-1 rounded-l-full cursor-pointer rounded-r-full text-white z-10"
                        onClick={handleEndCall}
                    >
                        Cancel
                    </button>
                </div>
                <div className="bg-slate-800 relative w-full justify-center h-full lg:px-10  lg:gap-5 lg:pt-6 flex ">
                    <div
                        className={`bg-black/50 h-full flex relative items-center lg:rounded-md overflow-hidden lg:max-w-[73%] lg:w-full w-full duration-300 transition-all ease-linear`}
                    >
                        <h1 className="absolute flex uppercase pl-4 pb-2 w-full text-white bottom-0 left-0 h-18 bg-gradient-to-t from-black/50 to-transparent">
                            {/* {callId} */}
                        </h1>
                        {otherStream != null && (
                            <Video
                                stream={otherStream}
                                muted={muteSound}
                                detection={true}
                                setHappyProbability={setHappy}
                                setSadProbability={setSad}
                                setNeutralProbability={setNeutral}
                                setAngryProbability={setAngry}
                                setEmotionData={setEmotionData}
                                time={formattedTime}
                                setGraphLoaded={setGraphLoaded}
                            />
                        )}
                    </div>
                    <MiniEmotionChart emotions={emotionData} hide={hideChart} />
                    <div
                        className={`flex lg:absolute ${
                            hideOwnCam
                                ? hideChart
                                    ? "bottom-8 right-4"
                                    : "bottom-0 mr-10 right-0"
                                : hideChart
                                ? "bottom-6 right-4"
                                : "bottom-0 mr-10 right-0"
                        } duration-500 transition-all ease-in-out flex-col`}
                    >
                        <div
                            className={`bg-black/50 mx-auto lg:h-[150px] lg:w-[240px] w-40 h-56 right-2 ${hideChart ? "" : "lg:flex hidden"} rounded-sm absolute lg:static items-center lg:rounded-tl-md lg:rounded-tr-md duration-500 transition-all ease-linear overflow-hidden ${
                                hideOwnCam
                                    ? "hidden opacity-0"
                                    : "lg:flex opacity-100"
                            } `}
                        >
                            <Video
                                stream={stream}
                                muted={true}
                                detection={false}
                                setHappyProbability={setHappy}
                                setSadProbability={setSad}
                                setNeutralProbability={setNeutral}
                                setAngryProbability={setAngry}
                                setEmotionData={setEmotionData}
                                time={formattedTime}
                                setGraphLoaded={setGraphLoaded}
                            />
                        </div>
                        <div
                            className={`lg:flex hidden ${
                                hideOwnCam
                                    ? "bg-white font-semibold text-slate-800 rounded-md"
                                    : "rounded-bl-md rounded-br-md text-white " +
                                      (hideChart
                                          ? "bg-black/50"
                                          : "bg-black/70")
                            }   px-2 py-1 items-center duration-200 transition-all ease-in-out justify-center w-full h-fit`}
                        >
                            <div className="flex px-1 w-full h-full">
                                <h1 className="uppercase text-[0.7rem] ">
                                    {firstname + " " + lastname}
                                    <span className="font-light text-xs">
                                        {"(You)"}
                                    </span>
                                </h1>
                            </div>
                            <div className="group ml-auto flex relative">
                                <span
                                    className={`group-hover:opacity-100 transition-opacity ${
                                        hideOwnCam
                                            ? "bg-black/20 text-white"
                                            : "bg-white text-slate-700"
                                    } font-semibold text-xs rounded-l-full rounded-r-full absolute w-24 flex justify-center mt-5 translate-x-[-50px] left-0 px-2 py-1 translate-y-full opacity-0`}
                                >
                                    {!hideOwnCam ? "Hide Video" : "Show Video"}
                                </span>
                                <button
                                    className={`flex items-center relative justify-center h-6 w-10 ${
                                        hideOwnCam
                                            ? "bg-white text-slate-800 rounded-full"
                                            : "bg-transparent text-white"
                                    } duration-200 transition-all ease-in-out`}
                                    onClick={() =>
                                        setHideOwnCam((prev) => !prev)
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="cursor-pointer animate-pulse"
                                        icon={
                                            hideOwnCam ? faMaximize : faMinimize
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <RoomButtons
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                    muteSound={muteSound}
                    muteMic={muteMic}
                    handleMuteSound={() => setMuteSound((status) => !status)}
                    handleMuteMic={handleMuteMic}
                    handleHideChart={() => setHideChart((status) => !status)}
                    handleEndCall={handleEndCall}
                />
            </div>
            <button
                onClick={startCallMatching}
                className=" flex items-center lg:flex-row flex-col-reverse justify-between py-6 lg:px-10 px-4 bg-gradient-to-br from-primary to-secondary rounded-3xl lg:rounded-xl mb-24 lg:mb-0 text-white font-bold  lg:h-16 h-32 w-60 lg:w-96"
            >
                <span className="lg:pr-5 justify-center flex w-full">START VIDEO CALL </span>
                <FontAwesomeIcon
                    className="lg:pl-10 h-8 w-8 lg:border-l-2  border-white"
                    icon={faVideo}
                />
            </button>
        </div>
    );
}

export default Home;
