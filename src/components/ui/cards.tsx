"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FileText,
  MessageSquare,
  Paperclip,
  Send,
  ShieldCheck,
  CheckSquare,
  ExternalLink,
  CheckCircle2,
  Clock
} from "lucide-react";

export type Card = {
  title: string;
  description: string;
  skeleton: React.ReactNode;
  className: string;
  config: {
    y: number;
    zIndex: number;
    x?: number;
    rotate?: number;
  };
};

export type SpringConfig = {
  type: "spring";
  bounce?: number;
  visualDuration?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export interface CardsProps {
  spring?: SpringConfig;
  activeScale?: number;
  cardSpacing?: number;
  cards?: Card[];
  className?: string;
}

const defaultSpring: SpringConfig = {
  type: "spring",
  visualDuration: 0.6,
  bounce: 0.25,
};

export const controls = {
  spring: defaultSpring,
  activeScale: [1.15, 1, 1.6, 0.01],
  cardSpacing: [175, 40, 320, 5],
};

/* ─────────────────────────────────────────────────────────────────
   AssignX Dashboard Cards (Full Desktop Size + Smooth Mobile Arch)
   ───────────────────────────────────────────────────────────────── */
export const assignXCards: Card[] = [
  {
    title: "Milestone Tracking",
    description:
      "Track sprint progress, deliverables, and deadlines in real-time with zero status meetings.",
    skeleton: (
      <div className="w-full h-26 sm:h-44 lg:h-52 rounded-xl bg-gradient-to-br from-black/40 via-black/25 to-black/40 backdrop-blur-md border border-white/20 p-2 sm:p-3.5 flex flex-col justify-between text-left text-white select-none">
        <div>
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Progress
            </span>
            <span className="text-[8px] sm:text-[10px] text-white/70 font-normal">24th Sep</span>
          </div>

          <h4 className="text-[10px] sm:text-xs font-semibold text-white leading-snug line-clamp-1 sm:line-clamp-2">
            Restaurant Redesign & API
          </h4>

          <div className="mt-1 sm:mt-3">
            <div className="flex justify-between text-[8px] sm:text-[10px] text-white/80 font-normal mb-0.5 sm:mb-1">
              <span>Progress</span>
              <span className="font-semibold text-emerald-300">68%</span>
            </div>
            <div className="w-full h-1 sm:h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full w-[68%]" />
            </div>
          </div>
        </div>

        <div className="pt-1 sm:pt-2.5 border-t border-white/15 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex -space-x-1.5">
              <img
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                alt="Supervisor Arjun"
              />
              <img
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                alt="Developer Elena"
              />
            </div>
            <span className="text-[8px] sm:text-[9.5px] text-white/80 pl-1 sm:pl-1.5 font-medium">Arjun (Lead)</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] text-white/70">
            <span className="flex items-center gap-0.5">
              <FileText className="w-2.5 h-2.5" /> 8
            </span>
            <span className="flex items-center gap-0.5">
              <MessageSquare className="w-2.5 h-2.5" /> 14
            </span>
          </div>
        </div>
      </div>
    ),
    className: "bg-gradient-to-b from-[#FF5E1E] to-[#E0480C] text-white shadow-xl shadow-orange-950/20",
    config: {
      y: -15,
      x: 0,
      rotate: -14,
      zIndex: 2,
    },
  },

  {
    title: "Dedicated Tech Lead",
    description:
      "Direct chat with your technical supervisor. Every pull request and asset is QA-tested before your review.",
    skeleton: (
      <div className="w-full h-26 sm:h-44 lg:h-52 rounded-xl bg-white/95 text-slate-900 border border-slate-200/80 p-2 sm:p-3.5 flex flex-col justify-between text-left shadow-sm select-none">
        <div>
          <div className="text-[8px] sm:text-[10px] text-slate-400 font-medium mb-1 sm:mb-1.5">Supervisor Chat</div>
          <div className="flex items-center justify-between pb-1 sm:pb-2 mb-1 sm:mb-2 border-b border-slate-100 text-slate-600 text-[8px] sm:text-[10px]">
            <div className="flex items-center gap-1 sm:gap-1.5 font-semibold">
              <span className="hover:text-slate-950 cursor-pointer">B</span>
              <span className="hover:text-slate-950 cursor-pointer italic font-serif">I</span>
              <span className="hover:text-slate-950 cursor-pointer underline">U</span>
              <Paperclip className="w-2.5 h-2.5 text-slate-400" />
            </div>
            <div className="bg-emerald-600 text-white text-[7.5px] sm:text-[9px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <Send className="w-2 h-2" />
              <span>Submit</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-1.5 sm:gap-2 text-left bg-slate-50/80 p-1 sm:p-2 rounded-lg border border-slate-100">
          <img
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover shrink-0 mt-0.5"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
            alt="Arjun Mehta"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-[8.5px] sm:text-[10px] font-bold text-slate-900 truncate">
                Arjun Mehta
              </p>
              <span className="text-[7.5px] sm:text-[8.5px] text-emerald-600 font-semibold">Active</span>
            </div>
            <p className="text-[8px] sm:text-[9.5px] text-slate-600 mt-0.5 line-clamp-1 sm:line-clamp-2 leading-tight">
              QA passed. Ready for sign-off!
            </p>
          </div>
        </div>
      </div>
    ),
    className: "bg-gradient-to-b from-[#FAF8F5] to-[#EAE6DF] text-slate-900 [&_h2]:text-slate-950 shadow-xl shadow-stone-900/10 border border-stone-300/40",
    config: {
      y: 12,
      x: 180,
      rotate: 6,
      zIndex: 3,
    },
  },

  {
    title: "Escrow Protection",
    description:
      "Release payments stage-by-stage only after you verify deliverables. Complete escrow safety for every dollar.",
    skeleton: (
      <div className="w-full h-26 sm:h-44 lg:h-52 rounded-xl bg-gradient-to-br from-black/45 via-black/30 to-black/45 backdrop-blur-md border border-white/20 p-2 sm:p-3 flex flex-col justify-center space-y-1 sm:space-y-2 text-left text-white select-none">
        <div className="flex items-center justify-between p-1 sm:p-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-300 shrink-0" />
            <span className="text-[8px] sm:text-[10.5px] font-medium text-white truncate">01 Scope Scoped</span>
          </div>
          <span className="text-[7px] sm:text-[9px] font-bold text-emerald-300 bg-emerald-950/40 px-1 sm:px-1.5 py-0.5 rounded">Done</span>
        </div>

        <div className="flex items-center justify-between p-1 sm:p-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-300 shrink-0" />
            <span className="text-[8px] sm:text-[10.5px] font-medium text-white truncate">02 UI/UX Design</span>
          </div>
          <span className="text-[7px] sm:text-[9px] font-bold text-emerald-300 bg-emerald-950/40 px-1 sm:px-1.5 py-0.5 rounded">₹15k Paid</span>
        </div>

        <div className="flex items-center justify-between p-1 sm:p-2 rounded-lg bg-amber-500/20 border border-amber-400/30">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-300 shrink-0" />
            <span className="text-[8px] sm:text-[10.5px] font-medium text-white truncate">03 Frontend (68%)</span>
          </div>
          <span className="text-[7px] sm:text-[9px] font-bold text-amber-300 bg-amber-950/40 px-1 sm:px-1.5 py-0.5 rounded">Review</span>
        </div>
      </div>
    ),
    className: "bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] text-white shadow-xl shadow-blue-950/30",
    config: {
      y: -24,
      x: 360,
      rotate: -3,
      zIndex: 4,
    },
  },

  {
    title: "Vetted Talent Pod",
    description:
      "Top pre-vetted engineers and designers build behind the scenes while your lead coordinates everything.",
    skeleton: (
      <div className="w-full h-26 sm:h-44 lg:h-52 rounded-xl bg-gradient-to-br from-black/45 via-black/30 to-black/45 backdrop-blur-md border border-white/20 p-2 sm:p-3.5 flex flex-col justify-between text-left text-white select-none">
        <div>
          <div className="flex items-center justify-between mb-1 sm:mb-2 pb-1 sm:pb-1.5 border-b border-white/15">
            <div className="flex items-center gap-1 text-[8px] sm:text-[10px] font-semibold text-purple-200">
              <ShieldCheck className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-purple-300" />
              <span>Managed Talent</span>
            </div>
            <span className="text-[7.5px] sm:text-[9.5px] font-bold text-yellow-300">★ 4.9 Supervised</span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center justify-between bg-white/10 p-1 sm:p-1.5 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                  alt="Elena"
                />
                <div>
                  <p className="text-[8px] sm:text-[10px] font-medium leading-tight">Elena (Frontend)</p>
                  <p className="text-[6.5px] sm:text-[8px] text-white/60">QA Managed by Lead</p>
                </div>
              </div>
              <CheckSquare className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-emerald-400" />
            </div>

            <div className="flex items-center justify-between bg-white/10 p-1 sm:p-1.5 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80"
                  alt="Marcus"
                />
                <div>
                  <p className="text-[8px] sm:text-[10px] font-medium leading-tight">Marcus (Backend)</p>
                  <p className="text-[6.5px] sm:text-[8px] text-white/60">QA Managed by Lead</p>
                </div>
              </div>
              <CheckSquare className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="text-center pt-0.5 sm:pt-1 border-t border-white/10">
          <span className="text-[7.5px] sm:text-[9px] text-white/75 font-medium">Zero worker management for client</span>
        </div>
      </div>
    ),
    className: "bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED] text-white shadow-xl shadow-purple-950/30",
    config: {
      y: 12,
      x: 540,
      rotate: 8,
      zIndex: 5,
    },
  },

  {
    title: "Live Staging & Sign-Off",
    description:
      "Test preview builds directly in your browser. One-click approval to launch completed milestone deliverables.",
    skeleton: (
      <div className="w-full h-26 sm:h-44 lg:h-52 rounded-xl bg-gradient-to-br from-neutral-900/95 via-neutral-950/90 to-neutral-900/95 border border-white/15 p-2 sm:p-3.5 flex flex-col justify-between text-left text-white select-none">
        <div>
          <div className="flex items-center justify-between mb-1 sm:mb-2 pb-1 sm:pb-1.5 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>preview.assignx.app</span>
            </div>
            <span className="text-[7.5px] sm:text-[9px] text-slate-400 font-mono">v2.1.4</span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <div className="p-1 sm:p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-[7.5px] sm:text-[10px]">
              <span className="text-slate-300">QA Automated Tests</span>
              <span className="text-emerald-400 font-medium font-mono">48/48 Passed</span>
            </div>
            <div className="p-1 sm:p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-[7.5px] sm:text-[10px]">
              <span className="text-slate-300">Supervisor Review</span>
              <span className="text-slate-200 font-medium">Approved</span>
            </div>
          </div>
        </div>

        <div className="p-1 sm:p-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-between text-white text-[8px] sm:text-[10px] font-medium transition-colors">
          <span className="flex items-center gap-1.5">
            <ExternalLink className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 text-slate-300" /> Open Staging Preview
          </span>
          <span className="text-[7px] sm:text-[8.5px] text-emerald-300 bg-emerald-950/60 px-1 sm:px-1.5 py-0.5 rounded font-mono">Live</span>
        </div>
      </div>
    ),
    className: "bg-gradient-to-b from-[#18181B] to-[#09090B] !text-white [&_h2]:!text-white [&_p]:!text-slate-200 border border-white/15 shadow-2xl shadow-black/80",
    config: {
      y: -10,
      x: 720,
      rotate: -4,
      zIndex: 6,
    },
  },
];

