'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Plus, Trash2 } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  isOpen?: boolean;
}

interface FileExplorerProps {
  projectId: string;
  files?: FileItem[];
  onSelectFile?: (fileId: string) => void;
  onCreateFile?: (name: string) => void;
  onDeleteFile?: (fileId: string) => void;
}

export default function FileExplorer({
  projectId,
  files = [
    {
      id: '1',
      name: 'src',
      type: 'folder',
      isOpen: true,
      children: [
        { id: '2', name: 'index.js', type: 'file' },
        { id: '3', name: 'utils.js', type: 'file' },
      ],
    },
    { id: '4', name: 'package.json', type: 'file' },
    { id: '5', name: '.gitignore', type: 'file' },
  ],
  onSelectFile,
  onCreateFile,
  onDeleteFile,
}: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(files.filter((f) => f.isOpen).map((f) => f.id))
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleSelectFile = (fileId: string) => {
    setSelectedFile(fileId);
    onSelectFile?.(fileId);
  };

  const renderFileTree = (items: FileItem[], depth = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <div
          className={`flex items-center gap-1 px-2 py-1 text-sm transition-colors ${
            selectedFile === item.id
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-700'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {item.type === 'folder' ? (
            <>
              <button
                onClick={() => toggleFolder(item.id)}
                className="p-0 hover:bg-slate-600 rounded"
              >
                {expandedFolders.has(item.id) ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
              <Folder size={16} className="text-blue-400" />
              <span className="flex-1">{item.name}</span>
            </>
          ) : (
            <>
              <div className="w-4" />
              <File size={16} className="text-slate-400" />
              <span
                className="flex-1 cursor-pointer"
                onClick={() => handleSelectFile(item.id)}
              >
                {item.name}
              </span>
            </>
          )}
          <button
            onClick={() => onDeleteFile?.(item.id)}
            className="p-0 opacity-0 hover:opacity-100 hover:bg-red-600 rounded transition-opacity"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {item.type === 'folder' &&
          expandedFolders.has(item.id) &&
          item.children &&
          renderFileTree(item.children, depth + 1)}
      </div>
    ));
  };

  return (
    <aside className="w-64 border-r border-slate-700 bg-slate-800/30 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Files</h3>
          <button
            onClick={() => onCreateFile?.('new-file.js')}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
            title="Create new file"
          >
            <Plus size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto">
        {files.length > 0 ? (
          renderFileTree(files)
        ) : (
          <div className="p-4 text-center text-slate-500 text-sm">
            No files yet
          </div>
        )}
      </div>
    </aside>
  );
}
