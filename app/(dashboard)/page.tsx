"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code,
  Coffee,
  GitBranch,
  Play,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

const projects = [
  {
    id: "1",
    name: "My First Project",
    description: "A simple JavaScript project",
    language: "javascript",
    createdAt: new Date("2024-01-15"),
    status: "Ready",
  },
  {
    id: "2",
    name: "Python Script",
    description: "Python automation script",
    language: "python",
    createdAt: new Date("2024-01-20"),
    status: "Testing",
  },
];

const setupSteps = [
  "Configure Git identity and create an AndroidX checkout folder.",
  "Run repo init with partial clone to keep downloads lightweight.",
  "Sync sources, open frameworks/support, and launch Android Studio via Gradle.",
  "Build archives locally, test Maven artifacts, then upload with repo upload.",
];

const stats = [
  {
    label: "Total Projects",
    value: projects.length.toString(),
    icon: Code,
    color: "text-blue-400",
  },
  { label: "Active Builds", value: "0", icon: Play, color: "text-green-400" },
  {
    label: "Storage Used",
    value: "0 MB",
    icon: Settings,
    color: "text-purple-400",
  },
  {
    label: "Executions",
    value: "0",
    icon: TerminalSquare,
    color: "text-orange-400",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_32rem),radial-gradient(circle_at_top_right,_rgba(20,184,166,0.16),_transparent_28rem)]" />

      <header className="relative border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/30">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Terkix Builder
              </h1>
              <p className="text-xs text-slate-400">
                IDE web platform for focused builds
              </p>
            </div>
          </Link>
          <button className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400">
            <Plus size={18} />
            New Project
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-slate-950/40">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200">
              <ShieldCheck size={14} />
              Reviewed workspace health and build readiness
            </div>
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              Build, test, and prepare contribution workflows from one polished
              dashboard.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              The interface now highlights project status, runtime actions, and
              an AndroidX-ready setup checklist so contributors can move from
              checkout to local validation faster.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/editor/1"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Open editor
                <ArrowRight size={16} />
              </Link>
              <a
                href="#androidx-workflow"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                View AndroidX workflow
                <Coffee size={16} />
              </a>
            </div>
          </div>

          <div
            id="androidx-workflow"
            className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-400/15 text-orange-200 ring-1 ring-orange-300/20">
                <GitBranch size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  AndroidX contribution flow
                </h3>
                <p className="text-sm text-slate-400">
                  Checkout, build, test, upload
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {setupSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-200">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 text-3xl font-bold text-white">{value}</p>
                </div>
                <Icon className={color} size={30} />
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">
                Workspace
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Your Projects
              </h2>
            </div>
            <p className="hidden max-w-md text-sm text-slate-400 md:block">
              Quick project cards now surface language, status, creation date,
              and a clearer open action.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/editor/${project.id}`}>
                <div className="group h-full rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-blue-400/50 hover:bg-slate-900">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-300">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {project.description}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">
                      {project.language}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
                    <span>
                      Created {project.createdAt.toLocaleDateString()}
                    </span>
                    <span className="inline-flex items-center gap-1 text-teal-300">
                      <CheckCircle2 size={14} />
                      {project.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            <button className="rounded-3xl border-2 border-dashed border-slate-600 bg-white/[0.03] p-6 transition hover:border-blue-400 hover:bg-blue-500/10">
              <div className="flex h-full min-h-40 flex-col items-center justify-center gap-3 text-center">
                <Plus size={34} className="text-slate-300" />
                <span className="text-sm font-semibold text-slate-200">
                  Create New Project
                </span>
                <span className="text-xs text-slate-500">
                  Start from JavaScript, Python, or an AndroidX workflow.
                </span>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
