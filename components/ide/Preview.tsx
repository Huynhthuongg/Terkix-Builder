'use client';

import { useState } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';

interface PreviewProps {
  projectId: string;
  url?: string;
  isLoading?: boolean;
}

export default function Preview({ projectId, url, isLoading = false }: PreviewProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-300 bg-slate-50 px-4 py-2">
        <span className="text-sm font-medium text-slate-700">Preview</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-1 hover:bg-slate-200 rounded transition-colors"
            disabled={isLoading}
          >
            <RefreshCw
              size={16}
              className={`text-slate-600 ${isLoading ? 'animate-spin' : ''}`}
            />
          </button>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-slate-200 rounded transition-colors"
            >
              <ExternalLink size={16} className="text-slate-600" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {url ? (
          <iframe
            key={refreshKey}
            src={url}
            className="h-full w-full border-none"
            title="Preview"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-slate-600 mb-2">No preview available</p>
              <p className="text-sm text-slate-500">
                Run your project to see the preview here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
