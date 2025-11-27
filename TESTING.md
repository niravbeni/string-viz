# Testing Guide

This guide will help you test the String Art Generator application.

## Quick Start

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## Test Cases

### 1. Basic Image Upload

**Steps**:
1. Click the upload area or drag an image onto it
2. Verify the image appears in the "Source Image" canvas
3. Check that the "Generate String Art" button is now enabled

**Expected Results**:
- Image loads successfully
- Image is converted to grayscale
- Image is resized to 800x800 pixels
- UI updates to show the source image

### 2. Parameter Adjustment

**Test Different Configurations**:

#### Low Quality (Fast)
- Pegs Per Side: 30 (120 total)
- Iterations: 1000
- Line Opacity: 15%
- Expected time: ~5-10 seconds

#### Medium Quality (Recommended)
- Pegs Per Side: 50 (200 total)
- Iterations: 2500
- Line Opacity: 20%
- Expected time: ~15-30 seconds

#### High Quality (Detailed)
- Pegs Per Side: 75 (300 total)
- Iterations: 4000
- Line Opacity: 25%
- Expected time: ~45-90 seconds

**What to Observe**:
- Sliders update values in real-time
- Total peg count is calculated correctly (pegsPerSide × 4)
- Preset buttons apply correct values

### 3. String Art Generation

**Steps**:
1. Upload an image (portrait recommended)
2. Set parameters to Medium quality
3. Click "Generate String Art"
4. Watch the progress bar

**Expected Results**:
- Progress bar animates from 0% to 100%
- "Generating..." text appears
- String art gradually appears on canvas
- Generation completes without errors
- Final result resembles the source image

**Performance Checks**:
- UI remains responsive during generation
- Progress updates smoothly
- No browser freezing or hangs

### 4. Export Functionality

**Steps**:
1. After successful generation, find the "Export Instructions" section
2. Click each format button (TXT, JSON, CSV)

**Expected Results**:
- Each format downloads successfully
- Files contain the correct data:
  - **TXT**: Human-readable list (1. Peg 45, 2. Peg 123, etc.)
  - **JSON**: Array of numbers `[45, 123, 67, ...]`
  - **CSV**: Comma-separated values `45,123,67,...`
- Preview shows first 20 connections correctly

### 5. Reset Functionality

**Steps**:
1. Generate string art from an image
2. Click "Reset" button
3. Verify UI returns to initial state

**Expected Results**:
- Source image is cleared
- String art result is cleared
- Upload area reappears
- Parameters retain their values

### 6. Best Image Types to Test

#### Recommended (Best Results):
- **Portraits**: Close-up faces with good contrast
- **Silhouettes**: High contrast subjects
- **Line art**: Simple drawings with clear outlines

#### Works Well:
- **Logos**: Simple brand marks
- **Icons**: Clear, bold symbols
- **Text**: Large, bold letters

#### Less Ideal:
- Very complex scenes with lots of detail
- Low contrast images
- Very busy backgrounds

## Performance Testing

### Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Image Sizes

Test with various input images:
- [ ] Small images (< 500px)
- [ ] Medium images (500-2000px)
- [ ] Large images (> 2000px)
- [ ] Very large images (> 5000px)

**Expected**: All images should be handled gracefully, resized to 800x800

### Parameter Extremes

Test edge cases:
- [ ] Minimum pegs (20) with minimum iterations (500)
- [ ] Maximum pegs (100) with maximum iterations (5000)
- [ ] Various opacity values

## Known Limitations

1. **Processing Time**: High quality settings can take 1-2 minutes
2. **Memory Usage**: Very high iterations (5000+) may use significant memory
3. **Mobile Performance**: Slower on mobile devices
4. **Image Formats**: Works best with JPG, PNG; may have issues with animated GIFs

## Debugging

### If Generation Fails:

1. **Check Console**: Open browser DevTools (F12) and check for errors
2. **Try Smaller Parameters**: Reduce iterations to test
3. **Try Different Image**: Some images may cause issues
4. **Clear Cache**: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### If UI is Unresponsive:

1. **Wait**: High iteration counts take time
2. **Reduce Parameters**: Lower iterations for faster generation
3. **Check Browser**: Ensure browser is up to date

## Visual Quality Assessment

Good string art should:
- ✓ Maintain recognizable features from source image
- ✓ Show proper shading/toning through line density
- ✓ Have smooth, natural-looking transitions
- ✓ Preserve key details (eyes, nose, mouth in portraits)

Poor results might indicate:
- ✗ Too few iterations (increase)
- ✗ Too high opacity (decrease)
- ✗ Too few pegs (increase)
- ✗ Poor source image (try different image)

## Automated Testing (Future)

Currently, testing is manual. Future enhancements could include:
- Unit tests for geometry and image processing functions
- Integration tests for the algorithm
- Visual regression tests
- Performance benchmarks

## Reporting Issues

When reporting issues, include:
1. Browser and version
2. Input image (if not sensitive)
3. Parameter settings used
4. Console errors (if any)
5. Expected vs actual behavior

---

Happy testing! 🎨

