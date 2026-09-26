import React from 'react';

export const BackgroundMesh: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. Light Mode Background Canvas & Gradients Layer
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#FAF8F5] opacity-100 dark:opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none">
        {/* Light Ambient Mesh Gradient Blobs */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          {/* Light Bloom 1: Top-Left */}
          <div
            className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px] transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(254, 243, 199, 0.6) 0%, rgba(253, 230, 138, 0.25) 50%, transparent 75%)'
            }}
          />

          {/* Light Bloom 2: Top-Right */}
          <div
            className="absolute -top-[12%] -right-[8%] w-[55vw] h-[55vw] rounded-full blur-[140px] transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(255, 228, 215, 0.5) 0%, rgba(254, 215, 170, 0.2) 55%, transparent 80%)'
            }}
          />

          {/* Light Bloom 3: Center */}
          <div
            className="absolute top-[32%] left-[15%] w-[45vw] h-[45vw] rounded-full blur-[150px] transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(237, 233, 254, 0.45) 0%, rgba(224, 231, 255, 0.15) 55%, transparent 75%)'
            }}
          />

          {/* Light Bloom 4: Bottom-Right */}
          <div
            className="absolute -bottom-[10%] -right-[8%] w-[55vw] h-[55vw] rounded-full blur-[140px] transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(253, 230, 138, 0.35) 0%, rgba(254, 230, 138, 0.15) 55%, transparent 80%)'
            }}
          />
        </div>

        {/* Light Precision Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(40, 30, 20, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(40, 30, 20, 1) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />

        {/* Light Delicate Micro-Dot Matrix */}
        <div
          className="absolute inset-0 opacity-[0.032]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(40, 30, 20, 1) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Light Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/10 via-transparent to-[#FAF8F5]/30 pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Dark Mode Background Canvas & Gradients Layer
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#000000] opacity-0 dark:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
        {/* Dark Ambient Mesh Gradient Blobs */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {/* Dark Bloom 1: Top-Left */}
          <div
            className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px] transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(123, 97, 255, 0.20) 0%, transparent 70%)'
            }}
          />

          {/* Dark Bloom 2: Top-Right */}
          <div
            className="absolute -top-[12%] -right-[8%] w-[55vw] h-[55vw] rounded-full blur-[140px] transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, transparent 70%)'
            }}
          />

          {/* Dark Bloom 3: Center */}
          <div
            className="absolute top-[32%] left-[15%] w-[45vw] h-[45vw] rounded-full blur-[150px] transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)'
            }}
          />

          {/* Dark Bloom 4: Bottom-Right */}
          <div
            className="absolute -bottom-[10%] -right-[8%] w-[55vw] h-[55vw] rounded-full blur-[140px] transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)'
            }}
          />
        </div>

        {/* Dark Precision Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 1) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />

        {/* Dark Delicate Micro-Dot Matrix */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 1) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />
      </div>
    </div>
  );
};

