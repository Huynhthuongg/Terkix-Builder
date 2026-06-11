'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';

interface TerminalProps {
  projectId: string;
  isOpen?: boolean;
  onClose?: () => void;
  height?: string;
}

export default function Terminal({
  projectId,
  isOpen = true,
  onClose,
  height = '200px',
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState<string[]>([
    '$ Welcome to Terkix Builder Terminal',
    '$ Ready to execute commands...',
  ]);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const addOutput = (text: string) => {
    setOutput((prev) => [...prev, text]);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`flex flex-col border-t border-slate-700 bg-slate-950 ${
        isMaximized ? 'fixed inset-0 z-50' : ''
      }`}
      style={!isMaximized ? { height } : {}}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-2">
        <span className="text-sm font-medium text-slate-300">Terminal</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            {isMaximized ? (
              <Minimize2 size={16} className="text-slate-400" />
            ) : (
              <Maximize2 size={16} className="text-slate-400" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            <X size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm text-green-400"
      >
        {output.map((line, index) => (
          <div key={index} className="py-0.5">
            {line}
          </div>
        ))}
        <div className="py-0.5">$ </div>
      </div>
    </div>
  );
}
