import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("customColorSet", [
    "#000099",
    "#990000",
    "yellow",
    "green",
]);

function MiniEmotionChart({ emotions, hide, children}) {
    const options = {
        animationEnabled: true,
        animationDuration: 2000,
        height: 250,
        colorSet: "customColorSet",
        title: {
            text: "Facial Emotion Graph",
            margin: 50,
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
        <div className={` ${hide ? "w-0 p-0" : "w-full p-4" } lg:static absolute pt-5 lg:pt-0 top-0 right-0 duration-200 transition-all ease-linear rounded-md overflow-hidden h-full bg-white lg:flex`}>
            <div className="bg-black lg:hidden rounded-md mb-10 flex w-full h-64">
                {children}
            </div>
            <CanvasJSChart options={options} />
        </div>
    );
}

export default MiniEmotionChart;
