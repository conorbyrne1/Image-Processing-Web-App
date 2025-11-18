import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from ".//pages/Home";
import ImageBlur from ".//pages/ImageBlur";
import EdgeDetection from ".//pages/EdgeDetection";
import Sharpen from ".//pages/Sharpen";
import ContrastAdjustment from ".//pages/ContrastAdjustment";
import BrightnessAdjustment from ".//pages/BrightnessAdjustment";
import GrayscaleConversion from ".//pages/GrayscaleConversion";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blur" element={<ImageBlur />} />
          <Route path="/edge-detection" element={<EdgeDetection />} />
          <Route path="/sharpen" element={<Sharpen />} />
          <Route path="/contrast" element={<ContrastAdjustment />} />
          <Route path="/brightness" element={<BrightnessAdjustment />} />
          <Route path="/grayscale" element={<GrayscaleConversion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
