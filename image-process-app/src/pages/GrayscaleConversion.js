import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GrayscaleConversion.css";

export default function GrayscaleConversion() {
  const navigate = useNavigate();

  const originalCanvasRef = useRef(null);
  const processedCanvasRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [conversionMethod, setConversionMethod] = useState("luminance");

  const MAX_W = 800;
  const MAX_H = 600;

  const drawImageToCanvas = (img, canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let { width, height } = img;
    const scale = Math.min(MAX_W / width, MAX_H / height, 1);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
  };

  const convertToGrayscale = (imageData, method) => {
    const { data } = imageData;

    for (let i = 0; i < data.length; i += 4) {
      let gray;

      switch (method) {
        case "luminance":
          gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          break;
        case "average":
          gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
          break;
        case "lightness":
          gray = (Math.max(data[i], data[i + 1], data[i + 2]) + 
                  Math.min(data[i], data[i + 1], data[i + 2])) / 2;
          break;
        default:
          gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }

      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    return imageData;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageSrc(ev.target.result);
      setHasProcessed(false);
    };
    reader.readAsDataURL(file);
  };

  const applyGrayscale = () => {
    if (!imageSrc) {
      alert("Upload an image first.");
      return;
    }
    const srcCanvas = originalCanvasRef.current;
    const dstCanvas = processedCanvasRef.current;
    if (!srcCanvas || !dstCanvas) return;

    dstCanvas.width = srcCanvas.width;
    dstCanvas.height = srcCanvas.height;

    const sctx = srcCanvas.getContext("2d");
    const dctx = dstCanvas.getContext("2d");

    const srcData = sctx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
    const result = convertToGrayscale(srcData, conversionMethod);
    dctx.putImageData(result, 0, 0);
    setHasProcessed(true);
  };

  const downloadProcessed = () => {
    const canvas = processedCanvasRef.current;
    if (!hasProcessed || !canvas) return;
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "grayscale-image.png";
        a.click();
        URL.revokeObjectURL(url);
      });
    } else {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "grayscale-image.png";
      a.click();
    }
  };

  useEffect(() => {
    if (!imageSrc) return;
    const originalCanvas = originalCanvasRef.current;
    const processedCanvas = processedCanvasRef.current;
    if (!originalCanvas || !processedCanvas) return;

    const img = new Image();
    img.onload = () => {
      drawImageToCanvas(img, originalCanvas);
      processedCanvas.width = originalCanvas.width;
      processedCanvas.height = originalCanvas.height;
      const pctx = processedCanvas.getContext("2d");
      pctx.clearRect(0, 0, processedCanvas.width, processedCanvas.height);
      setHasProcessed(false);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  return (
    <div className="grayscale-container">
      <header className="tool-header">
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
        <h1>Grayscale Conversion Tool</h1>
        <p>Convert color images to grayscale using different methods.</p>
      </header>

      <div className="tool-content">
        <div className="upload-controls">
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <div className="grayscale-controls">
            <label htmlFor="method-select">Method:</label>
            <select
              id="method-select"
              value={conversionMethod}
              onChange={(e) => setConversionMethod(e.target.value)}
            >
              <option value="luminance">Luminance (Rec. 601)</option>
              <option value="average">Average</option>
              <option value="lightness">Lightness</option>
            </select>
            <button className="go-button" onClick={applyGrayscale} disabled={!imageSrc}>
              Go
            </button>
          </div>
        </div>

        <div className="images-container">
          <div className="image-box">
            <h3>Original</h3>
            <canvas ref={originalCanvasRef} />
          </div>
          <div className="image-box">
            <h3>Processed</h3>
            <canvas ref={processedCanvasRef} />
            <button
              className="download-button"
              disabled={!hasProcessed}
              onClick={downloadProcessed}
            >
              Download Grayscale Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
