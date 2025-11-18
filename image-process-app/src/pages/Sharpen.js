import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sharpen.css";

export default function Sharpen() {
  const navigate = useNavigate();

  const originalCanvasRef = useRef(null);
  const processedCanvasRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [sharpenIntensity, setSharpenIntensity] = useState(50);

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

  const convolve3x3 = (imageData, kernel) => {
    const { data, width, height } = imageData;
    const output = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * width + (x + kx)) * 4 + c;
              const kernelIdx = (ky + 1) * 3 + (kx + 1);
              sum += data[idx] * kernel[kernelIdx];
            }
          }
          const outputIdx = (y * width + x) * 4 + c;
          output[outputIdx] = Math.max(0, Math.min(255, sum));
        }
      }
    }

    return new ImageData(output, width, height);
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

  const handleIntensityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setSharpenIntensity(value);
    }
  };

  const applySharpen = () => {
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

    const strength = sharpenIntensity / 50;
    const center = 1 + 4 * strength;
    const edge = -strength;

    const kernel = [
      0, edge, 0,
      edge, center, edge,
      0, edge, 0
    ];

    const result = convolve3x3(srcData, kernel);
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
        a.download = "sharpened-image.png";
        a.click();
        URL.revokeObjectURL(url);
      });
    } else {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "sharpened-image.png";
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
    <div className="sharpen-container">
      <header className="tool-header">
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
        <h1>Sharpen Tool</h1>
        <p>Enhance image details and edges with sharpening.</p>
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

          <div className="sharpen-controls">
            <label htmlFor="sharpen-input">Intensity: {sharpenIntensity}%</label>
            <input
              id="sharpen-input"
              type="number"
              min="1"
              max="100"
              value={sharpenIntensity}
              onChange={handleIntensityChange}
            />
            <button className="go-button" onClick={applySharpen} disabled={!imageSrc}>
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
              Download Sharpened Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
