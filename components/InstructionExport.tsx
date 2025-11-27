'use client';

import { exportConnections, type StringArtResult } from '@/lib/stringArt';

interface InstructionExportProps {
  result: StringArtResult | null;
}

export default function InstructionExport({ result }: InstructionExportProps) {
  if (!result) return null;
  
  const downloadInstructions = (format: 'txt' | 'json' | 'csv') => {
    const content = exportConnections(result.connections, format);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `string-art-instructions.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Export Instructions</h2>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Total connections: {result.connections.length}
        </p>
        <p className="text-sm text-gray-600">
          Total pegs: {result.pegs.length}
        </p>
      </div>
      
      <div className="pt-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Download format:
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => downloadInstructions('txt')}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Text (.txt)
          </button>
          <button
            onClick={() => downloadInstructions('json')}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            JSON (.json)
          </button>
          <button
            onClick={() => downloadInstructions('csv')}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            CSV (.csv)
          </button>
        </div>
      </div>
      
      <div className="pt-2">
        <details className="cursor-pointer">
          <summary className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Preview instructions (first 20)
          </summary>
          <div className="mt-2 p-3 bg-gray-50 rounded-md text-xs font-mono max-h-40 overflow-y-auto">
            {result.connections.slice(0, 20).map((peg, i) => (
              <div key={i}>
                {i + 1}. Peg {peg}
              </div>
            ))}
            {result.connections.length > 20 && (
              <div className="text-gray-500 mt-2">
                ... and {result.connections.length - 20} more
              </div>
            )}
          </div>
        </details>
      </div>
    </div>
  );
}