/* ─────────────────────────────────────────────────────────────────
   Original Aceternity Demo Cards (For generic preview / fallback)
   ───────────────────────────────────────────────────────────────── */
export const defaultCards: Card[] = [
  {
    title: "Working Knowledge",
    description:
      "You have a basic understanding of the topic and can apply it to simple situations.",
    skeleton: (
      <div className="h-44 sm:h-52 w-full rounded-xl bg-gradient-to-r from-orange-600 to-orange-600/40"></div>
    ),
    className: "bg-orange-500 [&_h2]:text-white",
    config: {
      y: -20,
      x: 0,
      rotate: -15,
      zIndex: 2,
    },
  },
  {
    title: "Practical Demonstration",
    description:
      "You can demonstrate the concept in practice with real-world examples.",
    skeleton: (
      <div className="h-44 sm:h-52 w-full rounded-xl bg-gradient-to-r from-neutral-300 to-neutral-400/40"></div>
    ),
    className: "bg-stone-200 [&_p]:text-black text-slate-900",
    config: {
      y: 20,
      x: 180,
      rotate: 8,
      zIndex: 3,
    },
  },
  {
    title: "Collaborate with AI",
    description:
      "You can effectively work alongside AI tools to enhance your workflow.",
    skeleton: (
      <div className="h-44 sm:h-52 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-600/40"></div>
    ),
    className: "bg-blue-500 [&_h2]:text-white",
    config: {
      y: -80,
      x: 360,
      rotate: -5,
      zIndex: 4,
    },
  },
  {
    title: "Means & Methods",
    description:
      "You understand the various approaches and techniques available.",
    skeleton: (
      <div className="h-44 sm:h-52 w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-600/40"></div>
    ),
    className: "bg-purple-500 [&_h2]:text-white",
    config: {
      y: 20,
      x: 540,
      rotate: 12,
      zIndex: 5,
    },
  },
  {
    title: "Interface Kit",
    description:
      "You have the tools and components needed to build interfaces.",
    skeleton: (
      <div className="h-44 sm:h-52 w-full rounded-xl bg-gradient-to-r from-neutral-950 to-neutral-950/40"></div>
    ),
    className: "bg-neutral-900 [&_h2]:text-white",
    config: {
      y: 20,
      x: 720,
      rotate: -5,
      zIndex: 6,
    },
  },
];

