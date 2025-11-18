import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContrastAdjustment.css";

export default function ContrastAdjustment() {
  const navigate = useNavigate();

  const originalCanvasRef = useRef(null);
  const processedCanvasRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [contrastValue, setContrastValue] = useState(0);

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

  const adjustContrast = (imageData, contrast) => {
    const { data } = imageData;
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.max(0, Math.min(255, factor * (data[i] - 128) + 128));
      data[i + 1] = Math.max(0, Math.min(255, factor * (data[i + 1] - 128) + 128));
      data[i + 2] = Math.max(0, Math.min(255, factor * (data[i + 2] - 128) + 128));
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

  const handleContrastChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= -100 && value <= 100) {
      setContrastValue(value);
    }
  };

  const applyContrastAdjustment = () => {
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
    const result = adjustContrast(srcData, contrastValue);
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
        a.download = "contrast-adjusted-image.png";
        a.click();
        URL.revokeObjectURL(url);
      });
    } else {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "contrast-adjusted-image.png";
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
    <div className="contrast-container">
      <header className="tool-header">
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
        <h1>Contrast Adjustment Tool</h1>
        <p>Adjust image contrast from -100 to +100.</p>
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

          <div className="contrast-controls">
            <label htmlFor="contrast-input">Contrast: {contrastValue}</label>
            <input
              id="contrast-input"
              type="number"
              min="-100"
              max="100"
              value={contrastValue}
              onChange={handleContrastChange}
            />
            <button className="go-button" onClick={applyContrastAdjustment} disabled={!imageSrc}>
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
              Download Adjusted Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
