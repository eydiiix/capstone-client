import Video from "@/components/room/Video";
import CanvasJSReact from "@canvasjs/react-charts";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("customColorSet", [
    "#000099CC",
    "#990000CC",
    "#FF8000CC",
    "#008000CC",
]);

function EmotionChart({ emotions, hideChart, toggle }) {
    const options = {
        animationEnabled: true,
        animationDuration: 2000,
        colorSet: "customColorSet",
        title: {
            text: "Facial Emotion Graph",
            margin: 70,
            fontFamily: "Poppins",
            fontWeight: "bold",
        },
        axisY: {
            title: "Intensity",
            fontFamily: "Poppins",
            fontWeight: "bold",
            maximum: "100",
            suffix: "%",
        },
        legend: {
            fontFamily: "Poppins",
            margin: 40,
        },
        toolTip: {
            shared: true,
            backgroundColor: "white",
            cornerRadius: 4,
            contentFormatter: function (e) {
                var content =
                    "<strong>Time: " +
                    e.entries[0].dataPoint.label +
                    "</strong><br/>";
                var hasNonZeroValue = false;

                for (var i = 0; i < e.entries.length; i++) {
                    if (e.entries[i].dataPoint.y !== 0) {
                        hasNonZeroValue = true;
                        content +=
                            "<strong style='color: " +
                            e.entries[i].dataSeries.color +
                            "'>" +
                            e.entries[i].dataSeries.name +
                            ": " +
                            e.entries[i].dataPoint.y +
                            "%" +
                            "</strong>";
                        content += "<br/>";
                    }
                }

                if (!hasNonZeroValue) {
                    content =
                        "<strong>Time: " +
                        e.entries[0].dataPoint.label +
                        "</strong><br>No face detected";
                }

                return content;
            },
        },
        height: 300,
        data: [
            {
                type: "line",
                name: "Sad",
                showInLegend: true,
                dataPoints: [...emotions?.sad],
            },
            {
                type: "line",
                name: "Angry",
                showInLegend: true,
                dataPoints: [...emotions?.angry],
            },
            {
                type: "line",
                name: "Happy",
                showInLegend: true,
                dataPoints: [...emotions?.happy],
            },
            {
                type: "line",
                name: "Neutral",
                showInLegend: true,
                dataPoints: [...emotions?.neutral],
            },
        ],
    };

    return (
        <div
            className={`w-screen flex-col flex justify-center items-center p-16 pt-20 h-screen text-bl bg-white absolute top-0 right-0 z-50 ${
                hideChart
                    ? "translate-y-[100%] opacity-0"
                    : "translate-y-0 opacity-100"
            } duration-200 ease-out transition-all `}
        >
            <CanvasJSChart options={options} />
            <button
                className="w-8 grid place-items-center h-8 mt-auto rounded-full text-white bg-red-600"
                onClick={toggle}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
}

export default EmotionChart;
