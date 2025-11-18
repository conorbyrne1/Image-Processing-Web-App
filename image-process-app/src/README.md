# New Image Processing Tools Added

Four new image processing pages have been added to your React application:

## New Tools

### 1. Sharpen Tool
- **Route:** `/sharpen`
- **Files:** `Sharpen.js`, `Sharpen.css`
- **Features:**
  - Adjustable sharpening intensity (1-100%)
  - Uses convolution with a sharpening kernel
  - The kernel center value increases with intensity while edges become more negative
  - Enhances image details and edges

### 2. Contrast Adjustment Tool
- **Route:** `/contrast`
- **Files:** `ContrastAdjustment.js`, `ContrastAdjustment.css`
- **Features:**
  - Adjustable contrast level (-100 to +100)
  - Uses the contrast adjustment formula: factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
  - Increases or decreases the difference between light and dark areas
  - Blue gradient color scheme

### 3. Brightness Adjustment Tool
- **Route:** `/brightness`
- **Files:** `BrightnessAdjustment.js`, `BrightnessAdjustment.css`
- **Features:**
  - Adjustable brightness level (-100 to +100)
  - Simple pixel value addition/subtraction
  - Makes images lighter or darker
  - Warm orange/peach gradient color scheme

### 4. Grayscale Conversion Tool
- **Route:** `/grayscale`
- **Files:** `GrayscaleConversion.js`, `GrayscaleConversion.css`
- **Features:**
  - Three conversion methods:
    - **Luminance (Rec. 601):** 0.299*R + 0.587*G + 0.114*B (most accurate)
    - **Average:** (R + G + B) / 3 (simple averaging)
    - **Lightness:** (max(R,G,B) + min(R,G,B)) / 2
  - Dark gradient color scheme
  - Converts color images to grayscale

## Updated Files

### App.js
- Added imports for all four new tools
- Added routes for `/sharpen`, `/contrast`, `/brightness`, and `/grayscale`

### Home.js
- Added tool cards for all four new tools on the home page
- Each card has a descriptive label and button to navigate to the tool
- Removed emoji icons and replaced with text labels
- Maintained the existing educational content

## How to Use the New Tools

All new tools follow the same pattern as existing tools:

1. Click on a tool card from the home page
2. Upload an image using "Choose Image"
3. Adjust the tool-specific parameters
4. Click "Go" to process the image
5. Download the processed image if desired
6. Use "Back to Home" to return to the main page

## Technical Implementation

- All tools use HTML5 Canvas API for image processing
- Processing is done client-side in the browser
- Each tool has its own gradient background color scheme
- Consistent UI/UX design across all tools
- Responsive design works on mobile and desktop
- No emojis used (as requested)

## File Structure

Place the files in your React project's `src` directory (or `pages` subdirectory if you're using that structure):

```
src/
  ├── App.js (updated)
  ├── App.css (unchanged)
  ├── Home.js (updated)
  ├── Home.css (unchanged)
  ├── ImageBlur.js (unchanged)
  ├── ImageBlur.css (unchanged)
  ├── EdgeDetection.js (unchanged)
  ├── EdgeDetection.css (unchanged)
  ├── Sharpen.js (new)
  ├── Sharpen.css (new)
  ├── ContrastAdjustment.js (new)
  ├── ContrastAdjustment.css (new)
  ├── BrightnessAdjustment.js (new)
  ├── BrightnessAdjustment.css (new)
  ├── GrayscaleConversion.js (new)
  └── GrayscaleConversion.css (new)
```
