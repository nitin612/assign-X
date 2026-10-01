import React from 'react';
import { ContainerScroll } from '../ui/container-scroll-animation';

export const DashboardScrollShowcase: React.FC = () => {
  return (
    <section id="dashboard-scroll" className="-mt-6 sm:-mt-10 md:-mt-14 pt-0 pb-4 sm:pb-8 bg-transparent w-full text-center overflow-visible">
      <div className="w-full max-w-[1360px] mx-auto px-3 sm:px-6 lg:px-8">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 mb-3 sm:mb-5">
              {/* Lime Green Pill Badge */}
              <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 mb-2.5 shadow-2xs">
                Your Central Command Center
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-950 dark:text-white tracking-tight leading-tight">
                A Dedicated Dashboard for{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FA795C] via-[#EE6B50] to-[#D95236] font-bold">
                  Easy Management
                </span>
              </h2>

              <p className="mt-2.5 sm:mt-3 text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                Check milestone progress, inspect supervisor QA tests, approve escrow releases, and chat directly with your team lead — all from one simple dashboard.
              </p>
            </div>
          }
        >
            {/* Dashboard Window Header Bar */}
            <div className="flex flex-col h-full w-full bg-slate-900/5 dark:bg-black/40">
              <div className="flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2 border-b border-slate-200/80 dark:border-white/10 bg-slate-100/90 dark:bg-[#141418] shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#FF5F56] shadow-2xs" />
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#FFBD2E] shadow-2xs" />
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#27C93F] shadow-2xs" />
                  <div className="hidden sm:flex items-center gap-1.5 ml-2 sm:ml-3 px-2.5 py-0.5 rounded-md bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] sm:text-xs font-mono text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>app.assignx.com/dashboard</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[8.5px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#D4F870] text-slate-950 shadow-2xs">
                    Live Preview
                  </span>
                  <span className="text-[8.5px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
                    v2.4.0
                  </span>
                </div>
              </div>

              {/* Dashboard Screenshot (Adaptive Light & Dark Mode) */}
              <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-900 dark:bg-[#070709]">
                {/* Light Mode Screenshot */}
                <img
                  src="/dashboard-light.png"
                  alt="AssignX Client Dashboard - Light Mode"
                  className="w-full h-full object-fill dark:hidden block select-none"
                  loading="eager"
                  draggable={false}
                />

                {/* Dark Mode Screenshot */}
                <img
                  src="/dashboard-dark.png"
                  alt="AssignX Client Dashboard - Dark Mode"
                  className="w-full h-full object-fill hidden dark:block select-none"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </div>
          </ContainerScroll>
        </div>
      </section>
    );
  };
