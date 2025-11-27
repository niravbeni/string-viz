'use client';

import { useEffect, useRef } from 'react';
import { drawStringArt, type StringArtResult } from '@/lib/stringArt';

interface CanvasProps {
  imageData?: ImageData;
  result?: StringArtResult;
  progress?: number;
  className?: string;
  title?: string;
}

export default function Canvas({ 
  imageData, 
  result, 
  progress = 100,
  className = '',
  title 
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw source image if provided
    if (imageData && !result) {
      ctx.putImageData(imageData, 0, 0);
    }
    
    // Draw string art if result is provided
    if (result) {
      // Calculate how many lines to draw based on progress
      const maxLines = Math.floor((result.connections.length - 1) * (progress / 100));
      
      // Draw on white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the string art
      drawStringArt(ctx, result, '#000000', 0.5, maxLines);
    }
  }, [imageData, result, progress]);
  
  return (
    <div className={`flex flex-col ${className}`}>
      {title && (
        <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      )}
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={800}
          height={800}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

