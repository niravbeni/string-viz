/**
 * Custom hook to use the String Art Web Worker
 */

import { useCallback, useRef, useState } from 'react';
import type { StringArtConfig, StringArtResult } from './stringArt';

interface UseStringArtWorkerReturn {
  generate: (imageData: ImageData, config: StringArtConfig) => Promise<StringArtResult>;
  progress: number;
  isGenerating: boolean;
  error: string | null;
}

export function useStringArtWorker(): UseStringArtWorkerReturn {
  const workerRef = useRef<Worker | null>(null);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generate = useCallback(async (
    imageData: ImageData,
    config: StringArtConfig
  ): Promise<StringArtResult> => {
    setIsGenerating(true);
    setProgress(0);
    setError(null);
    
    return new Promise((resolve, reject) => {
      // Create worker if it doesn't exist
      if (!workerRef.current) {
        workerRef.current = new Worker(
          new URL('../workers/stringArt.worker.ts', import.meta.url),
          { type: 'module' }
        );
      }
      
      const worker = workerRef.current;
      
      // Set up message handler
      const handleMessage = (event: MessageEvent) => {
        const { type } = event.data;
        
        if (type === 'progress') {
          const { iteration, total } = event.data;
          setProgress((iteration / total) * 100);
        } else if (type === 'result') {
          const { result } = event.data;
          setIsGenerating(false);
          setProgress(100);
          worker.removeEventListener('message', handleMessage);
          resolve(result);
        } else if (type === 'error') {
          const { error } = event.data;
          setIsGenerating(false);
          setError(error);
          worker.removeEventListener('message', handleMessage);
          reject(new Error(error));
        }
      };
      
      worker.addEventListener('message', handleMessage);
      
      // Send work to worker
      worker.postMessage({
        type: 'generate',
        imageData,
        config
      });
    });
  }, []);
  
  return {
    generate,
    progress,
    isGenerating,
    error
  };
}

