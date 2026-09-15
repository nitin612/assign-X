import React from 'react';

export const BackgroundMesh: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#FAF8F5]"
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. Ultra-Light Ambient Mesh Gradient Blobs (Warm Cream / Soft Peach / Muted Honey)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {/* Mesh Bloom 1: Top-Left Soft Warm Vanilla / Cream */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[120px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(254, 243, 199, 0.6) 0%, rgba(253, 230, 138, 0.25) 50%, transparent 75%)'
          }}
        />

        {/* Mesh Bloom 2: Top-Right Soft Peach & Blush Glow */}
        <div
          className="absolute -top-[12%] -right-[8%] w-[55vw] h-[55vw] rounded-full blur-[130px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(255, 228, 215, 0.5) 0%, rgba(254, 215, 170, 0.2) 55%, transparent 80%)'
          }}
        />

        {/* Mesh Bloom 3: Center Soft Pale Lavender Whisper */}
        <div
          className="absolute top-[32%] left-[15%] w-[45vw] h-[45vw] rounded-full blur-[140px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(237, 233, 254, 0.45) 0%, rgba(224, 231, 255, 0.15) 55%, transparent 75%)'
          }}
        />

        {/* Mesh Bloom 4: Center-Right Warm Honey Sand */}
        <div
          className="absolute top-[48%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.4) 0%, rgba(253, 230, 138, 0.18) 50%, transparent 75%)'
          }}
        />

        {/* Mesh Bloom 5: Bottom-Left Gentle Muted Rose / Warm Linen */}
        <div
          className="absolute top-[68%] -left-[8%] w-[50vw] h-[50vw] rounded-full blur-[130px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(254, 226, 226, 0.45) 0%, rgba(254, 243, 199, 0.2) 55%, transparent 75%)'
          }}
        />

        {/* Mesh Bloom 6: Bottom-Right Soft Pale Amber */}
        <div
          className="absolute -bottom-[10%] -right-[8%] w-[55vw] h-[55vw] rounded-full blur-[130px] transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(253, 230, 138, 0.35) 0%, rgba(254, 243, 199, 0.2) 55%, transparent 80%)'
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Very Light Geometric Mesh Grid & Dot Pattern
         ───────────────────────────────────────────────────────────── */}
      {/* 2a. Precision Grid Lines in very low opacity warm stone */}
      <div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(40, 30, 20, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(40, 30, 20, 1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* 2b. Delicate Micro-Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(40, 30, 20, 1) 1px, transparent 0)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          3. Warm Cream Ambient Vignette Overlay
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/10 via-transparent to-[#FAF8F5]/30" />
    </div>
  );
};


