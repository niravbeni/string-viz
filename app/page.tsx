'use client';

import { useState, useCallback } from 'react';
import Canvas from '@/components/Canvas';
import Controls from '@/components/Controls';
import ImageUpload from '@/components/ImageUpload';
import InstructionExport from '@/components/InstructionExport';
import SampleGallery from '@/components/SampleGallery';
import { loadImage, imageToGrayscale } from '@/lib/imageProcessing';
import { generateStringArt, type StringArtConfig, type StringArtResult } from '@/lib/stringArt';

export default function Home() {
  const [config, setConfig] = useState<StringArtConfig>({
    pegsPerSide: 10,
    iterations: 500,
    lineOpacity: 0.28,
    imageSize: 800
  });
  
  const [sourceImage, setSourceImage] = useState<ImageData | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [result, setResult] = useState<StringArtResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [invertColors, setInvertColors] = useState(false);
  
  const handleImageSelect = useCallback(async (file: File) => {
    try {
      const img = await loadImage(file);
      setOriginalImage(img);
      const imageData = imageToGrayscale(img, config.imageSize, invertColors);
      setSourceImage(imageData);
      setResult(null);
      setProgress(0);
    } catch (error) {
      console.error('Error loading image:', error);
      alert('Failed to load image. Please try another file.');
    }
  }, [config.imageSize, invertColors]);
  
  const handleSampleSelect = useCallback(async (imagePath: string) => {
    try {
      // Load image from path
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const file = new File([blob], imagePath.split('/').pop() || 'sample.png', { type: 'image/png' });
      await handleImageSelect(file);
    } catch (error) {
      console.error('Error loading sample image:', error);
      alert('Failed to load sample image.');
    }
  }, [handleImageSelect]);
  
  // Re-process image when invert toggle changes
  const handleInvertToggle = useCallback(async (newInvertValue: boolean) => {
    setInvertColors(newInvertValue);
    
    // If we have the original image, re-process it with new invert setting
    if (originalImage) {
      try {
        const imageData = imageToGrayscale(originalImage, config.imageSize, newInvertValue);
        setSourceImage(imageData);
        setResult(null);
        setProgress(0);
      } catch (error) {
        console.error('Error re-processing image:', error);
      }
    }
  }, [originalImage, config.imageSize]);
  
  const handleGenerate = useCallback(async () => {
    if (!sourceImage) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    try {
      const generatedResult = await generateStringArt(
        sourceImage,
        config,
        (iteration, total) => {
          setProgress((iteration / total) * 100);
        }
      );
      
      setResult(generatedResult);
      setProgress(100);
    } catch (error) {
      console.error('Error generating string art:', error);
      alert('Failed to generate string art. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [sourceImage, config]);
  
  const handleReset = useCallback(() => {
    setSourceImage(null);
    setOriginalImage(null);
    setResult(null);
    setProgress(0);
  }, []);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            String Art Generator
          </h1>
          <p className="text-lg text-gray-600">
            Transform images into beautiful string art patterns
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Inspired by{' '}
            <a
              href="https://artof01.com/vrellis/works/knit.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Petros Vrellis
            </a>
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <Controls
              config={config}
              onConfigChange={setConfig}
              onGenerate={handleGenerate}
              onReset={handleReset}
              isGenerating={isGenerating}
              hasImage={sourceImage !== null}
              invertColors={invertColors}
              onInvertChange={handleInvertToggle}
            />
            
            {result && <InstructionExport result={result} />}
          </div>
          
          {/* Right Column - Canvas Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sample Gallery - Show when no image loaded */}
            {!sourceImage && !result && (
              <SampleGallery
                onSampleSelect={handleSampleSelect}
                disabled={isGenerating}
              />
            )}
            
            {/* Image Upload */}
            {!sourceImage && !result && (
              <ImageUpload 
                onImageSelect={handleImageSelect}
                disabled={isGenerating}
              />
            )}
            
            {/* Canvas Display */}
            {(sourceImage || result) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sourceImage && (
                  <Canvas
                    imageData={sourceImage}
                    title="Source Image"
                    className="w-full"
                  />
                )}
                
                {result && (
                  <div className="space-y-2">
                    <Canvas
                      result={result}
                      progress={progress}
                      title="String Art Result"
                      className="w-full"
                    />
                    {isGenerating && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
            />
                      </div>
                    )}
                    {isGenerating && (
                      <p className="text-sm text-center text-gray-600">
                        Generating... {Math.round(progress)}%
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Instructions */}
            {!sourceImage && !result && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">How it works</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Upload an image (portraits work best)</li>
                  <li>Adjust the parameters (pegs, iterations, opacity)</li>
                  <li>Click "Generate String Art" and watch the algorithm work</li>
                  <li>Download the peg connection instructions to recreate physically</li>
                </ol>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                  <h3 className="font-semibold text-blue-900 mb-2">Algorithm Details</h3>
                  <p className="text-sm text-blue-800">
                    The generator uses a greedy algorithm to find the optimal sequence of 
                    connections between pegs. Starting from a random peg, it iteratively 
                    selects the next connection that best matches the darkness in the source 
                    image, gradually building up the complete picture with a single continuous thread.
                  </p>
                </div>
                
                <div className="mt-4 p-4 bg-green-50 rounded-md">
                  <h3 className="font-semibold text-green-900 mb-2">✨ Small Peg Support</h3>
                  <p className="text-sm text-green-800">
                    Now supports as few as 4 pegs per side! Perfect for geometric art, 
                    letters, and symbols. Use the "Minimal" or "Low" presets for quick, 
                    bold designs that are easy to build physically.
                  </p>
                </div>
              </div>
            )}
            
            {/* Small Peg Count Tip */}
            {sourceImage && config.pegsPerSide < 15 && !result && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">
                      Small peg count detected ({config.pegsPerSide} pegs/side)
                    </h3>
                    <p className="mt-1 text-sm text-amber-700">
                      Best for: <strong>Letters, geometric shapes, bold designs</strong>. 
                      Use high-contrast images with simple shapes for best results.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </main>
  );
}
