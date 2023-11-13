import MiniEmotionChart from "@/components/home/video/MiniEmotionChart";
import RoomButtons from "@/components/room/RoomButtons";
import Video from "@/components/room/Video";
import { AuthContext } from "@/context/AuthContext";
import { calculateTime } from "@/utils/time";
import { emptyEmotionData } from "@/utils/variable";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import MyVideoStream from "@/components/room/MyVideoStream";
import { computeEmotionAverages } from "@/utils/computeEmotionAverages";
import MatchingContainer from "@/components/room/MatchingContainer";
import StartMatchingButton from "@/components/home/StartMatchingButton";
import ReportContainer from "@/components/home/video/ReportContainer";
import InterestContainer from "@/components/room/InterestContainer";
import CallEnded from "@/components/room/CallEnded";
import { formattedDate } from "@/utils/date";

const URL = "https://spicy-hilarious-territory.glitch.me";
const ws = io(URL);

function Home() {
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const { currentUserData } = useContext(AuthContext);
    const { firstname, lastname } = currentUserData;
    const fullname = firstname + " " + lastname;
    const [emotionData, setEmotionData] = useState(emptyEmotionData);
    const [graphLoaded, setGraphLoaded] = useState(false);
    const [roomContainer, setRoomContainer] = useState(false);
    const [matching, setMatching] = useState(true);
    const [myPeer, setMyPeer] = useState(null);
    const [meId, setMeId] = useState();
    const [stream, setStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState(null);
    const [otherName, setOtherName] = useState();
    const [activeCall, setActiveCall] = useState(null);
    const [callEnded, setCallEnded] = useState(false);
    const [emotionResult, setEmotionResult] = useState();
    const [muteSound, setMuteSound] = useState(false);
    const [muteMic, setMuteMic] = useState(false);
    const [hideChart, setHideChart] = useState(true);
    const [hideOwnCam, setHideOwnCam] = useState(false);
    const [choosingInterest, setChoosingInterest] = useState(false);
    const [currentDate, setCurrentDate] = useState(formattedDate);

    useEffect(() => {
        if (!roomContainer) {
            setHideChart(true);
            setMuteMic(false);
            setMuteSound(false);
            setRemoteStreams(null);
            setMatching(true);
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

    const { hours, minutes, seconds, time } = calculateTime(totalSeconds);

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

    useEffect(() => {
        const initializeWebsocket = () => {
            const socket = io(URL);
            return socket;
        };

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
            if (roomContainer) toast.success("Facial Emotion Graph Loaded");
        }
    }, [graphLoaded]);

    useEffect(() => {
        const peer = new Peer(uuid());
        setMyPeer(peer);
        setMeId(peer._id);
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

    const handleMuteMic = () => {
        if (stream) {
            stream
                .getAudioTracks()
                .forEach((track) => (track.enabled = !track.enabled));
            setMuteMic(!muteMic);
        }
    };

    useEffect(() => {
        if (!myPeer) return;
        if (!stream) return;

        // ANSWER CALL
        myPeer.on("call", (call) => {
            setActiveCall(call);
            call.answer(stream);
            call.on("stream", (remoteStream) => {
                setRemoteStreams(remoteStream);
                setActiveCall(call);
                startTimer();
                setMatching(false);
                console.log("Answer: ", call.peer);
            });

            call.on("close", () => {
                endCall();
            });

            myPeer.on("connection", (conn) => {
                conn.on("data", (data) => {
                    setOtherName(data);
                });
                conn.on("open", () => {
                    conn.send(fullname);
                });
            });
        });

        // INITIATE CALL
        ws.on("user-joined", (peerId) => {
            const call = myPeer.call(peerId, stream);
            setActiveCall(call);
            call.on("stream", (remoteStream) => {
                setRemoteStreams(remoteStream);
                setActiveCall(call);
                startTimer();
                setMatching(false);
                console.log("Call: ", peerId);
            });

            call.on("close", () => {
                endCall();
            });
            const conn = myPeer.connect(peerId);
            conn.on("data", (data) => {
                setOtherName(data);
            });
            conn.on("open", () => {
                conn.send(fullname);
            });
        });
    }, [myPeer, stream]);

    const offCam = () => {
        if (stream) {
            const tracks = stream.getTracks();

            tracks.forEach((track) => {
                track.stop();
            });

            setStream(null);
        }
    };

    const endCall = async () => {
        if (activeCall) {
            activeCall.close();
            setActiveCall(null);
        }
        ws.emit("end-call", meId);
        offCam();
        setRemoteStreams({});
        setRoomContainer(false);
        setMatching(false);
        resetTimer();
        console.log(emotionData);
        let report = await computeEmotionAverages(emotionData);
        setEmotionResult(report);
        setCallEnded(true);
        console.log(JSON.stringify(report, null, 2));
    };

    const handleCancel = () => {
        offCam();
        ws.emit("stop-match", meId);
        setRoomContainer(false);
    };

    const sendSignaltoServer = (interest) => {
        StartMedia();
        ws.emit("start-match", { peerId: meId, interest: interest });
        setChoosingInterest(false);
        setRoomContainer(true);
        setEmotionResult();
        setOtherName("");
        setEmotionData(emptyEmotionData);
    };

    const handleChooseInterest = () => {
        setChoosingInterest(!choosingInterest);
    };

    useEffect(() => {
        ws.on("disconnect", () => {
            ws.emit("disconnected", meId);
        });
    }, []);

    return (
        <div className="flex  w-full h-full justify-center items-center ">
            <div
                className={`absolute flex flex-col first-letter:lg:p-10 top-0 left-0 ${
                    roomContainer
                        ? "h-screen w-screen opacity-100 block"
                        : "h-32 w-32 opacity-0 hidden"
                }  z-40 bg-slate-800`}
            >
                <MatchingContainer matching={matching} cancel={handleCancel} />
                <div className="bg-slate-800 relative w-full justify-center h-full lg:px-10  lg:gap-5 lg:pt-6 flex ">
                    <div
                        className={`bg-black/50 h-full flex relative items-center lg:rounded-md overflow-hidden lg:max-w-[73%] lg:w-full w-full duration-300 transition-all ease-linear`}
                    >
                        <h1 className="absolute flex  uppercase pl-4 pb-2 z-30 w-full text-white bottom-0 left-0 h-18 bg-gradient-to-t from-black/50 to-transparent">
                            {otherName}
                        </h1>
                        {remoteStreams?.active === true && (
                            <Video
                                stream={remoteStreams}
                                muted={muteSound}
                                detection={true}
                                setEmotionData={setEmotionData}
                                time={time}
                                setGraphLoaded={setGraphLoaded}
                            />
                        )}
                    </div>
                    <MiniEmotionChart emotions={emotionData} hide={hideChart}>
                    {remoteStreams?.active === true && (
                        <Video
                            stream={remoteStreams}
                            muted={muteSound}
                            detection={false}
                            setEmotionData={setEmotionData}
                            time={time}
                            setGraphLoaded={setGraphLoaded}
                        />)}
                    </MiniEmotionChart>
                    <MyVideoStream
                        hideOwnCam={hideOwnCam}
                        hideChart={hideChart}
                        setHideOwnCam={() => setHideOwnCam((prev) => !prev)}
                    >
                        <Video
                            stream={stream}
                            muted={true}
                            detection={false}
                            setEmotionData={setEmotionData}
                            time={time}
                            setGraphLoaded={setGraphLoaded}
                        />
                    </MyVideoStream>
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
                    handleEndCall={endCall}
                />
            </div>
            <StartMatchingButton onClick={handleChooseInterest} />
            <Toaster />
            {callEnded && (
                <CallEnded home={() => setCallEnded(false)}>
                    {emotionResult && (
                        <ReportContainer
                            emotionResult={emotionResult}
                            participant={otherName}
                            date={currentDate}
                            home={() => setCallEnded(false)}
                        />
                    )}
                </CallEnded>
            )}

            {choosingInterest && (
                <InterestContainer
                    interestBtn={(value) => sendSignaltoServer(value)}
                    back={handleChooseInterest}
                />
            )}
        </div>
    );
}

export default Home;
