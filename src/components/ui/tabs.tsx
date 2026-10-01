"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Tab = {
  title: string;
  value: string;
  icon?: React.ElementType;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Keep internal tabs synchronized if propTabs change
  useEffect(() => {
    setTabs(propTabs);
    setActive(propTabs[0]);
  }, [propTabs]);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  // Scroll active tab into view horizontally on mobile when selected
  const handleTabClick = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    moveSelectedTabToTop(idx);
    const button = e.currentTarget;
    if (button && scrollContainerRef.current) {
      button.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Pills Container with Smooth Edge Fades on Mobile */}
      <div className="relative w-full max-w-full flex items-center justify-center">
        {/* Left Edge Gradient Fade for Mobile Horizontal Scroll */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF8F5] dark:from-[#09090C] to-transparent z-40 sm:hidden"
          aria-hidden="true"
        />

        {/* Scrollable Pills Track */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex flex-row items-center justify-start sm:justify-center [perspective:1000px] relative overflow-x-auto no-visible-scrollbar max-w-full w-full shrink-0 z-30 px-4 sm:px-1 py-1.5 scroll-smooth",
            containerClassName
          )}
        >
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-slate-100/90 dark:bg-white/[0.06] backdrop-blur-md rounded-full border border-slate-200/80 dark:border-white/10 shadow-xs">
            {propTabs.map((tab, idx) => {
              const isSelected = active.value === tab.value;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.title || tab.value}
                  ref={isSelected ? activeTabRef : null}
                  onClick={(e) => handleTabClick(idx, e)}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className={cn(
                    "relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer select-none shrink-0 transition-all flex items-center gap-1.5 sm:gap-2",
                    tabClassName
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabPill"
                      transition={{ type: "spring", bounce: 0.22, duration: 0.5 }}
                      className={cn(
                        "absolute inset-0 bg-white dark:bg-[#20120F] border-2 border-[#EE6B50] dark:border-[#FA795C] rounded-full shadow-sm shadow-[#EE6B50]/15",
                        activeTabClassName
                      )}
                    />
                  )}

                  {Icon && (
                    <Icon
                      className={cn(
                        "w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-colors shrink-0",
                        isSelected
                          ? "text-[#D95236] dark:text-[#FA795C]"
                          : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                      )}
                    />
                  )}

                  <span
                    className={cn(
                      "relative z-10 block transition-colors text-xs sm:text-sm whitespace-nowrap",
                      isSelected
                        ? "text-[#D95236] dark:text-[#FA795C] font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white font-medium"
                    )}
                  >
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Edge Gradient Fade for Mobile Horizontal Scroll */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF8F5] dark:from-[#09090C] to-transparent z-40 sm:hidden"
          aria-hidden="true"
        />
      </div>

      {/* 3D Stacked Cards Deck */}
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-6 sm:mt-10 lg:mt-14", contentClassName)}
      />
    </div>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };

  return (
    <div className={cn("relative w-full h-full flex-1", className)}>
      {tabs.map((tab, idx) => {
        const isCurrentActive = isActive(tab);

        return (
          <motion.div
            key={tab.value}
            layoutId={tab.value}
            style={{
              scale: 1 - idx * 0.035,
              top: hovering ? idx * -20 : idx * -11,
              zIndex: -idx,
              opacity: idx < 3 ? 1 - idx * 0.16 : 0,
            }}
            animate={{
              y: isCurrentActive ? [0, 14, 0] : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            className={cn(
              "w-full h-full absolute top-0 left-0 rounded-3xl overflow-hidden",
              idx > 0 &&
                "shadow-[0_16px_36px_-10px_rgba(15,23,42,0.18)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.7)] border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0E0E12]/95"
            )}
          >
            {/* If idx === 0 (active front card): render full interactive content.
                If idx > 0 (stacked background card): hide text/interactive elements to avoid chaotic bleed */}
            <div
              className={cn(
                "w-full h-full transition-opacity duration-200",
                isCurrentActive ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              {tab.content}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
