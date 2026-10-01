"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.96, 1] : [1.02, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [isMobile ? 6 : 18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -16 : -80]);

  return (
    <div
      className={cn(
        "h-[26rem] sm:h-[38rem] md:h-[50rem] lg:h-[62rem] flex items-center justify-center relative px-2 sm:px-6 md:px-12 lg:px-16 overflow-visible",
        className
      )}
      ref={containerRef}
    >
      <div
        className="py-4 sm:py-8 md:py-16 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center z-10 relative"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformStyle: "preserve-3d",
        willChange: "transform",
        boxShadow:
          "0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 12px 24px -8px rgba(0, 0, 0, 0.2)",
      }}
      className="max-w-6xl -mt-2 sm:-mt-6 md:-mt-10 mx-auto h-[15rem] sm:h-[24rem] md:h-[34rem] lg:h-[43rem] w-full border border-slate-300/80 dark:border-white/10 p-1 sm:p-2.5 md:p-4 bg-slate-100/90 dark:bg-[#1A1A1E] rounded-[16px] sm:rounded-[26px] md:rounded-[34px] shadow-2xl relative"
    >
      <div className="h-full w-full overflow-hidden rounded-[12px] sm:rounded-[20px] md:rounded-[24px] bg-white dark:bg-[#0E0E12] border border-slate-200/90 dark:border-white/10 shadow-inner flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
