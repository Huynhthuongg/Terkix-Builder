"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Github,
  Globe2,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Wrench,
} from "lucide-react";

type Repository = {
  name: string;
  url: string;
  role: string;
  lane: "Core" | "AI" | "Dashboard" | "Storage" | "Deploy" | "Tools" | "Docs";
  priority: "Live shell" | "Merge" | "Reference";
};

const repositories: Repository[] = [
  {
    name: "Terkix-Builder",
    url: "https://github.com/Huynhthuongg/Terkix-Builder",
    role: "Next.js IDE shell, editor workspace, project APIs, and public landing surface.",
    lane: "Core",
    priority: "Live shell",
  },
  {
    name: "Terkix",
    url: "https://github.com/Huynhthuongg/Terkix",
    role: "Main brand source for product wording, Terkix identity, and launch direction.",
    lane: "Core",
    priority: "Merge",
  },
  {
    name: "rkix-terkix",
    url: "https://github.com/Huynhthuongg/rkix-terkix",
    role: "RKIX + Terkix bridge content for the unified platform storyline.",
    lane: "Core",
    priority: "Merge",
  },
  {
    name: "RKIX3",
    url: "https://github.com/RKIX3/RKIX3",
    role: "RKIX3 organization layer for agent naming, roadmap cues, and public links.",
    lane: "Core",
    priority: "Merge",
  },
  {
    name: "Rkix3.ai",
    url: "https://github.com/Huynhthuongg/Rkix3.ai",
    role: "AI homepage concept and future rkix3.ai launch material.",
    lane: "AI",
    priority: "Merge",
  },
  {
    name: "rkix3-chatbot",
    url: "https://github.com/Huynhthuongg/rkix3-chatbot",
    role: "Chatbot UI and assistant behavior to fold into the first AI page.",
    lane: "AI",
    priority: "Merge",
  },
  {
    name: "ai-research-agent",
    url: "https://github.com/Huynhthuongg/ai-research-agent",
    role: "Research-agent feature track for summaries, knowledge lookup, and automation.",
    lane: "AI",
    priority: "Merge",
  },
  {
    name: "Agent",
    url: "https://github.com/Huynhthuongg/Agent",
    role: "Agent runtime ideas and command flows for the assistant experience.",
    lane: "AI",
    priority: "Merge",
  },
  {
    name: "Agent-Tool",
    url: "https://github.com/Huynhthuongg/Agent-Tool",
    role: "Tool registry concepts for actions available inside the AI product.",
    lane: "Tools",
    priority: "Merge",
  },
  {
    name: "Gitbot",
    url: "https://github.com/Huynhthuongg/Gitbot",
    role: "Git automation lane for repository import, sync, and release actions.",
    lane: "Tools",
    priority: "Merge",
  },
  {
    name: "tools",
    url: "https://github.com/Huynhthuongg/tools",
    role: "General tools inventory to expose as utility cards after validation.",
    lane: "Tools",
    priority: "Reference",
  },
  {
    name: "dashboard-rkix",
    url: "https://github.com/Huynhthuongg/dashboard-rkix",
    role: "Dashboard components and metrics vocabulary for the launch console.",
    lane: "Dashboard",
    priority: "Merge",
  },
  {
    name: "dashboard",
    url: "https://github.com/Huynhthuongg/dashboard",
    role: "Secondary dashboard layouts and admin panels to compare before merging.",
    lane: "Dashboard",
    priority: "Reference",
  },
  {
    name: "friendlychat",
    url: "https://github.com/Huynhthuongg/friendlychat",
    role: "Chat experience reference for lightweight conversation UI patterns.",
    lane: "AI",
    priority: "Reference",
  },
  {
    name: "my-vercel-mixedbread-app",
    url: "https://github.com/Huynhthuongg/my-vercel-mixedbread-app",
    role: "Vercel AI app reference for production hosting and model integrations.",
    lane: "Deploy",
    priority: "Merge",
  },
  {
    name: "express-js-on-vercel",
    url: "https://github.com/Huynhthuongg/express-js-on-vercel",
    role: "Serverless Express reference for API routes that can run on Vercel.",
    lane: "Deploy",
    priority: "Reference",
  },
  {
    name: "domains",
    url: "https://github.com/Huynhthuongg/domains",
    role: "Domain inventory and DNS handoff notes for terkix.dev / .com publishing.",
    lane: "Deploy",
    priority: "Merge",
  },
  {
    name: "Terkix-RKix-Storage",
    url: "https://github.com/Huynhthuongg/Terkix-RKix-Storage",
    role: "Storage concepts and file persistence path for user projects.",
    lane: "Storage",
    priority: "Merge",
  },
  {
    name: "TerKix-MCP",
    url: "https://github.com/Huynhthuongg/TerKix-MCP",
    role: "MCP integration target for connecting tools, agents, and external services.",
    lane: "Tools",
    priority: "Merge",
  },
  {
    name: "AGENTS.RKIX3",
    url: "https://github.com/Huynhthuongg/AGENTS.RKIX3",
    role: "Agent operating rules and workspace instructions for RKIX3-specific work.",
    lane: "Docs",
    priority: "Reference",
  },
  {
    name: "AGENTS.md",
    url: "https://github.com/Huynhthuongg/AGENTS.md",
    role: "General agent rules to preserve when importing the wider repository set.",
    lane: "Docs",
    priority: "Reference",
  },
  {
    name: "vscode-docs",
    url: "https://github.com/Huynhthuongg/vscode-docs",
    role: "Developer documentation reference for editor-style documentation pages.",
    lane: "Docs",
    priority: "Reference",
  },
  {
    name: "Dev",
    url: "https://github.com/Huynhthuongg/Dev",
    role: "Developer workspace notes and experiments to review before production merge.",
    lane: "Docs",
    priority: "Reference",
  },
  {
    name: "Botl-wed",
    url: "https://github.com/Huynhthuongg/Botl-wed",
    role: "Bot web ideas that can become launch-page assistant blocks.",
    lane: "AI",
    priority: "Reference",
  },
  {
    name: "mintlify-starter",
    url: "https://github.com/Huynhthuongg/mintlify-starter",
    role: "Docs site starter for future public API and AI-agent documentation.",
    lane: "Docs",
    priority: "Reference",
  },
  {
    name: "nest-js-chatbase-template",
    url: "https://github.com/Huynhthuongg/nest-js-chatbase-template",
    role: "Chatbase backend reference for chatbot APIs and NestJS service layout.",
    lane: "AI",
    priority: "Reference",
  },
  {
    name: "GistPad-Design",
    url: "https://github.com/Huynhthuongg/GistPad-Design",
    role: "Design-system inspiration and UI detail reference.",
    lane: "Dashboard",
    priority: "Reference",
  },
  {
    name: "chanfana-openapi-template",
    url: "https://github.com/Huynhthuongg/chanfana-openapi-template",
    role: "OpenAPI template reference for typed public endpoints.",
    lane: "Tools",
    priority: "Reference",
  },
  {
    name: "zapier-platform",
    url: "https://github.com/Huynhthuongg/zapier-platform",
    role: "Automation integration reference for future Zapier-style actions.",
    lane: "Tools",
    priority: "Reference",
  },
  {
    name: "cli",
    url: "https://github.com/Huynhthuongg/cli",
    role: "CLI lane for scripted imports, releases, and local developer actions.",
    lane: "Tools",
    priority: "Reference",
  },
];

