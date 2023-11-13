import { AuthContext } from "@/context/AuthContext";
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

const MyVideoStream = ({ hideOwnCam, hideChart, setHideOwnCam, children}) => {
    const { currentUserData } = useContext(AuthContext);
    const { firstname, lastname } = currentUserData;

    return (
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
                className={`bg-black/50 mx-auto lg:h-[150px] lg:w-[240px] w-40 h-56 right-2 ${
                    hideChart ? "" : "lg:flex hidden"
                } rounded-sm absolute lg:static items-center lg:rounded-tl-md lg:rounded-tr-md duration-500 transition-all ease-linear overflow-hidden ${
                    hideOwnCam ? "hidden opacity-0" : "lg:flex opacity-100"
                } `}
            >
                {children}
            </div>
            <div
                className={`lg:flex hidden ${
                    hideOwnCam
                        ? "bg-white font-semibold text-slate-800 rounded-md"
                        : "rounded-bl-md rounded-br-md text-white " +
                          (hideChart ? "bg-black/50" : "bg-black/70")
                }   px-2 py-1 items-center duration-200 transition-all ease-in-out justify-center w-full h-fit`}
            >
                <div className="flex px-1 w-full h-full">
                    <h1 className="uppercase text-[0.7rem] ">
                        {firstname + " " + lastname}
                        <span className="font-light text-xs">{"(You)"}</span>
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
                        onClick={setHideOwnCam}
                    >
                        <FontAwesomeIcon
                            className="cursor-pointer animate-pulse"
                            icon={hideOwnCam ? faMaximize : faMinimize}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyVideoStream;
