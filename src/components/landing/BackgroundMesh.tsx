import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const BackgroundMesh: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#FAF8F5] dark:bg-[#000000] transition-colors duration-300"
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. Ambient Mesh Gradient Blobs (Light: Warm Cream / Dark: Deep Black with Subtle Velvet Accents)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden opacity-40 dark:opacity-30 transition-opacity duration-300">
        {/* Mesh Bloom 1: Top-Left */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px] transform-gpu"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(123, 97, 255, 0.20) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(254, 243, 199, 0.6) 0%, rgba(253, 230, 138, 0.25) 50%, transparent 75%)'
          }}
        />

        {/* Mesh Bloom 2: Top-Right */}
        <div
          className="absolute -top-[12%] -right-[8%] w-[55vw] h-[55vw] rounded-full blur-[140px] transform-gpu"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 228, 215, 0.5) 0%, rgba(254, 215, 170, 0.2) 55%, transparent 80%)'
          }}
        />

        {/* Mesh Bloom 3: Center */}
        <div
          className="absolute top-[32%] left-[15%] w-[45vw] h-[45vw] rounded-full blur-[150px] transform-gpu"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(237, 233, 254, 0.45) 0%, rgba(224, 231, 255, 0.15) 55%, transparent 75%)'
          }}
        />

        {/* Mesh Bloom 4: Bottom-Right */}
        <div
          className="absolute -bottom-[10%] -right-[8%] w-[55vw] h-[55vw] rounded-full blur-[140px] transform-gpu"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(253, 230, 138, 0.35) 0%, rgba(254, 230, 138, 0.15) 55%, transparent 80%)'
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Geometric Grid & Dot Pattern
         ───────────────────────────────────────────────────────────── */}
      {/* 2a. Precision Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.028] dark:opacity-[0.04] transition-opacity duration-300"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to right, rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 1) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(40, 30, 20, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(40, 30, 20, 1) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* 2b. Delicate Micro-Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.032] dark:opacity-[0.05] transition-opacity duration-300"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 1) 1px, transparent 0)'
            : 'radial-gradient(circle at 1px 1px, rgba(40, 30, 20, 1) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          3. Ambient Vignette Overlay
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/10 via-transparent to-[#FAF8F5]/30 dark:from-black/20 dark:via-transparent dark:to-black/50 transition-colors duration-300 pointer-events-none" />
    </div>
  );
};
