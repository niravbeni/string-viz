/**
 * Calculate time estimates for string art generation and physical building
 */

export interface TimeEstimates {
  digital: {
    min: number;  // seconds
    max: number;  // seconds
  };
  physical: {
    beginner: number;    // minutes
    average: number;     // minutes
    experienced: number; // minutes
  };
  threadLength: {
    min: number;  // meters
    max: number;  // meters
  };
}

/**
 * Calculate time estimates based on configuration
 */
export function calculateTimeEstimates(
  pegsPerSide: number,
  iterations: number
): TimeEstimates {
  const totalPegs = pegsPerSide * 4;
  
  // Digital generation time (empirical estimates)
  // Base time per iteration varies with peg count
  const baseTimePerIteration = totalPegs <= 20 ? 0.002 : // 2ms for tiny
                                totalPegs <= 40 ? 0.004 : // 4ms for small
                                totalPegs <= 100 ? 0.01 : // 10ms for medium
                                0.02; // 20ms for large
  
  const digitalMin = Math.max(1, Math.floor(baseTimePerIteration * iterations * 0.8));
  const digitalMax = Math.ceil(baseTimePerIteration * iterations * 1.2);
  
  // Physical build time
  // Seconds per connection: beginner ~9s, average ~6s, experienced ~4s
  const beginnerSecsPerLine = 9;
  const averageSecsPerLine = 6;
  const experiencedSecsPerLine = 4;
  
  // Add overhead time (setup, breaks, tying off) - scales slightly with iterations
  const overheadMinutes = 10 + Math.floor(iterations / 500) * 5;
  
  const beginnerMinutes = Math.ceil((iterations * beginnerSecsPerLine / 60) + overheadMinutes);
  const averageMinutes = Math.ceil((iterations * averageSecsPerLine / 60) + overheadMinutes);
  const experiencedMinutes = Math.ceil((iterations * experiencedSecsPerLine / 60) + overheadMinutes);
  
  // Thread length estimate
  // Average line length varies by frame size and peg count
  // Assuming 800px frame, average line is roughly 400-600px depending on connections
  const frameSize = 0.5; // meters (typical physical frame ~50cm)
  const avgLineLength = frameSize * 0.6; // ~30cm average per connection
  const threadMin = Math.floor(iterations * avgLineLength * 0.8);
  const threadMax = Math.ceil(iterations * avgLineLength * 1.2);
  
  return {
    digital: {
      min: digitalMin,
      max: digitalMax
    },
    physical: {
      beginner: beginnerMinutes,
      average: averageMinutes,
      experienced: experiencedMinutes
    },
    threadLength: {
      min: threadMin,
      max: threadMax
    }
  };
}

/**
 * Format seconds into human-readable time
 */
export function formatDigitalTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
}

/**
 * Format minutes into human-readable time
 */
export function formatPhysicalTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
}

/**
 * Format thread length
 */
export function formatThreadLength(meters: number): string {
  if (meters < 1) {
    return `${Math.round(meters * 100)} cm`;
  } else if (meters < 1000) {
    return `${Math.round(meters)} m`;
  } else {
    return `${(meters / 1000).toFixed(1)} km`;
  }
}

