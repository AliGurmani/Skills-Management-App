export default function Loading() {
  const agents = [
    { label: "Planner", x: "50%", y: "6%" },
    { label: "Research", x: "82%", y: "27%" },
    { label: "Tools", x: "88%", y: "65%" },
    { label: "Memory", x: "50%", y: "88%" },
    { label: "Review", x: "12%", y: "65%" },
    { label: "Router", x: "18%", y: "27%" },
  ];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-6 text-white">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="agent-grid h-full w-full" />
      </div>

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

      <section className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <div className="relative h-[330px] w-[330px] sm:h-[390px] sm:w-[390px]">
          {/* Outer rotating orbit */}
          <div className="absolute inset-[36px] animate-[spin_14s_linear_infinite] rounded-full border border-violet-500/15" />

          <div className="absolute inset-[68px] animate-[spin_10s_linear_infinite_reverse] rounded-full border border-dashed border-violet-400/20" />

          {/* Connection lines */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 400"
            fill="none"
          >
            <g stroke="rgba(139,92,246,0.22)" strokeWidth="1">
              <line x1="200" y1="200" x2="200" y2="35" />
              <line x1="200" y1="200" x2="330" y2="105" />
              <line x1="200" y1="200" x2="350" y2="260" />
              <line x1="200" y1="200" x2="200" y2="350" />
              <line x1="200" y1="200" x2="50" y2="260" />
              <line x1="200" y1="200" x2="70" y2="105" />
            </g>
          </svg>

          {/* Moving signal dots */}
          <div className="signal signal-1" />
          <div className="signal signal-2" />
          <div className="signal signal-3" />

          {/* Central AI core */}
          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-violet-400/40 bg-[#101010]/90 shadow-[0_0_60px_rgba(124,58,237,0.3)] backdrop-blur-xl">
            <div className="absolute inset-2 animate-pulse rounded-2xl bg-violet-500/5" />

            <div className="relative">
              <div className="text-[10px] font-medium uppercase tracking-[0.35em] text-violet-300">
                AI
              </div>
              <div className="mt-1 text-xl font-bold tracking-tight">Core</div>
            </div>

            <div className="absolute -inset-3 animate-ping rounded-[2rem] border border-violet-400/10" />
          </div>

          {/* Agents */}
          {agents.map((agent, index) => (
            <div
              key={agent.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: agent.x,
                top: agent.y,
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="agent-node group flex flex-col items-center">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#111111] shadow-lg">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-violet-400" />

                  <div
                    className="absolute inset-0 animate-ping rounded-2xl border border-violet-400/20"
                    style={{
                      animationDelay: `${index * 0.25}s`,
                    }}
                  />
                </div>

                <span className="mt-2 text-[11px] font-medium tracking-wide text-zinc-400">
                  {agent.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="-mt-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-400">
            Agent Skill Manager
          </p>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Initializing AI workspace
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
            Connecting agents, tools, memory and skills...
          </p>
        </div>

        {/* Progress */}
        <div className="mt-8 w-full max-w-sm">
          <div className="h-[3px] overflow-hidden rounded-full bg-white/5">
            <div className="loading-progress h-full rounded-full bg-violet-500" />
          </div>

          <div className="mt-4 h-5 overflow-hidden text-xs text-zinc-500">
            <div className="loading-messages">
              <div>Discovering available skills...</div>
              <div>Routing agent capabilities...</div>
              <div>Syncing tools and memory...</div>
              <div>Preparing workspace...</div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .agent-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 42px 42px;
          animation: gridMove 12s linear infinite;
        }

        .agent-node {
          animation: floatNode 2.8s ease-in-out infinite;
        }

        .signal {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgb(167 139 250);
          box-shadow: 0 0 14px rgba(139, 92, 246, 0.9);
        }

        .signal-1 {
          animation: orbitOne 4s linear infinite;
        }

        .signal-2 {
          animation: orbitTwo 5.5s linear infinite;
        }

        .signal-3 {
          animation: orbitThree 7s linear infinite;
        }

        .loading-progress {
          width: 35%;
          animation: progressMove 1.8s ease-in-out infinite;
        }

        .loading-messages {
          animation: messageSlide 8s steps(4) infinite;
        }

        .loading-messages > div {
          height: 20px;
        }

        @keyframes gridMove {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(42px, 42px);
          }
        }

        @keyframes floatNode {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes orbitOne {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(115px);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(115px);
          }
        }

        @keyframes orbitTwo {
          from {
            transform: translate(-50%, -50%) rotate(120deg) translateX(145px);
          }
          to {
            transform: translate(-50%, -50%) rotate(480deg) translateX(145px);
          }
        }

        @keyframes orbitThree {
          from {
            transform: translate(-50%, -50%) rotate(240deg) translateX(92px);
          }
          to {
            transform: translate(-50%, -50%) rotate(600deg) translateX(92px);
          }
        }

        @keyframes progressMove {
          0% {
            transform: translateX(-120%);
          }
          50% {
            transform: translateX(120%);
          }
          100% {
            transform: translateX(320%);
          }
        }

        @keyframes messageSlide {
          0% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-20px);
          }
          50% {
            transform: translateY(-40px);
          }
          75% {
            transform: translateY(-60px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </main>
  );
}
