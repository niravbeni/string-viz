/**
 * Geometry utilities for string art generation
 */

export interface Point {
  x: number;
  y: number;
}

export interface Peg {
  index: number;
  x: number;
  y: number;
}

/**
 * Calculate positions of pegs around a square frame
 * @param pegsPerSide Number of pegs on each side
 * @param size Size of the square frame
 * @returns Array of peg positions
 */
export function calculatePegPositions(pegsPerSide: number, size: number): Peg[] {
  const pegs: Peg[] = [];
  const totalPegs = pegsPerSide * 4;
  const spacing = size / pegsPerSide;
  
  let index = 0;
  
  // Top side (left to right)
  for (let i = 0; i < pegsPerSide; i++) {
    pegs.push({
      index: index++,
      x: i * spacing,
      y: 0
    });
  }
  
  // Right side (top to bottom)
  for (let i = 0; i < pegsPerSide; i++) {
    pegs.push({
      index: index++,
      x: size,
      y: i * spacing
    });
  }
  
  // Bottom side (right to left)
  for (let i = 0; i < pegsPerSide; i++) {
    pegs.push({
      index: index++,
      x: size - i * spacing,
      y: size
    });
  }
  
  // Left side (bottom to top)
  for (let i = 0; i < pegsPerSide; i++) {
    pegs.push({
      index: index++,
      x: 0,
      y: size - i * spacing
    });
  }
  
  return pegs;
}

/**
 * Get line pixels using Bresenham's line algorithm
 * Returns array of {x, y} coordinates
 */
export function getLinePixels(x0: number, y0: number, x1: number, y1: number): Point[] {
  const pixels: Point[] = [];
  
  x0 = Math.round(x0);
  y0 = Math.round(y0);
  x1 = Math.round(x1);
  y1 = Math.round(y1);
  
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  
  let x = x0;
  let y = y0;
  
  while (true) {
    pixels.push({ x, y });
    
    if (x === x1 && y === y1) break;
    
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
  
  return pixels;
}

/**
 * Calculate distance between two points
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate the minimum distance between pegs to avoid
 * (skip very close pegs as they don't contribute much)
 */
export function getMinPegDistance(totalPegs: number): number {
  // For very small peg counts, allow closer connections
  // For larger counts, skip at least 10% of pegs around the perimeter
  if (totalPegs <= 20) {
    return Math.max(1, Math.floor(totalPegs * 0.05)); // Allow most connections
  } else if (totalPegs <= 40) {
    return Math.max(2, Math.floor(totalPegs * 0.08)); // Slightly more restrictive
  } else {
    return Math.max(Math.floor(totalPegs * 0.1), 5); // Original logic for larger counts
  }
}

