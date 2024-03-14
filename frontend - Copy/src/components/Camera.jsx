import React, { useRef, useState, useEffect } from "react";
import { Button, Typography, Container } from "@mui/material";

const Camera = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Reference to the audio element
  const audioRef = useRef(null);

  useEffect(() => {
    // Load and initialize the audio element
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takePicture = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageDataURL = canvas.toDataURL("image/png");

      const imageObject = {
        dataURL: imageDataURL,
        metadata: {
          width: canvas.width,
          height: canvas.height,
          timestamp: new Date().toISOString(),
          fileSizeInBytes: imageDataURL.length,
          fileSizeInMegabytes: imageDataURL.length / (1024 * 1024),
          imageFormat: "image/png",
          userId: "user123",
          ratio: canvas.width / canvas.height,
        },
      };

      setCapturedImage([...capturedImage, imageObject]);

      // Play the sound when a picture is taken
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  const handleCloseCamera = () => {
    setIsCameraActive(false);
    // Stop the video stream when the camera is closed
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  return (
    <Container>
      <Button variant="contained" onClick={startCamera}>
        Start Camera
      </Button>

      {/* Add the audio element with the sound source */}
      <audio ref={audioRef} src="/path/to/sound.mp3" />

      <div className={`camera-container ${isCameraActive ? "fullscreen" : ""}`}>
        <video
          ref={videoRef}
          width="100%"
          height="auto"
          autoPlay
          playsInline
          muted
          style={{
            backgroundColor: "black",
          }}
        ></video>

        <Button
          variant="contained"
          onClick={takePicture}
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          Take Picture
        </Button>
        <Button
          variant="contained"
          onClick={handleCloseCamera}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 2,
          }}
        >
          Close Camera
        </Button>
      </div>

      {capturedImage.length !== 0 && (
        <div>
          <Typography variant="h6">Captured Image:</Typography>
          {capturedImage.map((image, index) => (
              <img
                src={image.dataURL}
                alt={`Captured Image ${index}`}
                height="100px"
                key={index}
              />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Camera;
