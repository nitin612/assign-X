"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Tab = {
  title: string;
  value: string;
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

  // Keep internal tabs synchronized if propTabs change
  React.useEffect(() => {
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

  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="w-full h-full flex flex-col items-center"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full shrink-0 z-30",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title || tab.value}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full cursor-pointer select-none", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-[#FEF3F0] dark:bg-[#2A1713] border-2 border-[#EE6B50] dark:border-[#FA795C] rounded-full shadow-xs",
                  activeTabClassName
                )}
              />
            )}

            <span
              className={cn(
                "relative block transition-colors",
                active.value === tab.value
                  ? "text-[#D95236] dark:text-[#FA795C] font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              )}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-12 sm:mt-16 lg:mt-20", contentClassName)}
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
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.04,
            top: hovering ? idx * -32 : idx * -16,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.15 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 20, 0] : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
          }}
          className={cn(
            "w-full h-full absolute top-0 left-0 rounded-3xl",
            idx > 0 && "shadow-[0_20px_40px_-10px_rgba(15,23,42,0.15)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          )}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
