'use client';

import { useState } from 'react'; // eslint-disable-line @typescript-eslint/no-unused-vars
import Link from 'next/link';
import { Plus, Code, Play, Settings } from 'lucide-react';

export default function DashboardPage() {
  const [projects] = useState([
    {
      id: '1',
      name: 'My First Project',
      description: 'A simple JavaScript project',
      language: 'javascript',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Python Script',
      description: 'Python automation script',
      language: 'python',
      createdAt: new Date('2024-01-20'),
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Terkix Builder</h1>
              <p className="mt-1 text-sm text-slate-400">Your personal IDE platform</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus size={18} />
              New Project
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-12">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Projects</p>
                <p className="text-3xl font-bold text-white">{projects.length}</p>
              </div>
              <Code className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Builds</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <Play className="text-green-500" size={32} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Storage Used</p>
                <p className="text-3xl font-bold text-white">0 MB</p>
              </div>
              <Settings className="text-purple-500" size={32} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Executions</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <Code className="text-orange-500" size={32} />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-white">Your Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/editor/${project.id}`}>
                <div className="group cursor-pointer rounded-lg border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-blue-500 hover:bg-slate-800">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">{project.description}</p>
                    </div>
                    <span className="rounded bg-slate-700 px-2 py-1 text-xs font-medium text-slate-300">
                      {project.language}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Created {project.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}

            {/* New Project Card */}
            <button className="rounded-lg border-2 border-dashed border-slate-600 bg-slate-800/25 p-6 transition-all hover:border-blue-500 hover:bg-slate-800/50">
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <Plus size={32} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-400">Create New Project</span>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
