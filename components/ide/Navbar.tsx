"use client";

import { ChevronRight, Play, Save, Share2, Settings, Home } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  projectName?: string;
  projectId?: string;
  onSave?: () => void;
  onRun?: () => void;
  onShare?: () => void;
  isSaving?: boolean;
  isRunning?: boolean;
}

export default function Navbar({
  projectName = "My Project",
  projectId,
  onSave,
  onRun,
  onShare,
  isSaving = false,
  isRunning = false,
}: NavbarProps) {
  return (
    <header className="border-b border-slate-700 bg-slate-800/50 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-slate-300"
          >
            <Home size={16} />
          </Link>
          <ChevronRight size={16} className="text-slate-600" />
          <span className="text-sm font-medium text-white">{projectName}</span>
          {projectId && (
            <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-400">
              {projectId}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={onRun}
            disabled={isRunning}
            className="inline-flex items-center gap-2 rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Play size={16} />
            {isRunning ? "Running..." : "Run"}
          </button>

          <button
            onClick={onShare}
            className="inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <Share2 size={16} />
            Share
          </button>

          <button className="inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
