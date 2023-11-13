import { calculateTime, timeStringToSeconds } from "./time";

const countZeroEmotionIndices = (data) => {
    const emotions = Object.keys(data);
    const zeroIndices = new Set();

    const timeLabels = data[emotions[0]].map((point) => point.label);

    for (const label of timeLabels) {
        const isZeroTime = emotions.every((emotion) => {
            const point = data[emotion].find((p) => p.label === label);
            return point && point.y === 0;
        });

        if (isZeroTime) {
            zeroIndices.add(label);
        }
    }

    return zeroIndices.size;
};

const averageEmotion = (data, divisor) => {
    const emotions = Object.keys(data);
    const sumEmotionYValues = {};

    emotions.forEach((emotion) => {
        const sum = data[emotion].reduce((acc, point) => acc + point.y, 0);
        const result = (sum / divisor).toFixed(2);
        sumEmotionYValues[emotion] = parseFloat(result);
    });

    return sumEmotionYValues;
}

export const computeEmotionAverages = async (data) => {
    try {
    // DETECTION DURATION
    const neutralData = data["neutral"];
    const ST = await timeStringToSeconds(neutralData[0]?.label);
    const startT = calculateTime(ST)
    const ET = await timeStringToSeconds(
        neutralData[neutralData.length - 1]?.label
    );
    const endT = calculateTime(ET)
    const startTime = startT.time;
    const endTime = endT.time;
    
    const DD_TS = ET - ST;
    const DDTS = calculateTime(DD_TS);
    const detectionDuration = DDTS.time;

    // NO DETECTED DURATION
    const NDT_TS = countZeroEmotionIndices(data);
    const NDTTS = calculateTime(NDT_TS);
    const noDetectionDuration = NDTTS.time;

    // WITH EMOTION DETECTED DURATION
    const WEDD_TS = DD_TS - NDT_TS;
    const WEDDTS = calculateTime(WEDD_TS);
    const emotionDetectedDuration = WEDDTS.time;

    // EMOTION AVERAGE VALUE IN DETECTED TIME
    const emotionAve = averageEmotion(data, WEDD_TS);
    
    return {
        startTime,
        endTime,
        detectionDuration,
        noDetectionDuration,
        NDT_TS,
        WEDD_TS,
        emotionDetectedDuration,
        emotionAve,
    };

    } catch (error){
        console.error(error);
    }
};