export const Cards = ({
  spring = defaultSpring,
  activeScale = 1.12,
  cardSpacing = 175,
  cards = assignXCards,
  className,
}: CardsProps = {}) => {
  const [active, setActive] = useState<Card | null>(null);
  const [spacing, setSpacing] = useState(cardSpacing);
  const [isMobile, setIsMobile] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const cardSpring = spring;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      if (width < 360) {
        setSpacing(34);
      } else if (width < 480) {
        setSpacing(42);
      } else if (width < 640) {
        setSpacing(52);
      } else if (width < 1024) {
        setSpacing(Math.round(cardSpacing * 0.5));
      } else {
        setSpacing(cardSpacing);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardSpacing]);

  const middle = (cards.length - 1) / 2;

  const isAnyCardActive = () => {
    return Boolean(active?.title);
  };

  const isCurrentActive = (card: Card) => {
    return active?.title === card.title;
  };

  return (
    <div className={cn("relative flex h-full w-full items-center justify-center overflow-visible py-2 select-none", className)}>
      <motion.div
        ref={ref}
        onClick={() => setActive(null)}
        className="relative mx-auto flex h-[320px] sm:h-[480px] lg:h-[540px] w-full max-w-6xl items-center justify-center [--height:245px] [--width:155px] min-[380px]:[--width:170px] sm:[--height:380px] sm:[--width:270px] lg:[--height:430px] lg:[--width:300px]"
      >
        {cards.map((card, index) => {
          const offsetX = (index - middle) * spacing;
          const isSelected = isCurrentActive(card);
          const anyActive = isAnyCardActive();
          const baseRotate = isMobile ? (card.config.rotate || 0) * 0.55 : (card.config.rotate || 0);
          const baseY = isMobile ? card.config.y * 0.25 : card.config.y;

          return (
            <motion.div key={card.title}>
              <motion.button
                type="button"
                initial={{
                  x: 0,
                  scale: 0.8,
                  opacity: 0,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(isSelected ? null : card);
                }}
                animate={{
                  opacity: 1,
                  y: isSelected
                    ? -6
                    : anyActive
                      ? (isMobile ? 220 : 360)
                      : baseY,
                  x: isSelected
                    ? 0
                    : anyActive
                      ? offsetX * 0.45
                      : offsetX,
                  rotate: isSelected
                    ? 0
                    : anyActive
                      ? 0.2 * baseRotate
                      : baseRotate,
                  scale: isSelected
                    ? activeScale
                    : anyActive
                      ? 0.72
                      : 1,
                }}
                whileHover={{
                  scale: isSelected
                    ? activeScale
                    : anyActive
                      ? 0.72
                      : 1.04,
                  y: isSelected
                    ? -6
                    : anyActive
                      ? (isMobile ? 220 : 360)
                      : baseY - 8,
                }}
                transition={cardSpring}
                style={{
                  width: `var(--width)`,
                  height: `var(--height)`,
                  marginLeft: `calc(var(--width) / -2)`,
                  marginTop: `calc(var(--height) / -2)`,
                  zIndex: isSelected ? 50 : card.config.zIndex,
                }}
                className={cn(
                  "absolute top-1/2 left-1/2 flex cursor-pointer flex-col items-start justify-between rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-xl sm:shadow-2xl transition-shadow select-none text-left overflow-hidden",
                  card.className
                )}
              >
                {/* Top Skeleton / UI Preview */}
                <div className="w-full shrink-0">
                  {card.skeleton}
                </div>

                {/* Bottom Title & Description Expandable Area */}
                <div className="mt-auto w-full pt-1.5 sm:pt-3">
                  <motion.h2
                    layoutId={card.title + "title"}
                    className={cn(
                      "font-bold text-left text-[11px] sm:text-lg md:text-xl tracking-tight leading-snug line-clamp-1 sm:line-clamp-2",
                      card.className.includes("text-slate-900") ? "!text-slate-950" : "!text-white"
                    )}
                  >
                    {card.title}
                  </motion.h2>

                  <AnimatePresence mode="popLayout">
                    {isSelected && (
                      <motion.p
                        layoutId={card.title + "description"}
                        initial={{ opacity: 0, y: 12, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 12, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={cn(
                          "mt-1 sm:mt-2 text-left text-[9.5px] sm:text-xs md:text-sm leading-relaxed font-normal",
                          card.className.includes("text-slate-900") ? "!text-slate-700" : "!text-slate-200"
                        )}
                      >
                        {card.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Cards;
