import React, { useRef, useState, useEffect } from 'react';

interface ScrollBlurSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  maxScale?: number;
  maxBlur?: number;
  minOpacity?: number;
  delayRatio?: number;
}

export const ScrollBlurSection: React.FC<ScrollBlurSectionProps> = ({
  children,
  className = '',
  id,
  maxScale = 1.03,
  maxBlur = 5,
  minOpacity = 0.45,
  delayRatio = 0.65
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<{
    scale: number;
    blur: number;
    opacity: number;
    translateY: number;
  }>({
    scale: 1,
    blur: 0,
    opacity: 1,
    translateY: 0
  });

  useEffect(() => {
    let ticking = false;

    const updateEffect = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // Only apply exit effect when the section is scrolling up past the top of the viewport
      if (rect.top < 0 && rect.bottom > 0) {
        const distancePastTop = -rect.top;
        const totalExitRange = Math.max(rect.height * 0.95, windowHeight * 0.9);
        const rawProgress = Math.min(Math.max(distancePastTop / totalExitRange, 0), 1);

        // Keep section completely sharp and unblurred for the initial scroll portion
        if (rawProgress <= delayRatio) {
          setStyle({
            scale: 1,
            blur: 0,
            opacity: 1,
            translateY: 0
          });
        } else {
          // Smoothly ramp up blur and scale later in the scroll
          const activeProgress = (rawProgress - delayRatio) / (1 - delayRatio);
          const eased = Math.pow(activeProgress, 1.5);

          setStyle({
            scale: 1 + eased * (maxScale - 1),
            blur: eased * maxBlur,
            opacity: Math.max(1 - eased * (1 - minOpacity), minOpacity),
            translateY: eased * 24
          });
        }
      } else if (rect.top >= 0) {
        // Floating coming up effect when scrolling into view from bottom
        const enterThreshold = windowHeight * 0.95;
        const settleThreshold = windowHeight * 0.25;

        if (rect.top > settleThreshold) {
          const enterDist = enterThreshold - settleThreshold;
          const currentDist = Math.max(0, Math.min(rect.top - settleThreshold, enterDist));
          const enterRatio = currentDist / enterDist; // 1 when near bottom, 0 when settled
          const easedFloat = Math.pow(enterRatio, 1.6);

          setStyle({
            scale: 1 - easedFloat * 0.025,
            blur: 0,
            opacity: Math.max(1 - easedFloat * 0.45, 0.55),
            translateY: easedFloat * 42
          });
        } else {
          // Completely settled in view
          setStyle({
            scale: 1,
            blur: 0,
            opacity: 1,
            translateY: 0
          });
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateEffect);
        ticking = true;
      }
    };

    // Initial check
    updateEffect();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [maxScale, maxBlur, minOpacity, delayRatio]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative overflow-hidden w-full ${className}`}
    >
      <div
        className="w-full h-full transition-transform ease-out duration-100"
        style={{
          transform: `scale(${style.scale}) translateY(${style.translateY}px) translateZ(0)`,
          filter: style.blur > 0.05 ? `blur(${style.blur.toFixed(1)}px)` : 'none',
          opacity: style.opacity,
          transformOrigin: 'center 40%',
          willChange: 'transform, filter, opacity'
        }}
      >
        {children}
      </div>
    </div>
  );
};
