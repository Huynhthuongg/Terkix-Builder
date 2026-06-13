"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Bot,
  CheckCircle2,
  Code2,
  Eye,
  FileCode,
  Globe2,
  LayoutDashboard,
  Loader2,
  MessageSquare,
  Play,
  Rocket,
  Send,
  Sparkles,
  TerminalSquare,
  User,
  Zap,
} from "lucide-react";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type BuildStep = {
  title: string;
  detail: string;
  status: "done" | "running" | "queued";
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Chào chủ nhân Terkix. Hãy nói trang web bạn muốn build: landing page, dashboard AI, shop, portfolio hoặc app SaaS. Tôi sẽ lập kế hoạch, tạo file và cập nhật màn hình theo dõi build bên phải.",
  },
  {
    id: 2,
    role: "user",
    content:
      "Build cho tao một trang AI có chat, preview và dashboard theo dõi agent làm việc.",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Đã rõ. Tôi đang dựng layout 3 vùng: chat điều khiển, canvas preview trực tiếp và bảng tiến trình agent để thấy AI đang phân tích, viết code, test và chuẩn bị deploy.",
  },
];

const buildSteps: BuildStep[] = [
  {
    title: "Phân tích yêu cầu",
    detail: "Hiểu prompt tiếng Việt và xác định app cần chat AI + web builder.",
    status: "done",
  },
  {
    title: "Thiết kế giao diện",
    detail:
      "Dựng dashboard giống Lovable/Bolt/Replit AI: chat, preview, activity.",
    status: "done",
  },
  {
    title: "Sinh mã trang chính",
    detail: "Cập nhật Next.js dashboard thành AI builder workspace.",
    status: "running",
  },
  {
    title: "Kiểm thử build",
    detail: "Chạy typecheck và production build trước khi deploy.",
    status: "queued",
  },
  {
    title: "Xuất bản public",
    detail: "Kết nối Vercel/domain để có link .dev hoặc .com thật.",
    status: "queued",
  },
];

const generatedFiles = [
  {
    path: "app/(dashboard)/page.tsx",
    label: "AI builder UI",
    status: "editing",
  },
  { path: "app/api/execute/route.ts", label: "Run commands", status: "ready" },
  {
    path: "components/ide/Preview.tsx",
    label: "Live preview",
    status: "ready",
  },
  { path: "imports/repositories.json", label: "Repo memory", status: "synced" },
];

const quickPrompts = [
  "Build landing page AI bán hàng",
  "Tạo dashboard quản lý user",
  "Làm app chat giống ChatGPT",
  "Deploy bản preview cho tao",
];

const statusStyles = {
  done: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  running: "border-cyan-400/50 bg-cyan-400/10 text-cyan-100",
  queued: "border-white/10 bg-white/[0.03] text-slate-400",
};

