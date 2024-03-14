import React, { useRef, useState } from "react";
import { Button, Typography, Container } from "@mui/material";

const Camera = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = async (e) => {
    e.preventDefault();
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

  const takePicture = (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <Container>
      <Button variant="contained" onClick={(e) => startCamera(e)}>
        Start Camera
      </Button>
      <Container
      style={{
        position: "relative",
        width: isCameraActive ? "100%" : "auto",
        height: isCameraActive ? "100vh" : "auto",
        overflow: "hidden",
        transition: "all 0.5s", // Add smooth transition effect
      }}
    >
      <video ref={videoRef} width="100%" height="100%" autoPlay playsInline>
        {/* Video source goes here */}
      </video>

      {/* Interactable button overlay */}
      {isCameraActive && (
        <Button
          variant="contained"
          onClick={takePicture}
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2, // Ensure the button is above the video
          }}
        >
          Take Picture
        </Button>
      )}

      {!isCameraActive && (
        <Button variant="contained" onClick={startCamera}>
          Start Camera
        </Button>
      )}
    </Container>
      {capturedImage.length !== 0 && (
        <div>
          <Typography variant="h6">Captured Image:</Typography>
          {capturedImage.map((image, index) => (
            <div key={index}>
              <img
                src={image.dataURL}
                alt={`Captured Image ${index}`}
                height="100px"
              />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Camera;
