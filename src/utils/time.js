export const calculateTime =  (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    var time = `${hours === 0 ? "" : hours + ":"}${
        minutes === 0 ? "" : minutes < 10 ? "0" + minutes + ":" : minutes + ":"
    }${seconds < 10 ? "0" + seconds : seconds}${
        hours !== 0 ? "hr" : minutes !== 0 ? "min" : "s"
    }`;

    return { hours, minutes, seconds, time };
}


export const timeStringToSeconds = async (timeString) => {
    const cleanedTime = timeString?.replace(/hr|min|s/g, "");
    const minPattern = /(\d+):(\d+)min/;
    const sPattern = /(\d+)s/;
    const hrPattern = /(\d+):(\d+):(\d+)hr/;

    // MINUTE TO SECONDS
    let match = timeString?.match(minPattern);
    if (match) {
        const result = cleanedTime.split(":");
        const time =
            parseInt(result[0]) * 60 +
            parseInt(result[1])

        return time;
    }

    // HOUR TO SECONDS
    match = timeString?.match(hrPattern);
    if (match) {
        const result = cleanedTime.split(":");
        const time =
            parseInt(result[0]) * 3600 +
            parseInt(result[1]) * 60 +
            parseInt(result[2]);

        return time;
    }

    // SECONDS
    match = timeString?.match(sPattern);
    if (match) {
        

        return cleanedTime;
    }

    return 0;
};
