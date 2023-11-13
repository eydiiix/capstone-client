import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale, faMale, faMars } from "@fortawesome/free-solid-svg-icons";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("customColorSet", [
    "green",
    "#990000",
    "yellow",
    "#000099",
]);

function ReportContainer({ emotionResult, home, participant, date}) {

    const {
        startTime,
        endTime,
        detectionDuration,
        noDetectionDuration,
        emotionDetectedDuration,
        NDT_TS,
        WEDD_TS,
        emotionAve,
    } = emotionResult;

    const { happy, sad, neutral, angry } = emotionAve;

    const highestEmotion = (() => {
        let maxScore = -1;
        let emotion = "";

        if (happy > maxScore) {
            maxScore = happy;
            emotion = "Happy";
        }

        if (sad > maxScore) {
            maxScore = sad;
            emotion = "Sad";
        }

        if (neutral > maxScore) {
            maxScore = neutral;
            emotion = "Neutral";
        }

        if (angry > maxScore) {
            emotion = "Angry";
        }

        return emotion;
    })();

    const options = {
        animationEnabled: true,
        colorSet: "customColorSet",
        height: 300,
        backgroundColor: "transparent",
        axisY: {
            fontColor: "white",
            lineColor: "transparent",
            suffix: "%",
            maximum: 100,
            labelFontFamily: "Poppins",
            labelFontColor: "white",
        },
        axisX: {
            lineThickness: 4,
            tickThickness: 3,
            tickColor: "white",
            lineColor: "white",
            labelFontFamily: "Poppins",
            labelFontColor: "white",
        },

        data: [
            {
                type: "column",
                dataPoints: [
                    { label: "Neutral", y: neutral },
                    { label: "Angry", y: angry },
                    { label: "Happy", y: happy },
                    { label: "Sad", y: sad },
                ],
            },
        ],
    };
    const options2 = {
        animationEnabled: true,
        backgroundColor: "transparent",
        theme: "dark2",
        height: 250,
        subtitles: [
            {
                text: `${detectionDuration}`,
                verticalAlign: "center",
                fontSize: 24,
                dockInsidePlotArea: true,
            },
        ],
        data: [
            {
                type: "doughnut",
                indexLabel: "{time} ",
                dataPoints: [
                    {
                        name: "Face Detected",
                        y: WEDD_TS,
                        time: emotionDetectedDuration,
                    },
                    {
                        name: "No Face Detected",
                        y: NDT_TS,
                        time: noDetectionDuration,
                    },
                ],
            },
        ],
    };

    

    return (
        <div className="h-full lg:flex-row flex-col lg:p-4 p-2 gap-1 overflow-scroll lg:overflow-hidden flex w-full">
            <div className="flex flex-col gap-1 content-between justify-between w-full h-full">
                <div className="bg-slate-800 flex lg:flex-row flex-col gap-1 text-white/80 lg:h-[40%] h-fit rounded-md w-full">
                    <div className="lg:w-2/4 w-full bg-slate-900 rounded-md px-6 py-6">
                        <h1 className="text-lg w-full underline underline-offset-2  font-semibold pb-4">
                            Emotion Detection Report
                        </h1>
                        <p className="text-white/60 text-sm lg:text-md lg:tracking-wide">
                            <span className="text-white/90 ">Date: </span>
                            {date}
                        </p>
                        <p className="text-white/60 capitalize text-sm lg:text-md lg:tracking-wide pt-2">
                            <span className="text-white/80 font-normal">
                                Participant:{" "}
                            </span>
                            {participant}
                        </p>
                        <p className="text-sm pt-2">
                            Highest Emotion:{" "}
                            <span
                                className={`text-green-500 capitalize font-semibold`}
                            >
                                {highestEmotion}
                            </span>
                        </p>
                    </div>
                    <div className="lg:w-2/4 w-full rounded-md p-6 bg-slate-900 h-full">
                        <h1 className="text-lg w-full underline underline-offset-2  font-semibold pb-4">
                            Emotion Overview
                        </h1>
                        <div className="w-full grid gap-1 grid-cols-2">
                            <h1 className="text-sm py-1 col-span-2 font-semibold">
                                Average Emotion Scores
                            </h1>
                            <p className="text-[.8rem] font-semibold text-green-500">
                                Neutral: {neutral}%
                            </p>
                            <p className="text-[.8rem] font-semibold text-yellow-500">
                                Happy: {happy}%
                            </p>
                            <p className="text-[.8rem] font-semibold text-blue-600">
                                Sad: {sad}%
                            </p>
                            <p className="text-[.8rem] font-semibold text-red-500">
                                Angry: {angry}%
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-2/4 w-full rounded-md p-6 bg-slate-900 h-full">
                        <h1 className="text-lg w-full underline underline-offset-2  font-semibold pb-4">
                            Call Time
                        </h1>

                        <h1 className="text-sm py-1 col-span-2">Start Time: {startTime}</h1>
                        <h1 className="text-sm py-1 col-span-2">End Time: {endTime}</h1>
                    </div>
                </div>
                <div className="bg-slate-800 h-full w-full grid grid-cols-3 gap-1 ">
                    <div className="flex bg-slate-900 flex-col p-4 lg:py-7 lg:px-6 rounded-md w-full lg:col-span-2 col-span-3">
                        <h1 className="text-white/80 underline underline-offset-2  text-lg w-full font-semibold pb-9">
                            Visual Representation
                        </h1>
                        <CanvasJSChart options={options} />
                    </div>
                    <div className="flex bg-slate-900 items-center flex-col p-4 lg:py-7 lg:px-6 rounded-md w-full lg:col-span-1 col-span-3">
                    <h1 className="text-lg text-white/80 w-full underline underline-offset-2  font-semibold pb-4">
                            Detection Time
                        </h1>
                        <div className="w-10/12  lg:h-4/6 h-fit relative">
                            <div className="bg-slate-900 w-full h-8 absolute z-10 bottom-0"></div>
                            <CanvasJSChart options={options2} />
                        </div>
                        <div className="flex w-full lg:mt-10 my-5 justify-center px-10">
                            <button className="h-10 text-sm w-full text-white/80 bg-slate-700 rounded-md" onClick={home}>
                                Return to home page
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportContainer;
