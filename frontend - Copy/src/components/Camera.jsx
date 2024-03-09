import React, { useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState([]);

  const startCamera = async (e) => {
    e.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
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
    <div>
      <button onClick={(e) => startCamera(e)}>Start Camera</button>
      <button onClick={(e) => takePicture(e)}>Take Picture</button>
      <video ref={videoRef} width="300" height="200" autoPlay></video>
      {capturedImage.length !== 0 && (
        <div>
          <h2>Captured Image:</h2>
          {capturedImage.map((image, index) => (
            <>
              <img
                key={index}
                src={image.dataURL}
                alt={`Captured Image ${index}`}
                height="100px"
              />
              <table>
                {Object.entries(image.metadata).map(([key, value]) => (
                  <tr>
                    <td key={key}>
                      <strong>{key}</strong>: {value}
                    </td>
                  </tr>
                ))}
              </table>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Camera;
