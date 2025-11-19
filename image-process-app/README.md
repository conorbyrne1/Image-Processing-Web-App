# Image Processing Tool

**Live Demo:** https://conorbyrne1.github.io/Image-Processing-Web-App

## Description

The Image Processing Tool is a comprehensive web application that demonstrates
various image filtering.
Built with React and the HTML5 Canvas API, this webpage allows
users to upload images and apply transformations including blur,
edge detection, sharpening, contrast/brightness adjustments, and grayscale
conversion. All processing occurs entirely in the browser, ensuring user
privacy and providing immediate visual feedback.

## Features

- **Image Blur** - Apply Gaussian blur with adjustable intensity (1-100%)
- **Edge Detection** - Detect edges using three methods:
    - 1D Horizontal Edge Detection
    - 2D Sobel Operator
    - 2D Laplacian Operator
- **Sharpen** - Enhance image details and edges with adjustable sharpening intensity (1-100%)
- **Contrast Adjustment** - Adjust image contrast from -100 to +100
- **Brightness Adjustment** - Make images lighter or darker from -100 to +100
- **Grayscale Conversion** - Convert color images to grayscale using three methods:
    - Luminance (Rec. 601 standard)
    - Average method
    - Lightness method
- **Real-Time Preview** - See results immediately after clicking "Go"
- **Download Functionality** - Save processed images as PNG files
- **Responsive Design** - Works on desktop and mobile devices

## Technologies & Dependencies

### Core Technologies
- **JavaScript (ES6+)** - Primary programming language
- **React 18.3.1** - Frontend framework for building the user interface
- **HTML5 Canvas API** - For client-side image manipulation
- **CSS3** - For styling and responsive layouts

### Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
}
```

### Development Tools
- **Node.js** - Runtime environment
- **npm** - Package manager
- **Create React App** - Build tooling and development server

## Setup Instructions

### Prerequisites
- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

### Installation Steps

1. **Clone or download the project**
   ```bash
   git clone https://github.com/conorbyrne1/Image-Processing-Web-App.git
   cd image-processing-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```
   Creates an optimized production build in the `build/` folder

### Environment Configuration
No additional environment variables are required. The application runs entirely client-side with no backend dependencies.

## File Structure

```
image-process-app/
├── public/
│   ├── index.html                      # HTML template
├── src/
│   ├── pages/                          # Page components
│   │   ├── Home.js                     # Landing page
│   │   ├── Home.css                    # Home page styles
│   │   ├── ImageBlur.js                # Blur tool component
│   │   ├── ImageBlur.css               # Blur tool styles
│   │   ├── EdgeDetection.js            # Edge detection component
│   │   ├── EdgeDetection.css           # Edge detection styles
│   │   ├── Sharpen.js                  # Sharpen tool component
│   │   ├── Sharpen.css                 # Sharpen tool styles
│   │   ├── ContrastAdjustment.js       # Contrast tool component
│   │   ├── ContrastAdjustment.css      # Contrast tool styles
│   │   ├── BrightnessAdjustment.js     # Brightness tool component
│   │   ├── BrightnessAdjustment.css    # Brightness tool styles
│   │   ├── GrayscaleConversion.js      # Grayscale tool component
│   │   └── GrayscaleConversion.css     # Grayscale tool styles
│   ├── App.js                          # Main app component with routing
│   ├── App.css                         # Global app styles
│   ├── index.js                        # Application entry point
│   ├── index.css                       # Base styles
│   └── reportWebVitals.js              # Performance monitoring
├── package.json                        # Project dependencies and scripts
└── README.md                           # Project documentation
```
