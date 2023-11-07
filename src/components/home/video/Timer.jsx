import { useState, useEffect } from "react";

function Timer() {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTotalSeconds(0);
        setIsRunning(false);
    };

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    var formattedTime = `${hours === 0 ? "" : hours + ":"}${
        minutes === 0 ? "" : minutes < 10 ? "0" + minutes + ":" : minutes + ":"
    }${seconds < 10 ? "0" + seconds : seconds}${
        hours !== 0 ? "hr" : minutes !== 0 ? "min" : "s"
    }`;

    return (
        <div>
            <div>
            {formattedTime}
            </div>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

export default Timer;
