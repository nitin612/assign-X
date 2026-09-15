import React from 'react';

export const IntegrationHub: React.FC = () => {
  return (
    <div className="mt-8 sm:mt-12 bg-[#FAFAFC] rounded-3xl sm:rounded-[36px] p-4 sm:p-8 lg:p-10 border border-slate-100 max-w-[1100px] mx-auto relative overflow-hidden shadow-xs">
      {/* Scroll container for responsiveness on mobile */}
      <div className="w-full overflow-x-auto overflow-y-hidden py-4 sm:py-2">
        <div className="relative min-w-[860px] max-w-[1000px] mx-auto aspect-[1000/440]">
          {/* ─────────────────────────────────────────────────────────────
              SVG Connecting Dashed Paths
              Tangents and junctions mathematically aligned to card anchors
             ───────────────────────────────────────────────────────────── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center to Slack (straight horizontal) */}
            <path
              d="M 448 220 L 390 220"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Center to Asana (straight horizontal) */}
            <path
              d="M 552 220 L 610 220"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Center to Jira Software (curve up-left to right edge of Jira) */}
            <path
              d="M 402 60 C 470 60, 500 115, 500 168"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Center to ClickUp (curve up-right to left edge of ClickUp) */}
            <path
              d="M 598 60 C 530 60, 500 115, 500 168"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Center to Confluence (curve down-left to right edge of Confluence) */}
            <path
              d="M 400 380 C 470 380, 500 325, 500 272"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Center to Notion (curve down-right to left edge of Notion) */}
            <path
              d="M 605 380 C 530 380, 500 325, 500 272"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Slack Branching Left Stem */}
            <path
              d="M 270 220 L 220 220"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Slack to Discord (curve up into Discord bottom center) */}
            <path
              d="M 220 220 C 170 220, 150 185, 150 156"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Slack to Airtable (curve down into Airtable top center) */}
            <path
              d="M 220 220 C 170 220, 150 255, 150 284"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Asana Branching Right Stem */}
            <path
              d="M 730 220 L 780 220"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Asana to monday.com (curve up into monday.com bottom center) */}
            <path
              d="M 780 220 C 830 220, 850 185, 850 156"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Asana to Miro (curve down into Miro top center) */}
            <path
              d="M 780 220 C 830 220, 850 255, 850 284"
              stroke="#BCA8F8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>

          {/* ─────────────────────────────────────────────────────────────
              1. Center Hub Node
              White circle with #8263F7 ring + 3-layer stepped glyph
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '50%' }}
          >
            <div className="w-[104px] h-[104px] rounded-full bg-white border-[10px] border-[#8263F7] shadow-lg shadow-[#8263F7]/15 flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
                {/* Top-right block */}
                <path
                  d="M23.5 9.5L34.5 16V25.5L28 21.5V17L23.5 14.5L16.5 18.5L16 15L23.5 9.5Z"
                  fill="#8263F7"
                />
                {/* Middle chevron */}
                <path
                  d="M12.5 24L20 19.5L27 23.5V32L21 28.5V24L15.5 27L12.5 24Z"
                  fill="#8263F7"
                />
                {/* Bottom left wedge */}
                <path
                  d="M12.5 32.5L20 28V36L12.5 32.5Z"
                  fill="#8263F7"
                />
              </svg>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              2. Jira Software (Top Left Inner)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '33%', top: '13.6%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
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

          {/* ─────────────────────────────────────────────────────────────
              3. Discord (Far Left Upper)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '15%', top: '30.7%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
              <svg width="22" height="17" viewBox="0 0 127.14 96.36" fill="#5865F2">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span className="text-sm font-bold text-[#5865F2] tracking-tight">Discord</span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4. Slack (Middle Left)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '33%', top: '50%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
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

          {/* ─────────────────────────────────────────────────────────────
              5. Airtable (Far Left Lower)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '15%', top: '69.3%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
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

          {/* ─────────────────────────────────────────────────────────────
              6. Confluence (Bottom Left Inner)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '33%', top: '86.4%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
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

          {/* ─────────────────────────────────────────────────────────────
              7. ClickUp (Top Right Inner)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '67%', top: '13.6%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 14.5l3.8-3c2.7 3.4 8.7 3.4 11.4 0l3.8 3c-4.4 5.3-14.6 5.3-19 0z"
                  fill="#4285F4"
                />
                <path
                  d="M12 4.5l-6.8 5.6 2.3 2.8 4.5-3.7 4.5 3.7 2.3-2.8L12 4.5z"
                  fill="url(#clickup-linear-grad)"
                />
                <defs>
                  <linearGradient
                    id="clickup-linear-grad"
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

          {/* ─────────────────────────────────────────────────────────────
              8. monday.com (Far Right Upper)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '85%', top: '30.7%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
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

          {/* ─────────────────────────────────────────────────────────────
              9. Asana (Middle Right)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '67%', top: '50%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#F06A6A">
                <circle cx="12" cy="7" r="4.2" />
                <circle cx="6.5" cy="16.5" r="4.2" />
                <circle cx="17.5" cy="16.5" r="4.2" />
              </svg>
              <span className="text-base font-bold text-slate-900 tracking-tight">asana</span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              10. Miro (Far Right Lower)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '85%', top: '69.3%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
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

          {/* ─────────────────────────────────────────────────────────────
              11. Notion (Bottom Right Inner)
             ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: '67%', top: '86.4%' }}
          >
            <div className="bg-white border-[1.5px] border-dashed border-[#BCA8F8] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-xs hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
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
        </div>
      </div>
    </div>
  );
};
