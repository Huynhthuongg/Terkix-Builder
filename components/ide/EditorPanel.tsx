'use client';

import { useState } from 'react';
import { Code, Eye, Terminal, Settings } from 'lucide-react';
import MonacoEditorComponent from '@/components/editors/MonacoEditor';
import CodeMirrorEditorComponent from '@/components/editors/CodeMirrorEditor';
import AceEditorComponent from '@/components/editors/AceEditor';
import { useEditorStore } from '@/store/editorStore';

interface EditorPanelProps {
  projectId: string;
  onRun?: () => void;
}

export default function EditorPanel({ projectId, onRun }: EditorPanelProps) {
  const {
    code,
    language,
    theme,
    fontSize,
    editorType,
    setCode,
    setLanguage,
    setTheme,
    setFontSize,
    setEditorType,
  } = useEditorStore();

  const [activeTab, setActiveTab] = useState('code');
  const [output, setOutput] = useState('');

  const renderEditor = () => {
    switch (editorType) {
      case 'monaco':
        return (
          <MonacoEditorComponent
            code={code}
            language={language}
            theme={theme === 'dark' ? 'vs-dark' : 'vs'}
            fontSize={fontSize}
            onChange={setCode}
          />
        );
      case 'codemirror':
        return (
          <CodeMirrorEditorComponent
            code={code}
            language={language}
            theme={theme}
            fontSize={fontSize}
            onChange={setCode}
          />
        );
      case 'ace':
        return (
          <AceEditorComponent
            code={code}
            language={language}
            theme={theme}
            fontSize={fontSize}
            onChange={setCode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-slate-900">
      {/* Editor Tabs */}
      <div className="flex border-b border-slate-700 bg-slate-800/50">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'code'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <Code size={16} />
          Code
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'terminal'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <Terminal size={16} />
          Terminal
        </button>

        {/* Settings */}
        <div className="ml-auto flex items-center gap-2 px-4 py-2">
          <select
            value={editorType}
            onChange={(e) => setEditorType(e.target.value as any)}
            className="rounded bg-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-600"
          >
            <option value="monaco">Monaco</option>
            <option value="codemirror">CodeMirror</option>
            <option value="ace">Ace</option>
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded bg-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-600"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="rounded bg-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-600"
          >
            <option value={12}>12px</option>
            <option value={14}>14px</option>
            <option value={16}>16px</option>
            <option value={18}>18px</option>
          </select>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded bg-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-600"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'code' && <div className="h-full">{renderEditor()}</div>}

        {activeTab === 'preview' && (
          <div className="h-full bg-white p-4">
            <div className="rounded border border-slate-300 p-4">
              <p className="text-slate-600">Preview output will appear here...</p>
            </div>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="h-full bg-slate-950 p-4 font-mono text-sm text-green-400 overflow-y-auto">
            <div>{output || '$ Ready to execute...'}</div>
          </div>
        )}
      </div>
    </div>
  );
}
