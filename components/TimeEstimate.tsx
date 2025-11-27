'use client';

import { useMemo } from 'react';
import { 
  calculateTimeEstimates, 
  formatDigitalTime, 
  formatPhysicalTime,
  formatThreadLength 
} from '@/lib/timeEstimates';

interface TimeEstimateProps {
  pegsPerSide: number;
  iterations: number;
}

export default function TimeEstimate({ pegsPerSide, iterations }: TimeEstimateProps) {
  const estimates = useMemo(() => 
    calculateTimeEstimates(pegsPerSide, iterations),
    [pegsPerSide, iterations]
  );
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 space-y-3 border border-blue-100">
      <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Time Estimates
      </h3>
      
      {/* Digital Generation */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">
            💻 Digital Generation
          </span>
          <span className="text-xs font-semibold text-blue-700">
            {formatDigitalTime(estimates.digital.min)}
            {estimates.digital.max > estimates.digital.min && 
              ` - ${formatDigitalTime(estimates.digital.max)}`
            }
          </span>
        </div>
      </div>
      
      {/* Physical Build */}
      <div className="space-y-2 pt-2 border-t border-blue-200">
        <div className="text-xs font-medium text-gray-600">
          🔨 Physical Build Time
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-gray-500 mb-1">Beginner</div>
            <div className="font-semibold text-orange-600">
              {formatPhysicalTime(estimates.physical.beginner)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 mb-1">Average</div>
            <div className="font-semibold text-blue-600">
              {formatPhysicalTime(estimates.physical.average)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 mb-1">Expert</div>
            <div className="font-semibold text-green-600">
              {formatPhysicalTime(estimates.physical.experienced)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Thread Length */}
      <div className="pt-2 border-t border-blue-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">
            🧵 Thread Needed
          </span>
          <span className="text-xs font-semibold text-purple-700">
            {formatThreadLength(estimates.threadLength.min)}
            {' - '}
            {formatThreadLength(estimates.threadLength.max)}
          </span>
        </div>
      </div>
      
      {/* Helpful tip based on time */}
      {estimates.physical.average <= 30 && (
        <div className="pt-2 text-xs text-green-700 bg-green-50 rounded px-2 py-1.5 border border-green-200">
          ⚡ Quick build! Perfect for testing or simple letters.
        </div>
      )}
      {estimates.physical.average > 30 && estimates.physical.average <= 90 && (
        <div className="pt-2 text-xs text-blue-700 bg-blue-50 rounded px-2 py-1.5 border border-blue-200">
          👍 Reasonable build time for a detailed piece.
        </div>
      )}
      {estimates.physical.average > 90 && (
        <div className="pt-2 text-xs text-amber-700 bg-amber-50 rounded px-2 py-1.5 border border-amber-200">
          ⏰ This will take a while - consider fewer iterations for faster building.
        </div>
      )}
    </div>
  );
}

