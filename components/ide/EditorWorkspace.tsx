"use client";

import { useState } from "react";
import Navbar from "@/components/ide/Navbar";
import FileExplorer from "@/components/ide/FileExplorer";
import EditorPanel from "@/components/ide/EditorPanel";
import Terminal from "@/components/ide/Terminal";
import { useExecutor } from "@/hooks/useExecutor";
import { useEditorStore } from "@/store/editorStore";

interface EditorWorkspaceProps {
  projectId: string;
}

export default function EditorWorkspace({ projectId }: EditorWorkspaceProps) {
  const { code, language } = useEditorStore();
  const { execute, isExecuting } = useExecutor();
  const [isSaving, setIsSaving] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRun = async () => {
    await execute(code, language, projectId);
  };

  const handleShare = () => {
    window.alert("Share functionality coming soon!");
  };

  return (
    <div className="flex h-screen flex-col bg-slate-900">
      <Navbar
        projectName="My Project"
        projectId={projectId}
        onSave={handleSave}
        onRun={handleRun}
        onShare={handleShare}
        isSaving={isSaving}
        isRunning={isExecuting}
      />

      <div className="flex flex-1 overflow-hidden">
        <FileExplorer projectId={projectId} />

        <div className="flex flex-1 flex-col">
          <EditorPanel projectId={projectId} onRun={handleRun} />

          {showTerminal && (
            <Terminal
              projectId={projectId}
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