const lanes = [
  { label: "Core", icon: Layers, accent: "from-blue-500 to-cyan-400" },
  { label: "AI", icon: BrainCircuit, accent: "from-fuchsia-500 to-violet-400" },
  { label: "Dashboard", icon: Globe2, accent: "from-emerald-500 to-teal-300" },
  { label: "Storage", icon: Database, accent: "from-amber-500 to-orange-300" },
  { label: "Deploy", icon: Cloud, accent: "from-sky-500 to-indigo-400" },
  { label: "Tools", icon: Wrench, accent: "from-lime-500 to-green-300" },
  { label: "Docs", icon: Code2, accent: "from-slate-400 to-slate-200" },
] as const;

const launchSteps = [
  "Import Terkix-Builder into Vercel as the production shell.",
  "Connect the GitHub repositories above as source modules, keeping AI, dashboard, storage, deploy, tools, and docs lanes separated.",
  "Set the custom domain in Vercel to terkix.dev or the .com domain you own, then point DNS to Vercel.",
  "Ship the first public AI page, then connect chat, agent tools, storage, and automation one lane at a time.",
];

const featuredRepos = repositories.filter(
  (repo) => repo.priority !== "Reference",
);
const referenceRepos = repositories.filter(
  (repo) => repo.priority === "Reference",
);
const aiRepos = repositories.filter((repo) => repo.lane === "AI");