export default function DashboardPage() {
  const [messages, setMessages] = useState(starterMessages);
  const [prompt, setPrompt] = useState("");

  const lastRequest = useMemo(() => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === "user");
    return lastUserMessage?.content ?? "Chưa có yêu cầu build mới.";
  }, [messages]);

  const sendPrompt = (value = prompt) => {
    const cleanPrompt = value.trim();

    if (!cleanPrompt) {
      return;
    }

    const nextId = messages.length + 1;
    setMessages([
      ...messages,
      { id: nextId, role: "user", content: cleanPrompt },
      {
        id: nextId + 1,
        role: "assistant",
        content:
          "Tôi đã nhận yêu cầu. Agent sẽ chia việc thành: phân tích giao diện, tạo component, cập nhật preview, chạy kiểm thử và chuẩn bị deploy public. Bảng theo dõi bên phải sẽ hiển thị tiến trình build.",
      },
    ]);
    setPrompt("");
  };

  return (
    <div className="min-h-screen bg-[#070b18] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_28rem),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_30rem),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(2,6,23,0.98))]" />

      <header className="relative border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
              <Sparkles size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white">
                Terkix AI Builder
              </h1>
              <p className="text-xs text-slate-400">
                Chat với AI, kêu nó build web, theo dõi agent làm việc
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              Agent online
            </span>
            <Link
              href="/editor/1"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-100"
            >
              <Code2 size={16} />
              Mở IDE
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-[1500px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[390px_1fr_360px] lg:px-8">
        <section className="flex min-h-[calc(100vh-110px)] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-black/30">
          <div className="border-b border-white/10 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                  AI Chat
                </p>
                <h2 className="mt-1 text-2xl font-black text-white">
                  Kêu AI build web
                </h2>
              </div>
              <MessageSquare className="text-cyan-200" />
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
              Ví dụ: “Làm cho tao trang bán hàng có login, thanh toán và
              dashboard admin”.
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-cyan-400 text-slate-950">
                    <Bot size={18} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/[0.06] text-slate-200"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-fuchsia-400 text-slate-950">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => sendPrompt(item)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-300/50 hover:text-cyan-100"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-end gap-2 rounded-3xl border border-white/10 bg-white/[0.05] p-2">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendPrompt();
                  }
                }}
                rows={2}
                placeholder="Nhập app muốn AI build..."
                className="min-h-12 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => sendPrompt()}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-300 text-slate-950 transition hover:bg-cyan-200"
                aria-label="Gửi prompt"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </section>

        <section className="min-h-[calc(100vh-110px)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/60 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-fuchsia-400/15 text-fuchsia-200 ring-1 ring-fuchsia-300/20">
                <Eye size={20} />
              </div>
              <div>
                <h2 className="font-bold text-white">Live Preview</h2>
                <p className="text-xs text-slate-400">
                  Màn hình web AI đang build
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300">
              <Globe2 size={14} />
              preview.terkix.dev
            </div>
          </div>

          <div className="p-5">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f]">
              <div className="flex items-center gap-2 border-b border-white/10 bg-slate-950/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 truncate rounded-full bg-white/[0.06] px-3 py-1 text-xs text-slate-400">
                  /generated/terkix-ai-app
                </span>
              </div>

              <div className="relative min-h-[560px] overflow-hidden p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(34,211,238,0.24),_transparent_16rem),radial-gradient(circle_at_80%_10%,_rgba(217,70,239,0.2),_transparent_18rem)]" />
                <div className="relative mx-auto max-w-4xl">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-slate-950">
                        <Zap size={20} />
                      </div>
                      <span className="font-black text-white">
                        Generated AI Site
                      </span>
                    </div>
                    <button className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950">
                      Launch
                    </button>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
                        AI website builder
                      </p>
                      <h3 className="text-4xl font-black leading-tight text-white md:text-5xl">
                        Build web bằng chat. Theo dõi AI làm từng bước.
                      </h3>
                      <p className="mt-5 text-sm leading-7 text-slate-300">
                        Prompt mới nhất: “{lastRequest}”
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-100">
                          Chat ready
                        </span>
                        <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-100">
                          Preview live
                        </span>
                        <span className="rounded-full bg-fuchsia-300/15 px-3 py-1 text-xs font-semibold text-fuchsia-100">
                          Agent tracking
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        ["UI sections", "6 blocks generated"],
                        ["Components", "12 files planned"],
                        ["Deploy status", "Ready after auth"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-3xl border border-white/10 bg-slate-950/70 p-5"
                        >
                          <p className="text-sm text-slate-400">{label}</p>
                          <p className="mt-2 text-2xl font-black text-white">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {generatedFiles.slice(0, 3).map((file) => (
                      <div
                        key={file.path}
                        className="rounded-3xl border border-white/10 bg-slate-950/60 p-4"
                      >
                        <FileCode className="mb-3 text-cyan-200" size={22} />
                        <p className="font-semibold text-white">{file.label}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {file.path}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="min-h-[calc(100vh-110px)] space-y-4 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                Agent Monitor
              </p>
              <h2 className="mt-1 text-2xl font-black text-white">
                AI đang làm gì?
              </h2>
            </div>
            <Activity className="text-fuchsia-200" />
          </div>

          <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-cyan-100">
                Build progress
              </span>
              <span className="text-sm font-black text-white">62%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[62%] rounded-full bg-cyan-300" />
            </div>
          </div>

          <div className="space-y-3">
            {buildSteps.map((step) => (
              <div
                key={step.title}
                className={`rounded-3xl border p-4 ${statusStyles[step.status]}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {step.status === "done" && <CheckCircle2 size={18} />}
                    {step.status === "running" && (
                      <Loader2 size={18} className="animate-spin" />
                    )}
                    {step.status === "queued" && <Play size={18} />}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-white">Files agent đụng tới</h3>
              <TerminalSquare size={18} className="text-slate-400" />
            </div>
            <div className="space-y-2">
              {generatedFiles.map((file) => (
                <div
                  key={file.path}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium text-white">
                      {file.label}
                    </p>
                    <span className="rounded-full bg-white/[0.06] px-2 py-1 text-[10px] uppercase tracking-wide text-cyan-200">
                      {file.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {file.path}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <LayoutDashboard size={17} />
              Đây mới là dashboard AI builder
            </div>
            <p className="text-xs leading-5 text-slate-300">
              Trang này không còn chỉ là bản đồ kho lưu trữ. Nó là workspace để
              chat với AI, xem web preview và theo dõi AI build app.
            </p>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">
              <Rocket size={16} />
              Chuẩn bị deploy
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
