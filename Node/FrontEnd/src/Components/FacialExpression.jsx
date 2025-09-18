import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FacialExpression() {
  const videoRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [expression, setExpression] = useState("No detection yet");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
        startVideo();
      } catch (error) {
        console.error("Error loading models", error);
      }
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

    loadModels();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClick = async () => {
    if (!modelsLoaded || !videoRef.current) return;

    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 224,
      scoreThreshold: 0.5,
    });

    const detections = await faceapi
      .detectSingleFace(videoRef.current, options)
      .withFaceExpressions();

    if (detections && detections.expressions) {
      const expressions = detections.expressions;
      const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
      const topExpression = sorted[0];
      setExpression(
        `${topExpression[0]} (${(topExpression[1] * 100).toFixed(2)}%)`
      );
    } else {
      setExpression("No face detected");
    }
  };

  async function getSongs() {
    try {
      const { data } = await axios.get("http://127.0.0.1:3000/songs");
      setSongs(data);
    } catch (err) {
      console.error("Error fetching songs", err);
    }
  }

  useEffect(() => {
    getSongs();
  }, []);

  // Example filter (replace with expression logic)
    let filterSongs=songs.filter((el)=>el.mood==expression.split(" ")[0])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-lg font-semibold">🎵 Moody Player</h1>
      </header>

      {/* Live Mood Detection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white rounded-2xl shadow p-6">
        <video
          ref={videoRef}
          autoPlay
          muted
          width="320"
          height="240"
          className="rounded-xl border"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Live Mood Detection</h2>
          <p className="text-gray-600 mb-4">
            Your current mood is being analyzed in real-time. Enjoy music
            tailored to your feelings.
          </p>
          <button
            onClick={handleClick}
            className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Start Listening
          </button>
          <p className="mt-4 text-gray-800 font-medium">
            Expression: {expression}
          </p>
        </div>
      </div>

      {/* Recommended Tracks */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recommended Tracks</h3>
        <ul className="space-y-3">
          {filterSongs.map((el, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-medium">{el.title}</p>
                <p className="text-gray-500 text-sm">{el.artist}</p>
              </div>
              {/* Native media controls */}
              <audio
                src={el.audioFile}
                controls
                className="w-40"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
