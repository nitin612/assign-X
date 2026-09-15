import React from 'react';

export const BackgroundMesh: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#FAF8F5]"
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. Ambient Mesh Gradient Blobs across the entire site
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {/* Soft Warm Vanilla / Cream */}
        <div
          className="absolute top-[22%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[130px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(254, 243, 199, 0.6) 0%, rgba(253, 230, 138, 0.25) 50%, transparent 75%)'
          }}
        />

        {/* Soft Peach & Blush Glow */}
        <div
          className="absolute top-[26%] -right-[8%] w-[55vw] h-[55vw] rounded-full blur-[130px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(255, 228, 215, 0.5) 0%, rgba(254, 215, 170, 0.2) 55%, transparent 80%)'
          }}
        />

        {/* Center Soft Pale Lavender */}
        <div
          className="absolute top-[46%] left-[12%] w-[48vw] h-[48vw] rounded-full blur-[140px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(237, 233, 254, 0.5) 0%, rgba(224, 231, 255, 0.2) 55%, transparent 75%)'
          }}
        />

        {/* Warm Honey Sand */}
        <div
          className="absolute top-[64%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(253, 230, 138, 0.2) 50%, transparent 75%)'
          }}
        />

        {/* Bottom Gentle Muted Rose / Warm Linen */}
        <div
          className="absolute top-[82%] -left-[8%] w-[52vw] h-[52vw] rounded-full blur-[130px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(254, 226, 226, 0.45) 0%, rgba(254, 243, 199, 0.2) 55%, transparent 75%)'
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Precision Mesh Grid Across the Whole Site (Masked ONLY at Top Hero)
         ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.038]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(30, 20, 10, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(30, 20, 10, 1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent 0px, transparent 360px, rgba(0,0,0,0.5) 430px, black 490px, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, transparent 360px, rgba(0,0,0,0.5) 430px, black 490px, black 100%)'
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          3. Micro-Dot Matrix across the site
         ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(30, 20, 10, 1) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px',
          maskImage: 'linear-gradient(to bottom, transparent 0px, transparent 360px, black 490px, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, transparent 360px, black 490px, black 100%)'
        }}
      />
    </div>
  );
};
