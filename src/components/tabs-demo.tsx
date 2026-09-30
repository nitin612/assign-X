"use client";

import { Tabs } from "@/components/ui/tabs";

export default function TabsDemo() {
  const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 sm:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900 border border-purple-500/20 shadow-2xl">
          <p>Product Tab</p>
          <DummyContent title="Product Management & Roadmap" />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 sm:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-indigo-700 to-purple-900 border border-indigo-500/20 shadow-2xl">
          <p>Services tab</p>
          <DummyContent title="Managed Services & Technical Delivery" />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 sm:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-fuchsia-700 to-purple-900 border border-fuchsia-500/20 shadow-2xl">
          <p>Playground tab</p>
          <DummyContent title="Interactive Sandbox & Live Execution" />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 sm:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-violet-700 to-indigo-950 border border-violet-500/20 shadow-2xl">
          <p>Content tab</p>
          <DummyContent title="Structured Knowledge & Documentation" />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 sm:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-800 to-slate-950 border border-purple-500/20 shadow-2xl">
          <p>Random tab</p>
          <DummyContent title="Experimental Prototypes & Ideas" />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[24rem] md:h-[38rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-16 sm:my-24 px-4">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = ({ title }: { title?: string }) => {
  return (
    <div className="absolute -bottom-6 sm:-bottom-10 inset-x-0 w-[94%] sm:w-[90%] mx-auto h-[65%] sm:h-[80%] bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs font-mono text-slate-400 ml-2">{title || "Linear Interface Preview"}</span>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/10 text-slate-300">Live preview</span>
      </div>
      <div className="grid grid-cols-3 gap-3 my-auto">
        <div className="h-16 sm:h-24 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-300">Milestones</span>
          <span className="text-lg sm:text-2xl font-bold text-emerald-400">100% Verified</span>
        </div>
        <div className="h-16 sm:h-24 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-300">Escrow Protected</span>
          <span className="text-lg sm:text-2xl font-bold text-orange-400">$4,850</span>
        </div>
        <div className="h-16 sm:h-24 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-300">Avg. Turnaround</span>
          <span className="text-lg sm:text-2xl font-bold text-purple-400">3.2 Days</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
        <span>Supervisor validated</span>
        <span className="font-mono">v2.4.0</span>
      </div>
    </div>
  );
};
