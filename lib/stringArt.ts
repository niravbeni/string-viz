/**
 * Core string art generation algorithm
 */

import {
  calculatePegPositions,
  getLinePixels,
  getMinPegDistance,
  type Peg,
  type Point
} from './geometry';
import {
  createDarknessArray,
  scoreLine,
  drawLine,
  type darknessToImageData
} from './imageProcessing';

export interface StringArtConfig {
  pegsPerSide: number;
  iterations: number;
  lineOpacity: number;
  imageSize: number;
}

export interface StringArtResult {
  connections: number[]; // Array of peg indices showing the path
  pegs: Peg[];
  imageSize: number;
}

export interface ProgressCallback {
  (iteration: number, total: number, currentPeg: number): void;
}

/**
 * Cache for line pixels between pegs
 */
class LineCache {
  private cache: Map<string, Point[]> = new Map();
  
  getKey(from: number, to: number): string {
    // Use smaller index first for consistency
    const [a, b] = from < to ? [from, to] : [to, from];
    return `${a}-${b}`;
  }
  
  get(from: number, to: number): Point[] | undefined {
    return this.cache.get(this.getKey(from, to));
  }
  
  set(from: number, to: number, pixels: Point[]): void {
    this.cache.set(this.getKey(from, to), pixels);
  }
  
  getOrCalculate(fromPeg: Peg, toPeg: Peg): Point[] {
    const cached = this.get(fromPeg.index, toPeg.index);
    if (cached) return cached;
    
    const pixels = getLinePixels(fromPeg.x, fromPeg.y, toPeg.x, toPeg.y);
    this.set(fromPeg.index, toPeg.index, pixels);
    return pixels;
  }
}

/**
 * Generate string art from a darkness array
 */
export async function generateStringArt(
  imageData: ImageData,
  config: StringArtConfig,
  progressCallback?: ProgressCallback
): Promise<StringArtResult> {
  const { pegsPerSide, iterations, lineOpacity, imageSize } = config;
  
  // Calculate peg positions
  const pegs = calculatePegPositions(pegsPerSide, imageSize);
  const totalPegs = pegs.length;
  const minDistance = getMinPegDistance(totalPegs);
  
  // Create working copy of darkness array
  const darkness = createDarknessArray(imageData);
  
  // Initialize line cache
  const lineCache = new LineCache();
  
  // Track connections
  const connections: number[] = [];
  
  // Start from a random peg (or first peg for consistency)
  let currentPeg = 0;
  connections.push(currentPeg);
  
  // Greedy algorithm: find best next connection iteratively
  for (let iteration = 0; iteration < iterations; iteration++) {
    let bestScore = -1;
    let bestPeg = -1;
    let bestPixels: Point[] = [];
    
    const currentPegData = pegs[currentPeg];
    
    // Try all possible next pegs
    for (let nextPeg = 0; nextPeg < totalPegs; nextPeg++) {
      // Skip same peg
      if (nextPeg === currentPeg) continue;
      
      // Skip pegs too close (they don't add much visual information)
      const distance = Math.abs(nextPeg - currentPeg);
      const wrappedDistance = Math.min(distance, totalPegs - distance);
      if (wrappedDistance < minDistance) continue;
      
      // Get line pixels (from cache if available)
      const pixels = lineCache.getOrCalculate(currentPegData, pegs[nextPeg]);
      
      // Score this line
      const score = scoreLine(pixels, darkness, imageSize, imageSize);
      
      if (score > bestScore) {
        bestScore = score;
        bestPeg = nextPeg;
        bestPixels = pixels;
      }
    }
    
    // If no good line found, break early
    if (bestPeg === -1 || bestScore <= 0) {
      break;
    }
    
    // Draw the best line (subtract from darkness)
    drawLine(bestPixels, darkness, lineOpacity, imageSize, imageSize);
    
    // Move to best peg
    currentPeg = bestPeg;
    connections.push(currentPeg);
    
    // Report progress
    if (progressCallback && iteration % 10 === 0) {
      progressCallback(iteration, iterations, currentPeg);
    }
    
    // Yield control occasionally to prevent blocking
    if (iteration % 100 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  // Final progress update
  if (progressCallback) {
    progressCallback(iterations, iterations, currentPeg);
  }
  
  return {
    connections,
    pegs,
    imageSize
  };
}

/**
 * Draw string art result onto a canvas
 */
export function drawStringArt(
  ctx: CanvasRenderingContext2D,
  result: StringArtResult,
  lineColor: string = '#000000',
  lineWidth: number = 1,
  maxLines?: number
): void {
  const { connections, pegs } = result;
  
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  
  const numLines = maxLines ? Math.min(connections.length - 1, maxLines) : connections.length - 1;
  
  for (let i = 0; i < numLines; i++) {
    const fromPeg = pegs[connections[i]];
    const toPeg = pegs[connections[i + 1]];
    
    ctx.beginPath();
    ctx.moveTo(fromPeg.x, fromPeg.y);
    ctx.lineTo(toPeg.x, toPeg.y);
    ctx.stroke();
  }
}

/**
 * Export connections as a formatted string
 */
export function exportConnections(
  connections: number[],
  format: 'txt' | 'json' | 'csv' = 'txt'
): string {
  switch (format) {
    case 'json':
      return JSON.stringify(connections, null, 2);
    
    case 'csv':
      return connections.join(',');
    
    case 'txt':
    default:
      return connections
        .map((peg, i) => `${i + 1}. Peg ${peg}`)
        .join('\n');
  }
}

