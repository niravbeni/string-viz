'use client';

import { StringArtConfig } from '@/lib/stringArt';
import TimeEstimate from './TimeEstimate';

interface ControlsProps {
  config: StringArtConfig;
  onConfigChange: (config: StringArtConfig) => void;
  onGenerate: () => void;
  onReset: () => void;
  isGenerating: boolean;
  hasImage: boolean;
  invertColors: boolean;
  onInvertChange: (invert: boolean) => void;
}

export default function Controls({
  config,
  onConfigChange,
  onGenerate,
  onReset,
  isGenerating,
  hasImage,
  invertColors,
  onInvertChange
}: ControlsProps) {
  const handlePegsChange = (value: number) => {
    onConfigChange({ ...config, pegsPerSide: value });
  };
  
  const handleIterationsChange = (value: number) => {
    onConfigChange({ ...config, iterations: value });
  };
  
  const handleOpacityChange = (value: number) => {
    onConfigChange({ ...config, lineOpacity: value });
  };
  
  const applyPreset = (preset: 'minimal' | 'low' | 'medium' | 'high') => {
    const presets = {
      minimal: { pegsPerSide: 4, iterations: 200, lineOpacity: 0.3 },
      low: { pegsPerSide: 10, iterations: 500, lineOpacity: 0.28 },
      medium: { pegsPerSide: 25, iterations: 1500, lineOpacity: 0.25 },
      high: { pegsPerSide: 50, iterations: 3000, lineOpacity: 0.23 }
    };
    onConfigChange({ ...config, ...presets[preset] });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Controls</h2>
      
      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quality Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => applyPreset('minimal')}
            disabled={isGenerating}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Minimal
          </button>
          <button
            onClick={() => applyPreset('low')}
            disabled={isGenerating}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Low
          </button>
          <button
            onClick={() => applyPreset('medium')}
            disabled={isGenerating}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Medium
          </button>
          <button
            onClick={() => applyPreset('high')}
            disabled={isGenerating}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            High
          </button>
        </div>
      </div>
      
      {/* Pegs Per Side */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pegs Per Side: {config.pegsPerSide} ({config.pegsPerSide * 4} total)
        </label>
        <input
          type="range"
          min="4"
          max="100"
          step="1"
          value={config.pegsPerSide}
          onChange={(e) => handlePegsChange(Number(e.target.value))}
          disabled={isGenerating}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>4 (geometric)</span>
          <span>25 (balanced)</span>
          <span>100 (detailed)</span>
        </div>
      </div>
      
      {/* Iterations */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Iterations: {config.iterations}
        </label>
        <input
          type="range"
          min="50"
          max="5000"
          step="50"
          value={config.iterations}
          onChange={(e) => handleIterationsChange(Number(e.target.value))}
          disabled={isGenerating}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>50 (quick)</span>
          <span>1500 (standard)</span>
          <span>5000 (max)</span>
        </div>
      </div>
      
      {/* Line Opacity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Line Opacity: {(config.lineOpacity * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0.05"
          max="0.5"
          step="0.05"
          value={config.lineOpacity}
          onChange={(e) => handleOpacityChange(Number(e.target.value))}
          disabled={isGenerating}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>5% (light)</span>
          <span>25% (standard)</span>
          <span>50% (bold)</span>
        </div>
      </div>
      
      {/* Invert Colors */}
      <div className="pt-2">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={invertColors}
            onChange={(e) => onInvertChange(e.target.checked)}
            disabled={isGenerating}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="text-sm font-medium text-gray-700">
            Invert Colors
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-1 ml-7">
          Swap black ↔ white (useful for white logos on black backgrounds)
        </p>
      </div>
      
      {/* Time Estimates */}
      <div className="pt-4">
        <TimeEstimate 
          pegsPerSide={config.pegsPerSide}
          iterations={config.iterations}
        />
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <button
          onClick={onGenerate}
          disabled={!hasImage || isGenerating}
          className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Generating...' : 'Generate String Art'}
        </button>
        
        <button
          onClick={onReset}
          disabled={isGenerating}
          className="w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

