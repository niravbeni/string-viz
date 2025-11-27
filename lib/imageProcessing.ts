/**
 * Image processing utilities for string art generation
 */

import { Point } from './geometry';

/**
 * Load an image from a File and return it as an HTMLImageElement
 */
export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Convert image to grayscale and return as ImageData
 * Resizes to target size
 */
export function imageToGrayscale(
  img: HTMLImageElement,
  targetSize: number,
  invert: boolean = false
): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  
  // Draw image scaled to target size
  ctx.drawImage(img, 0, 0, targetSize, targetSize);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, targetSize, targetSize);
  const data = imageData.data;
  
  // Convert to grayscale
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const finalValue = invert ? 255 - gray : gray;
    data[i] = finalValue;
    data[i + 1] = finalValue;
    data[i + 2] = finalValue;
    // Keep alpha at data[i + 3]
  }
  
  return imageData;
}

/**
 * Create a darkness array from ImageData (0 = white, 255 = black)
 */
export function createDarknessArray(imageData: ImageData): Uint8ClampedArray {
  const { width, height, data } = imageData;
  const darkness = new Uint8ClampedArray(width * height);
  
  for (let i = 0; i < darkness.length; i++) {
    // Invert: darker pixels have higher values
    darkness[i] = 255 - data[i * 4];
  }
  
  return darkness;
}

/**
 * Get pixel value at coordinates (with bounds checking)
 */
export function getPixel(
  array: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number
): number {
  if (x < 0 || x >= width || y < 0 || y >= height) return 0;
  return array[y * width + x];
}

/**
 * Set pixel value at coordinates (with bounds checking)
 */
export function setPixel(
  array: Uint8ClampedArray,
  x: number,
  y: number,
  value: number,
  width: number,
  height: number
): void {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  array[y * width + x] = Math.max(0, value);
}

/**
 * Score a line by how well it matches the darkness in the image
 * Higher score = better match
 */
export function scoreLine(
  pixels: Point[],
  darkness: Uint8ClampedArray,
  width: number,
  height: number
): number {
  let score = 0;
  for (const pixel of pixels) {
    score += getPixel(darkness, pixel.x, pixel.y, width, height);
  }
  return score;
}

/**
 * Draw a line on the darkness array (subtract darkness)
 */
export function drawLine(
  pixels: Point[],
  darkness: Uint8ClampedArray,
  opacity: number,
  width: number,
  height: number
): void {
  const darkening = Math.floor(opacity * 255);
  for (const pixel of pixels) {
    const current = getPixel(darkness, pixel.x, pixel.y, width, height);
    setPixel(darkness, pixel.x, pixel.y, current - darkening, width, height);
  }
}

/**
 * Convert darkness array back to ImageData for display
 */
export function darknessToImageData(
  darkness: Uint8ClampedArray,
  width: number,
  height: number
): ImageData {
  const imageData = new ImageData(width, height);
  const data = imageData.data;
  
  for (let i = 0; i < darkness.length; i++) {
    const value = 255 - darkness[i]; // Invert back
    data[i * 4] = value;
    data[i * 4 + 1] = value;
    data[i * 4 + 2] = value;
    data[i * 4 + 3] = 255;
  }
  
  return imageData;
}