const getLaneCount = (lane: Repository["lane"]) =>
  repositories.filter((repo) => repo.lane === lane).length;

export default function DashboardPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.26),_transparent_28rem),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.2),_transparent_30rem),radial-gradient(circle_at_bottom,_rgba(20,184,166,0.12),_transparent_30rem)]" />

      <header className="relative border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/30">
              <Sparkles size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Terkix AI Launch
              </h1>
              <p className="text-xs text-slate-400">
                Unified RKIX3 repository command center
              </p>
            </div>
          </Link>
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-100 sm:inline-flex"
          >
            Deploy to .dev
            <ExternalLink size={16} />
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-slate-950/40">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-200">
              <ShieldCheck size={14} />
              30 repositories mapped into one launch plan
            </div>
            <h2 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Your first Terkix/RKIX3 AI page is now organized as one deployable
              web product.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
              I treated Terkix-Builder as the production shell, grouped the rest
              of your repositories by job, and rebuilt the home screen into a
              public AI launch dashboard that is ready to connect to a real .dev
              or .com deployment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/editor/1"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Test editor
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com/Huynhthuongg/Terkix-Builder"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                View source
                <Github size={16} />
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-fuchsia-400/15 text-fuchsia-200 ring-1 ring-fuchsia-300/20">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI page core</h3>
                <p className="text-sm text-slate-400">
                  Chatbot, agent, research, and bot web tracks
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {aiRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-300/10"
                >
                  <div>
                    <p className="font-medium text-white group-hover:text-fuchsia-100">
                      {repo.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {repo.role}
                    </p>
                  </div>
                  <ExternalLink size={15} className="shrink-0 text-slate-500" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            {
              label: "Repos imported",
              value: repositories.length,
              icon: Github,
            },
            { label: "Merge first", value: featuredRepos.length, icon: Rocket },
            { label: "Reference", value: referenceRepos.length, icon: Code2 },
            { label: "AI modules", value: aiRepos.length, icon: BrainCircuit },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 text-3xl font-black text-white">{value}</p>
                </div>
                <Icon className="text-cyan-300" size={30} />
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
                Repository lanes
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Selection map for the main project
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Merge items become product features; reference items stay as
              source material until their code is reviewed, deduplicated, and
              made safe for the production build.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {lanes.map(({ label, icon: Icon, accent }) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-slate-950/60 p-5"
              >
                <div
                  className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-slate-950`}
                >
                  <Icon size={22} />
                </div>
                <p className="text-lg font-semibold text-white">{label}</p>
                <p className="mt-2 text-sm text-slate-400">
                  {getLaneCount(label)} repositories connected
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/20">
                <Cloud size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Public link plan</h3>
                <p className="text-sm text-slate-400">
                  Not localhost; ready for .dev or .com
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {launchSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-100">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-fuchsia-300">
                  Merge queue
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  High-priority repositories
                </h2>
              </div>
              <TerminalSquare className="text-fuchsia-200" size={28} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {featuredRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan-100">
                      {repo.priority}
                    </span>
                    <ExternalLink size={14} className="text-slate-500" />
                  </div>
                  <h3 className="mt-3 font-semibold text-white group-hover:text-cyan-100">
                    {repo.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {repo.role}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-300">
                Full import list
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Every repository you sent is visible here
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              This keeps the whole archive in the main project while still
              showing which repos should be merged now and which should stay as
              references.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repositories.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200">
                      {repo.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {repo.role}
                    </p>
                  </div>
                  <ExternalLink
                    size={16}
                    className="mt-1 shrink-0 text-slate-500"
                  />
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
                  <span>{repo.lane}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <CheckCircle2 size={14} />
                    {repo.priority}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
