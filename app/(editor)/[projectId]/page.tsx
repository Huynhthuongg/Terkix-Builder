'use client';

import { useState } from 'react';
import Navbar from '@/components/ide/Navbar';
import FileExplorer from '@/components/ide/FileExplorer';
import EditorPanel from '@/components/ide/EditorPanel';
import Terminal from '@/components/ide/Terminal';
import { useExecutor } from '@/hooks/useExecutor';
import { useEditorStore } from '@/store/editorStore';

export default function EditorPage({ params }: { params: { projectId: string } }) {
  const { code, language } = useEditorStore();
  const { execute, isExecuting } = useExecutor();
  const [isSaving, setIsSaving] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement save to backend
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRun = async () => {
    await execute(code, language, params.projectId);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    alert('Share functionality coming soon!');
  };

  return (
    <div className="flex h-screen flex-col bg-slate-900">
      {/* Navbar */}
      <Navbar
        projectName="My Project"
        projectId={params.projectId}
        onSave={handleSave}
        onRun={handleRun}
        onShare={handleShare}
        isSaving={isSaving}
        isRunning={isExecuting}
      />

      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <FileExplorer projectId={params.projectId} />

        {/* Editor and Terminal */}
        <div className="flex flex-1 flex-col">
          {/* Editor Panel */}
          <EditorPanel projectId={params.projectId} onRun={handleRun} />

          {/* Terminal */}
          {showTerminal && (
            <Terminal
              projectId={params.projectId}
              isOpen={showTerminal}
              onClose={() => setShowTerminal(false)}
              height="250px"
            />
          )}
        </div>
      </div>
    </div>
  );
}
