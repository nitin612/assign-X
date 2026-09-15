import React from 'react';

export const IntegrationHub: React.FC = () => {
  return (
    <div className="mt-8 sm:mt-12 w-full max-w-[1600px] mx-auto relative overflow-x-auto overflow-y-visible py-6 scrollbar-none select-none">
      {/* Aspect Ratio Canvas for the panoramic root network */}
      <div className="relative min-w-[1080px] max-w-[1500px] mx-auto aspect-[1500/480]">
        {/* ─────────────────────────────────────────────────────────────
            1. Organic Root SVG Network with Gradient Strokes & Branching Paths
           ───────────────────────────────────────────────────────────── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1500 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Left Root Gradient */}
            <linearGradient id="root-grad-left" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#8263F7" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#A78BFA" stopOpacity="0.65" />
              <stop offset="80%" stopColor="#C4B5FD" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.35" />
            </linearGradient>

            {/* Right Root Gradient */}
            <linearGradient id="root-grad-right" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#8263F7" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#A78BFA" stopOpacity="0.65" />
              <stop offset="80%" stopColor="#C4B5FD" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.35" />
            </linearGradient>

            {/* Center Radial Glow Aura */}
            <radialGradient id="center-root-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8263F7" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#8263F7" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#8263F7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Root Aura Glow */}
          <circle cx="750" cy="240" r="140" fill="url(#center-root-glow)" />

          {/* ── LEFT ROOT BRANCHES ───────────────────────────────────── */}
          {/* Main Left Trunk: Center -> Slack */}
          <path
            d="M 680 240 L 580 240"
            stroke="url(#root-grad-left)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 680 240 L 580 240"
            stroke="#8263F7"
            strokeWidth="2"
            strokeDasharray="5 7"
            strokeOpacity="0.8"
          />

          {/* Branch: Center curve up-left -> Jira Software */}
          <path
            d="M 720 185 C 700 110, 630 75, 545 75"
            stroke="url(#root-grad-left)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 720 185 C 700 110, 630 75, 545 75"
            stroke="#A78BFA"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.75"
          />

          {/* Branch: Center curve down-left -> Confluence */}
          <path
            d="M 720 295 C 700 370, 630 405, 545 405"
            stroke="url(#root-grad-left)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 720 295 C 700 370, 630 405, 545 405"
            stroke="#A78BFA"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.75"
          />

          {/* Slack -> Outer Branch Split */}
          <path
            d="M 450 240 L 390 240"
            stroke="url(#root-grad-left)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Slack branch -> Discord (upper-left) */}
          <path
            d="M 390 240 C 330 240, 310 145, 255 145"
            stroke="url(#root-grad-left)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 390 240 C 330 240, 310 145, 255 145"
            stroke="#C4B5FD"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeOpacity="0.7"
          />

          {/* Slack branch -> Airtable (lower-left) */}
          <path
            d="M 390 240 C 330 240, 310 335, 255 335"
            stroke="url(#root-grad-left)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 390 240 C 330 240, 310 335, 255 335"
            stroke="#C4B5FD"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeOpacity="0.7"
          />

          {/* Outer Left Tendril: Discord -> GitHub (far edge root) */}
          <path
            d="M 160 145 C 120 145, 100 210, 75 230"
            stroke="url(#root-grad-left)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeOpacity="0.6"
          />

          {/* Outer Left Tendril: Airtable -> Linear (far edge root) */}
          <path
            d="M 160 335 C 120 335, 100 270, 75 250"
            stroke="url(#root-grad-left)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeOpacity="0.6"
          />

          {/* ── RIGHT ROOT BRANCHES ──────────────────────────────────── */}
          {/* Main Right Trunk: Center -> Asana */}
          <path
            d="M 820 240 L 920 240"
            stroke="url(#root-grad-right)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 820 240 L 920 240"
            stroke="#8263F7"
            strokeWidth="2"
            strokeDasharray="5 7"
            strokeOpacity="0.8"
          />

          {/* Branch: Center curve up-right -> ClickUp */}
          <path
            d="M 780 185 C 800 110, 870 75, 955 75"
            stroke="url(#root-grad-right)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 780 185 C 800 110, 870 75, 955 75"
            stroke="#A78BFA"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.75"
          />

          {/* Branch: Center curve down-right -> Notion */}
          <path
            d="M 780 295 C 800 370, 870 405, 955 405"
            stroke="url(#root-grad-right)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 780 295 C 800 370, 870 405, 955 405"
            stroke="#A78BFA"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.75"
          />

          {/* Asana -> Outer Branch Split */}
          <path
            d="M 1050 240 L 1110 240"
            stroke="url(#root-grad-right)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Asana branch -> monday.com (upper-right) */}
          <path
            d="M 1110 240 C 1170 240, 1190 145, 1245 145"
            stroke="url(#root-grad-right)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 1110 240 C 1170 240, 1190 145, 1245 145"
            stroke="#C4B5FD"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeOpacity="0.7"
          />

          {/* Asana branch -> Miro (lower-right) */}
          <path
            d="M 1110 240 C 1170 240, 1190 335, 1245 335"
            stroke="url(#root-grad-right)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 1110 240 C 1170 240, 1190 335, 1245 335"
            stroke="#C4B5FD"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeOpacity="0.7"
          />

          {/* Outer Right Tendril: monday.com -> Figma (far edge root) */}
          <path
            d="M 1340 145 C 1380 145, 1400 210, 1425 230"
            stroke="url(#root-grad-right)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeOpacity="0.6"
          />

          {/* Outer Right Tendril: Miro -> Google Drive (far edge root) */}
          <path
            d="M 1340 335 C 1380 335, 1400 270, 1425 250"
            stroke="url(#root-grad-right)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeOpacity="0.6"
          />
        </svg>

        {/* ─────────────────────────────────────────────────────────────
            2. Center Hub: AssignX Core Node
           ───────────────────────────────────────────────────────────── */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="relative group">
            {/* Outer Pulsing Glow */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#8263F7] to-[#A78BFA] opacity-35 blur-md group-hover:opacity-60 transition-opacity" />
            <div className="w-[108px] h-[108px] rounded-full bg-white border-[10px] border-[#8263F7] shadow-xl shadow-[#8263F7]/25 flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer relative z-10">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M23.5 9.5L34.5 16V25.5L28 21.5V17L23.5 14.5L16.5 18.5L16 15L23.5 9.5Z"
                  fill="#8263F7"
                />
                <path
                  d="M12.5 24L20 19.5L27 23.5V32L21 28.5V24L15.5 27L12.5 24Z"
                  fill="#8263F7"
                />
                <path
                  d="M12.5 32.5L20 28V36L12.5 32.5Z"
                  fill="#8263F7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ── LEFT FLANK NODES ──────────────────────────────────────── */}
        {/* Node: GitHub (Outer Left Flank) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '5%', top: '50%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-3.5 py-2 inline-flex items-center gap-2 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#24292E">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="text-xs font-semibold text-slate-800">GitHub</span>
          </div>
        </div>

        {/* Node: Discord (Upper Left) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '17%', top: '30%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="22" height="17" viewBox="0 0 127.14 96.36" fill="#5865F2">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            <span className="text-sm font-bold text-[#5865F2] tracking-tight">Discord</span>
          </div>
        </div>

        {/* Node: Jira Software (Top Left Inner) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '36%', top: '15.5%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M11.53 2c0 5.26-4.27 9.53-9.53 9.53a9.53 9.53 0 0 0 9.53 9.53V2z"
                fill="#0052CC"
              />
              <path
                d="M11.97 2c0 5.26 4.27 9.53 9.53 9.53a9.53 9.53 0 0 1-9.53 9.53V2z"
                fill="#2684FF"
              />
            </svg>
            <span className="text-sm font-semibold text-slate-800">Jira Software</span>
          </div>
        </div>

        {/* Node: Slack (Middle Left Trunk) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '34%', top: '50%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
                fill="#E01E5A"
              />
              <path
                d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
                fill="#36C5F0"
              />
              <path
                d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"
                fill="#2EB67D"
              />
              <path
                d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
                fill="#ECB22E"
              />
            </svg>
            <span className="text-base font-bold text-black tracking-tight">slack</span>
          </div>
        </div>

        {/* Node: Airtable (Lower Left) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '17%', top: '70%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="22" height="18" viewBox="0 0 24 20" fill="none">
              <path
                d="M11.38 0.43c.38-.25.86-.25 1.24 0l9.7 6.47c.5.33.37 1.1-.22 1.1H1.9c-.59 0-.72-.77-.22-1.1L11.38.43z"
                fill="#FCB400"
              />
              <path
                d="M12 9.5v9.5c0 .55-.45 1-1 1H1.5c-.55 0-1-.45-1-1v-8.5c0-.55.45-1 1-1H11c.55 0 1 .45 1 1z"
                fill="#18BFFF"
              />
              <path
                d="M13 9h9.5c.55 0 1 .45 1 1v2.5c0 .35-.19.68-.49.85l-9.5 5.5c-.5.29-1.13-.07-1.13-.65v-8.2c0-.55.45-1 1-1z"
                fill="#F82B60"
              />
            </svg>
            <span className="text-sm font-semibold text-slate-800">Airtable</span>
          </div>
        </div>

        {/* Node: Confluence (Bottom Left Inner) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '36%', top: '84.5%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M2.38 17.65c-.4-.44-.63-1.02-.63-1.63 0-.61.23-1.19.63-1.63l5.52-6.02c.86-.94 2.29-.94 3.15 0l1.19 1.3-6.71 7.32c-.86.94-2.29.94-3.15.03v.03z"
                fill="#0052CC"
              />
              <path
                d="M21.62 6.35c.4.44.63 1.02.63 1.63 0 .61-.23 1.19-.63 1.63l-5.52 6.02c-.86.94-2.29.94-3.15 0l-1.19-1.3 6.71-7.32c.86-.94 2.29-.94 3.15-.03v-.03z"
                fill="#2684FF"
              />
            </svg>
            <span className="text-sm font-semibold text-slate-800">Confluence</span>
          </div>
        </div>

        {/* ── RIGHT FLANK NODES ─────────────────────────────────────── */}
        {/* Node: ClickUp (Top Right Inner) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '64%', top: '15.5%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 14.5l3.8-3c2.7 3.4 8.7 3.4 11.4 0l3.8 3c-4.4 5.3-14.6 5.3-19 0z"
                fill="#4285F4"
              />
              <path
                d="M12 4.5l-6.8 5.6 2.3 2.8 4.5-3.7 4.5 3.7 2.3-2.8L12 4.5z"
                fill="url(#clickup-linear-grad-wide)"
              />
              <defs>
                <linearGradient
                  id="clickup-linear-grad-wide"
                  x1="5.2"
                  y1="12.9"
                  x2="18.8"
                  y2="4.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF3E98" />
                  <stop offset="1" stopColor="#7B2CBF" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-bold text-slate-900">ClickUp</span>
          </div>
        </div>

        {/* Node: monday.com (Upper Right) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '83%', top: '30%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="22" height="16" viewBox="0 0 26 20" fill="none">
              <path
                d="M4 3c1.3 0 2.4 1.1 2.4 2.4v8.2c0 1.3-1.1 2.4-2.4 2.4S1.6 14.9 1.6 13.6V5.4C1.6 4.1 2.7 3 4 3z"
                fill="#FF3D57"
                transform="rotate(-15 4 9)"
              />
              <path
                d="M12 4.5c1.3 0 2.4 1.1 2.4 2.4v6.2c0 1.3-1.1 2.4-2.4 2.4s-2.4-1.1-2.4-2.4V6.9c0-1.3 1.1-2.4 2.4-2.4z"
                fill="#FFCB00"
                transform="rotate(-15 12 9)"
              />
              <circle cx="21" cy="12" r="3.2" fill="#00CA72" />
            </svg>
            <span className="text-sm font-semibold text-slate-800">
              monday<span className="font-normal text-slate-500">.com</span>
            </span>
          </div>
        </div>

        {/* Node: Asana (Middle Right Trunk) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '66%', top: '50%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#F06A6A">
              <circle cx="12" cy="7" r="4.2" />
              <circle cx="6.5" cy="16.5" r="4.2" />
              <circle cx="17.5" cy="16.5" r="4.2" />
            </svg>
            <span className="text-base font-bold text-slate-900 tracking-tight">asana</span>
          </div>
        </div>

        {/* Node: Miro (Lower Right) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '83%', top: '70%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="5" fill="#FFD02F" />
              <path
                d="M5.5 18.5l3.2-13h2.3l-3.2 13h-2.3zm4.5 0l3.2-13h2.3l-3.2 13H10zm4.5 0l3.2-13h2.3l-3.2 13h-2.3z"
                fill="#050038"
              />
            </svg>
            <span className="text-base font-bold text-[#050038] tracking-tight">miro</span>
          </div>
        </div>

        {/* Node: Notion (Bottom Right Inner) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '64%', top: '84.5%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="4"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="1.8"
              />
              <path
                d="M6 7.5h2.5l5.5 8V7.5H16v9h-2.5l-5.5-8V16.5H6v-9z"
                fill="#000000"
              />
            </svg>
            <span className="text-sm font-bold text-slate-900">Notion</span>
          </div>
        </div>

        {/* Node: Figma (Outer Right Flank) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '95%', top: '50%' }}
        >
          <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-3.5 py-2 inline-flex items-center gap-2 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#8263F7] transition-all duration-200 cursor-pointer whitespace-nowrap">
            <svg width="18" height="18" viewBox="0 0 38 57" fill="none">
              <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
              <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
              <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
              <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
            </svg>
            <span className="text-xs font-semibold text-slate-800">Figma</span>
          </div>
        </div>

      </div>
    </div>
  );
};

