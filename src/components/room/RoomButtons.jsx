import { toggleFullScreen } from "@/utils/screen";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
    faCompress,
    faExpand,
    faMagnifyingGlassChart,
    faMicrophone,
    faMicrophoneSlash,
    faPhone,
    faVolumeHigh,
    faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";

function RoomButtons({
    hours,
    minutes,
    seconds,
    muteSound,
    muteMic,
    handleMuteSound,
    handleMuteMic,
    handleHideChart,
    handleEndCall,
}) {

    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullScreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullScreenChange
            );
        };
    }, []);

    return (
        <div className="bg-transparent lg:px-20 px-5 lg:static absolute bottom-4 right-0  justify-center items-center gap-3 flex w-full lg:h-24 h-14">
            <div className="flex gap-4  rounded-l-full rounded-r-full bg-black/50 items-center p-2 justify-center">
                <div className="w-fit lg:flex md:static md:flex hidden absolute bottom-100 lg:static items-center text-sm justify-center h-8 bg-black/50 lg:p-4 rounded-l-full rounded-r-full text-white overflow-hidden">
                    <h1 className="lg:w-32 w-20 text-center">
                        <FontAwesomeIcon className="pr-2 w-4" icon={faClock} />
                        {`${hours === 0 ? "" : hours + ":"}${
                            minutes < 10 ? "0" + minutes + ":" : minutes + ":"
                        }${seconds < 10 ? "0" + seconds : seconds}`}
                    </h1>
                </div>
                <button
                    className="bg-slate-400 h-8 w-8 rounded-full text-slate-900"
                    onClick={handleMuteSound}
                >
                    <FontAwesomeIcon
                        className="w-4"
                        icon={muteSound ? faVolumeMute : faVolumeHigh}
                    />
                </button>

                <button
                    className="bg-slate-400 h-8 w-8 rounded-l-full rounded-r-full text-slate-900"
                    onClick={handleMuteMic}
                >
                    <FontAwesomeIcon
                        className="w-4"
                        icon={muteMic ? faMicrophoneSlash : faMicrophone}
                    />
                </button>

                <button
                    className="bg-slate-400 h-8 w-8 rounded-l-full rounded-r-full text-slate-900"
                    onClick={handleHideChart}
                >
                    <FontAwesomeIcon
                        className="w-4"
                        icon={faMagnifyingGlassChart}
                    />
                </button>
                <button
                    className="bg-slate-400 h-8 w-8 rounded-l-full hidden lg:block rounded-r-full text-slate-900"
                    onClick={() => toggleFullScreen(isFullScreen)}
                >
                    <FontAwesomeIcon
                        className="w-4"
                        icon={isFullScreen ? faCompress : faExpand}
                    />
                </button>
                <button
                id="hangUp"
                    className="bg-red-600 h-8 w-12 flex items-center justify-center rounded-l-full rounded-r-full text-white"
                    onClick={handleEndCall}
                >
                    <FontAwesomeIcon
                        className=" rotate-[135deg]"
                        icon={faPhone}
                    />
                </button>
            </div>
        </div>
    );
}

export default RoomButtons;
