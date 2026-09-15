import React, { useState } from 'react';
import {
  Play,
  Check,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Send,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface HeroWorkflowProps {
  onOpenDemo?: () => void;
  onNavigate?: (path: string) => void;
}

export const HeroWorkflow: React.FC<HeroWorkflowProps> = ({ onOpenDemo, onNavigate }) => {
  const [activeProject, setActiveProject] = useState<'restaurant' | 'fitness'>('restaurant');
  const [deliverableApproved, setDeliverableApproved] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [changeRequestText, setChangeRequestText] = useState('');
  const [changesSent, setChangesSent] = useState(false);

  const handleApprove = () => {
    setDeliverableApproved(true);
    setChangesSent(false);
  };

  const handleSendChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (changeRequestText.trim()) {
      setChangesSent(true);
      setShowChangeModal(false);
      setDeliverableApproved(false);
    }
  };

  return (
    <div className="relative w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">

      {/* ─────────────────────────────────────────────────────────────
          1. Hero Header & Orbital Badges
         ───────────────────────────────────────────────────────────── */}
      <div className="relative text-center max-w-[880px] mx-auto">

        {/* ── Left Orbit Dashed Ring & Badges ── */}
        <div className="hidden xl:block absolute -left-28 top-8 w-52 h-52 pointer-events-none">
          {/* Dashed Orbit Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-slate-300/80 animate-[spin_80s_linear_infinite]" />

          {/* Supervisor Card Bubble */}
          <div className="absolute -top-2 left-6 pointer-events-auto flex items-center gap-2 group">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=90&auto=format&fit=crop&q=80"
              alt="Arjun Mehta"
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md shadow-slate-200/60 group-hover:scale-105 transition-transform"
            />
            <div className="bg-white rounded-xl px-2.5 py-1 border border-slate-200 shadow-sm text-xs font-medium text-slate-800 flex items-center gap-1">
              <span>Arjun Mehta</span>
              <span className="text-[10px] text-amber-500 font-bold">⭐ 4.9</span>
            </div>
          </div>

          {/* Zero Worker Management Pill */}
          <div className="absolute -bottom-1 right-2 pointer-events-auto">
            <div className="bg-white rounded-full px-3 py-1.5 border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span className="text-[11.5px] font-semibold text-slate-800 whitespace-nowrap">
                Zero Worker Management
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Orbit Dashed Ring & Badges ── */}
        <div className="hidden xl:block absolute -right-28 top-8 w-52 h-52 pointer-events-none">
          {/* Dashed Orbit Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-slate-300/80 animate-[spin_70s_linear_infinite_reverse]" />

          {/* Progress Chip */}
          <div className="absolute -top-3 left-10 pointer-events-auto">
            <div className="bg-white rounded-full px-3 py-1 border border-slate-200/90 shadow-xs flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Restaurant: 68% Complete</span>
            </div>
          </div>

          {/* Right Escrow Pill */}
          <div className="absolute top-16 -right-8 pointer-events-auto">
            <div className="bg-white rounded-xl px-3 py-1.5 border border-slate-200/90 shadow-md flex items-center gap-1.5 text-xs font-semibold text-slate-800 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Milestone Escrow</span>
            </div>
          </div>

          {/* Bottom Review Status */}
          <div className="absolute -bottom-3 left-6 pointer-events-auto flex items-center gap-2">
            <div className="bg-white rounded-full px-2.5 py-0.5 border border-amber-200 bg-amber-50 shadow-2xs text-[11px] font-semibold text-amber-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Deliverable Ready for Review</span>
            </div>
          </div>
        </div>

        {/* ── Main Headline ── */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-normal text-slate-950 tracking-[-0.03em] leading-[1.12] mb-5">
          Tell Us What You Need. <br className="hidden sm:inline" />
          We Get It Done.
        </h1>

        {/* ── Subtitle / Tagline ── */}
        <p className="text-sm sm:text-base md:text-[16px] text-slate-600 max-w-[660px] mx-auto leading-relaxed font-normal mb-8">
          No finding freelancers. No managing workers. AssignX pairs you with a dedicated supervisor who directs the team, runs QA, and delivers ready-to-approve milestones.
        </p>

        {/* ── Dual CTAs ── */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => onNavigate?.('/create')}
            className="bg-gradient-to-b from-[#383747] via-[#262534] to-[#181724] hover:from-[#434254] hover:to-[#1f1e2c] text-white text-sm sm:text-[15px] font-semibold px-7 py-3 rounded-full shadow-md shadow-slate-900/15 border-t border-white/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>+ Create New Work</span>
            <ArrowRight className="w-4 h-4 text-[#D4F870]" />
          </button>
          <button
            onClick={() => onOpenDemo?.()}
            className="bg-white hover:bg-slate-50 text-slate-900 text-sm sm:text-[15px] font-semibold px-6 py-3 rounded-full border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
            <span>See How It Works</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Client Panel Preview Mockup (Dashboard + Milestones + Deliverable)
         ───────────────────────────────────────────────────────────── */}
      <div className="mt-12 sm:mt-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start text-left max-w-[1280px] mx-auto">

        {/* ── Left Column: Client Home Panel (3.5 cols) ── */}
        <div className="lg:col-span-4 xl:col-span-3.5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between min-h-[420px]">
          <div>
            {/* Header */}
            <div className="mb-4 pb-3 border-b border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Good morning, Alex 👋</p>
              <h3 className="text-base font-bold text-slate-950 tracking-tight mt-0.5">
                Here&apos;s what&apos;s happening
              </h3>
            </div>

            {/* Quick 4 Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-medium text-slate-500 block">Active Work</span>
                <span className="text-base font-bold text-slate-900">4</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100">
                <span className="text-[10px] font-medium text-amber-800 block">Awaiting Action</span>
                <span className="text-base font-bold text-amber-900">2</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[10px] font-medium text-emerald-800 block">Completed</span>
                <span className="text-base font-bold text-emerald-900">12</span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <span className="text-[10px] font-medium text-indigo-800 block">Total Spent</span>
                <span className="text-xs font-bold text-indigo-950">₹4,80,000</span>
              </div>
            </div>

            {/* Active Projects List */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                ACTIVE WORK
              </span>
              <div className="space-y-2">
                {/* Project 1: Restaurant Website */}
                <div
                  onClick={() => setActiveProject('restaurant')}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${activeProject === 'restaurant'
                    ? 'bg-slate-50/90 border-[#8B7CF8] shadow-2xs border-l-4 border-l-[#8B7CF8]'
                    : 'bg-white border-slate-150 hover:bg-slate-50/60'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        Restaurant Website Redesign
                      </h4>
                      <p className="text-[10px] text-slate-400">Website Dev · Arjun Mehta · Due 24 Sep</p>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 shrink-0">
                      68%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[68%]" />
                  </div>
                </div>

                {/* Project 2: Mobile Fitness App */}
                <div
                  onClick={() => setActiveProject('fitness')}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${activeProject === 'fitness'
                    ? 'bg-slate-50/90 border-[#8B7CF8] shadow-2xs border-l-4 border-l-[#8B7CF8]'
                    : 'bg-white border-slate-150 hover:bg-slate-50/60'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        Mobile Fitness App
                      </h4>
                      <p className="text-[10px] text-slate-400">Mobile Dev · Rahul Sharma · Due 15 Oct</p>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700 shrink-0">
                      42%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[42%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3">
            <button
              onClick={() => onNavigate?.('/create')}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>+ Create New Work</span>
            </button>
          </div>
        </div>

        {/* ── Middle Column: Supervisor & Milestones (5.5 cols) ── */}
        <div className="lg:col-span-5 xl:col-span-5.5 space-y-4">

          {/* Supervisor Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={
                    activeProject === 'restaurant'
                      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
                      : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
                  }
                  alt="Supervisor"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#8B7CF8]/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-950">
                      {activeProject === 'restaurant' ? 'Arjun Mehta' : 'Rahul Sharma'}
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      ⭐ 4.9 Supervisor
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Your single point of contact · Managing the AssignX team
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
              </span>
            </div>

            <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-150 text-[11.5px] text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero worker management:</strong> {activeProject === 'restaurant' ? 'Arjun' : 'Rahul'} directs developers & validates QA before sending deliverables.
              </span>
            </div>
          </div>

          {/* Milestones Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  PROJECT MILESTONES
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {activeProject === 'restaurant' ? 'Restaurant Web (₹85,000)' : 'Fitness App (₹1,40,000)'}
                </h4>
              </div>
              <span className="text-[11px] text-slate-500">
                Deadline: {activeProject === 'restaurant' ? '24 Sep 2026' : '15 Oct 2026'}
              </span>
            </div>

            <div className="space-y-2">
              {activeProject === 'restaurant' ? (
                <>
                  <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-semibold text-slate-900">1. UI/UX Design</span>
                    </div>
                    <span className="font-bold text-emerald-700">₹15,000 · Paid</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">
                        2
                      </span>
                      <span className="font-semibold text-slate-900">2. Frontend Web Dev (68%)</span>
                    </div>
                    <span className="font-bold text-blue-700">₹30,000 · In Review</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-[8px]">
                        3
                      </span>
                      <span>3. Backend & API</span>
                    </div>
                    <span>₹25,000 · Upcoming</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-semibold text-slate-900">1. Wireframes & Flows</span>
                    </div>
                    <span className="font-bold text-emerald-700">₹30,000 · Paid</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">
                        2
                      </span>
                      <span className="font-semibold text-slate-900">2. React Native App (42%)</span>
                    </div>
                    <span className="font-bold text-blue-700">₹50,000 · In Progress</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* ── Right Column: Deliverables & Supervisor Chat (3 cols) ── */}
        <div className="lg:col-span-3 xl:col-span-3 space-y-4">

          {/* Action Required Card */}
          <div className="bg-white rounded-2xl p-4 border border-amber-200 bg-amber-50/20 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Action Required</span>
              </div>
              <span className="text-[9px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                Review Ready
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-900 leading-snug">
              Frontend Development milestone is ready for review.
            </p>

            <div className="mt-2.5 p-2 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#8B7CF8]/10 text-[#7B61FF] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-slate-900 truncate block">
                  Homepage_V1.preview
                </span>
                <span className="text-[9px] text-slate-400">Next.js Live Preview</span>
              </div>
            </div>

            <div className="mt-2.5">
              {deliverableApproved ? (
                <div className="p-2 rounded-xl bg-emerald-500 text-white text-[11px] font-semibold text-center flex items-center justify-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Approved! Next milestone unlocked.</span>
                </div>
              ) : changesSent ? (
                <div className="p-2 rounded-xl bg-blue-600 text-white text-[11px] font-semibold text-center flex items-center justify-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Changes sent to supervisor.</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={handleApprove}
                    className="py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => setShowChangeModal(true)}
                    className="py-1.5 px-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center"
                  >
                    <span>Request Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Supervisor Async Chat Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <MessageSquare className="w-3.5 h-3.5 text-[#7B61FF]" />
                <span>Supervisor Chat</span>
              </div>
              <span className="text-[9px] text-slate-400">Direct</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-xl bg-slate-50 text-slate-800 border border-slate-150">
                <p className="text-[9px] font-bold text-[#7B61FF] mb-0.5">Arjun · Supervisor</p>
                <p className="text-[10.5px] leading-relaxed">
                  We completed the homepage with live reservations. Please review it!
                </p>
              </div>

              <div className="p-2 rounded-xl bg-[#8B7CF8]/10 text-slate-900 border border-[#8B7CF8]/20 text-right ml-3">
                <p className="text-[9px] font-bold text-slate-700 mb-0.5">You (Client)</p>
                <p className="text-[10.5px] leading-relaxed">
                  {changesSent ? changeRequestText : 'Looks great. Can we tweak the hero image?'}
                </p>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 text-slate-800 border border-slate-150">
                <p className="text-[9px] font-bold text-[#7B61FF] mb-0.5">Arjun · Supervisor</p>
                <p className="text-[10.5px] leading-relaxed">
                  {changesSent ? 'Got it! Coordinating with the team right away. 👊' : 'Coordinating that with the design team now!'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── Request Changes Modal ── */}
      {showChangeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-950">Request Changes</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Tell your supervisor what you&apos;d like changed. Arjun coordinates the team behind the scenes.
            </p>

            <form onSubmit={handleSendChanges} className="space-y-3">
              <textarea
                required
                rows={3}
                value={changeRequestText}
                onChange={(e) => setChangeRequestText(e.target.value)}
                placeholder="e.g. The homepage looks good, but please change the hero image and add a pricing section."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#8B7CF8]"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangeModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Send to Supervisor</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
