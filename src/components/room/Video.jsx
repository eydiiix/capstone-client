import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

function Video({
    stream,
    muted,
    detection,
    setEmotionData,
    time,
    setGraphLoaded
}) {
    const videoRef = useRef();
    const canvasRef = useRef();
    const timeRef = useRef(0);
    const previousTime = useRef(0);

    useEffect(() => {
        if (timeRef) {
            timeRef.current = time;
        }
    }, [time]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        if (stream) {
            if (detection) {
                loadModels();
            }
        }
    }, [stream]);

    const loadModels = async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");

        await faceMyDetect();
        setGraphLoaded(true);
    };

    const updateEmotionData = (newEmotionData) => {
        if (previousTime.current !== timeRef.current) {
            setEmotionData((prev) => ({
                ...prev,
                happy: [
                    ...prev.happy,
                    { y: newEmotionData.happy, label: timeRef.current },
                ],
                sad: [
                    ...prev.sad,
                    { y: newEmotionData.sad, label: timeRef.current },
                ],
                neutral: [
                    ...prev.neutral,
                    { y: newEmotionData.neutral, label: timeRef.current },
                ],
                angry: [
                    ...prev.angry,
                    { y: newEmotionData.angry, label: timeRef.current },
                ],
            }));

            previousTime.current = timeRef.current;
        }
    };

    const faceMyDetect = async () => {
        setInterval(async () => {
            if (videoRef.current) {
                const detections = await faceapi
                    .detectAllFaces(
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions();

                if (detections.length > 0) {
                    const expressions = detections[0].expressions;

                    const newEmotionData = {
                        happy: parseInt(expressions.happy * 100, 10),
                        sad: parseInt(expressions.sad * 100, 10),
                        neutral: parseInt(expressions.neutral * 100, 10),
                        angry: parseInt(expressions.angry * 100, 10),
                    };

                    updateEmotionData(newEmotionData);
                } else {
                    updateEmotionData({
                        happy: 0,
                        sad: 0,
                        neutral: 0,
                        angry: 0,
                    });
                }
            }
        }, 1000);
    };

    return (
        <>
            <video
                crossOrigin="anonymous"
                className="bg-black lg:w-auto w-full rounded-sm scale-x-[-1] lg:rounded-none my-auto lg:mx-auto h-auto lg:h-full object-contain"
                ref={videoRef}
                autoPlay
                playsInline
                muted={muted}
            ></video>
            <div ref={canvasRef} className="absolute hidden top-[-50px]" />
        </>
    );
}

export default Video;
