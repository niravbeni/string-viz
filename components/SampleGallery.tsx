'use client';

import Image from 'next/image';

interface SampleGalleryProps {
  onSampleSelect: (imagePath: string) => void;
  disabled?: boolean;
}

interface SampleImage {
  path: string;
  name: string;
  description: string;
  recommendedPegs: number;
  recommendedIterations: number;
}

const sampleImages: SampleImage[] = [
  {
    path: '/images/i.png',
    name: 'Letter I',
    description: 'Simple vertical letter',
    recommendedPegs: 4,
    recommendedIterations: 200
  },
  {
    path: '/images/o.png',
    name: 'Letter O',
    description: 'Circular letter',
    recommendedPegs: 8,
    recommendedIterations: 300
  },
  {
    path: '/images/d.png',
    name: 'Letter D',
    description: 'Half-circle letter',
    recommendedPegs: 10,
    recommendedIterations: 400
  },
  {
    path: '/images/e.png',
    name: 'Letter E',
    description: 'Horizontal bars',
    recommendedPegs: 8,
    recommendedIterations: 350
  }
];

export default function SampleGallery({ onSampleSelect, disabled = false }: SampleGalleryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Sample Letters
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Click any letter to try it out!
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sampleImages.map((sample) => (
          <button
            key={sample.path}
            onClick={() => onSampleSelect(sample.path)}
            disabled={disabled}
            className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              disabled 
                ? 'opacity-50 cursor-not-allowed border-gray-200' 
                : 'border-gray-300 hover:border-blue-500 hover:shadow-lg cursor-pointer'
            }`}
          >
            {/* Image */}
            <div className="relative w-full h-full bg-gray-100">
              <Image
                src={sample.path}
                alt={sample.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            
            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity ${
              !disabled && 'group-hover:opacity-100'
            } flex flex-col justify-end p-3`}>
              <div className="text-white text-left">
                <div className="font-semibold text-sm mb-1">{sample.name}</div>
                <div className="text-xs opacity-90 mb-1">{sample.description}</div>
                <div className="text-xs">
                  <span className="inline-block bg-white/20 rounded px-2 py-0.5 mr-1">
                    {sample.recommendedPegs} pegs
                  </span>
                  <span className="inline-block bg-white/20 rounded px-2 py-0.5">
                    {sample.recommendedIterations} iter
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> These samples work great with "Minimal" or "Low" presets. 
          Remember to check "Invert Colors" if the letter is white on black!
        </p>
      </div>
    </div>
  );
}

