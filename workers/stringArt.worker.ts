/**
 * Web Worker for string art generation
 * Runs the algorithm off the main thread for better performance
 */

import {
  calculatePegPositions,
  getLinePixels,
  getMinPegDistance,
  type Peg,
  type Point
} from '../lib/geometry';
import {
  createDarknessArray,
  scoreLine,
  drawLine
} from '../lib/imageProcessing';
import type { StringArtConfig, StringArtResult } from '../lib/stringArt';

interface WorkerMessage {
  type: 'generate';
  imageData: ImageData;
  config: StringArtConfig;
}

interface ProgressMessage {
  type: 'progress';
  iteration: number;
  total: number;
  currentPeg: number;
}

interface ResultMessage {
  type: 'result';
  result: StringArtResult;
}

interface ErrorMessage {
  type: 'error';
  error: string;
}

type WorkerResponse = ProgressMessage | ResultMessage | ErrorMessage;

// Line cache for worker
class LineCache {
  private cache: Map<string, Point[]> = new Map();
  
  getKey(from: number, to: number): string {
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

// Generate string art in worker
async function generateStringArtInWorker(
  imageData: ImageData,
  config: StringArtConfig
): Promise<StringArtResult> {
  const { pegsPerSide, iterations, lineOpacity, imageSize } = config;
  
  const pegs = calculatePegPositions(pegsPerSide, imageSize);
  const totalPegs = pegs.length;
  // Use optimized minimum distance for small peg counts
  const minDistance = getMinPegDistance(totalPegs);
  
  const darkness = createDarknessArray(imageData);
  const lineCache = new LineCache();
  const connections: number[] = [];
  
  let currentPeg = 0;
  connections.push(currentPeg);
  
  for (let iteration = 0; iteration < iterations; iteration++) {
    let bestScore = -1;
    let bestPeg = -1;
    let bestPixels: Point[] = [];
    
    const currentPegData = pegs[currentPeg];
    
    for (let nextPeg = 0; nextPeg < totalPegs; nextPeg++) {
      if (nextPeg === currentPeg) continue;
      
      const distance = Math.abs(nextPeg - currentPeg);
      const wrappedDistance = Math.min(distance, totalPegs - distance);
      if (wrappedDistance < minDistance) continue;
      
      const pixels = lineCache.getOrCalculate(currentPegData, pegs[nextPeg]);
      const score = scoreLine(pixels, darkness, imageSize, imageSize);
      
      if (score > bestScore) {
        bestScore = score;
        bestPeg = nextPeg;
        bestPixels = pixels;
      }
    }
    
    if (bestPeg === -1 || bestScore <= 0) {
      break;
    }
    
    drawLine(bestPixels, darkness, lineOpacity, imageSize, imageSize);
    currentPeg = bestPeg;
    connections.push(currentPeg);
    
    // Report progress
    if (iteration % 10 === 0) {
      self.postMessage({
        type: 'progress',
        iteration,
        total: iterations,
        currentPeg
      } as ProgressMessage);
    }
  }
  
  // Final progress update
  self.postMessage({
    type: 'progress',
    iteration: iterations,
    total: iterations,
    currentPeg
  } as ProgressMessage);
  
  return {
    connections,
    pegs,
    imageSize
  };
}

// Listen for messages from main thread
self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const { type, imageData, config } = event.data;
  
  if (type === 'generate') {
    try {
      const result = await generateStringArtInWorker(imageData, config);
      self.postMessage({
        type: 'result',
        result
      } as ResultMessage);
    } catch (error) {
      self.postMessage({
        type: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      } as ErrorMessage);
    }
  }
});

export type { WorkerMessage, WorkerResponse };

