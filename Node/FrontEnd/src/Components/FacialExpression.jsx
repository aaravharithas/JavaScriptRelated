import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function FacialExpression() {
    const videoRef = useRef();
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [expression, setExpression] = useState('No detection yet');

    // Load models and start video when component mounts
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models';  // Hardcoded path to models folder
            console.log("Loading models from", MODEL_URL);
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                console.log("tinyFaceDetector loaded");
                await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
                console.log("faceExpressionNet loaded");
                setModelsLoaded(true);
                startVideo();
            } catch (error) {
                console.error("Error loading models", error);
            }
        };

        const startVideo = () => {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        console.log("Video stream started");
                    }
                })
                .catch((err) => console.error("Error accessing webcam: ", err));
        };

        loadModels();

        // Cleanup on unmount
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Function to detect expression once when button is clicked
    const handleClick = async () => {
        if (!modelsLoaded || !videoRef.current) {
            console.error("Models not loaded or video not available");
            return;
        }

        const options = new faceapi.TinyFaceDetectorOptions({
            inputSize: 224,
            scoreThreshold: 0.5
        });

        const detections = await faceapi
            .detectSingleFace(videoRef.current, options)
            .withFaceExpressions();

        console.log("Detection result:", detections);

        if (detections && detections.expressions) {
            const expressions = detections.expressions;
            const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
            const topExpression = sorted[0];
            setExpression(`${topExpression[0]} (${(topExpression[1] * 100).toFixed(2)}%)`);
        } else {
            setExpression("No face detected");
        }
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <h1>😃 Mood Detection</h1>
            <video
                ref={videoRef}
                autoPlay
                muted
                width="320"
                height="240"
                style={{ borderRadius: '25px', marginBottom: '20px' }}
            />
            <br />
            <button onClick={handleClick} style={{ padding: '10px 20px' }}>
                Detect Mood
            </button>
            <h2>Expression: {expression}</h2>
        </div>
    );
}
