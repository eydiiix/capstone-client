import {
    faFaceFrown,
    faFaceLaugh,
    faFaceRollingEyes,
    faFaceSadCry,
    faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function CallEnded({ home, children }) {
    const [selectedRating, setSelectedRating] = useState(null);
    const [viewReport, setViewReport] = useState(false);

    const ratingScale = [
        { interpretation: "Very Bad", emoji: faFaceSadCry },
        { interpretation: "Bad", emoji: faFaceFrown },
        { interpretation: "Average", emoji: faFaceRollingEyes },
        { interpretation: "Good", emoji: faFaceSmile },
        { interpretation: "Very Good", emoji: faFaceLaugh },
    ];

    const handleRatingSelection = (value) => {
        setSelectedRating(value);
    };

    const endCallInterface = (
        <div className="bg-slate-800  p-4 lg:p-2 pt-20 text-white/80 flex flex-col items-center h-screen w-screen md:h-fit lg:w-[30%] md:w-[60%]">
            <h1 className="text-2xl pb-5 font-extralight tracking-wider text-start w-full">
                You left the meeting
            </h1>
            <div className="grid w-full gap-3 grid-cols-3 pb-8">
                <button
                    onClick={home}
                    className="border-2 text-sm rounded-md border-slate-700"
                >
                    Home
                </button>
                <button
                    className="bg-slate-700 text-sm rounded-md h-10 col-span-2"
                    onClick={() => setViewReport(true)}
                >
                    View emotion graph report
                </button>
            </div>
            <div className="h-40 flex flex-col rounded-md py-5 w-full bg-slate-900">
                <p className="text-[.85rem] px-5 w-full text-start">
                    How was the quality of the call?
                </p>
                <div
                    className={`flex flex-col w-9/12 py-3 items-between justify-between`}
                >
                    <div className="flex px-2  w-full items-between justify-between">
                        {ratingScale.map((rating, i) => (
                            <div
                                role="img"
                                key={i}
                                onClick={() =>
                                    handleRatingSelection(rating.interpretation)
                                }
                                className={`cursor-pointer h-12  ${
                                    selectedRating === rating.interpretation
                                        ? "border border-slate-600 bg-white/5"
                                        : "bg-transparent"
                                }  w-12 rounded-full flex items-center justify-center  text-2xl text-yellow-300`}
                            >
                                <FontAwesomeIcon icon={rating.emoji} />
                            </div>
                        ))}
                    </div>
                    <div className="px-5 pt-1 text-slate-400 flex text-xs justify-between w-full">
                        <p>Very bad</p>
                        <p>Very good</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-800 z-30 top-0 left-0 flex items-center justify-center h-screen w-screen backdrop-blur-sm absolute ">
            {viewReport ? children : endCallInterface}
        </div>
    );
}

export default CallEnded;
