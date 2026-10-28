/* Dedicated Apple-Style Work Calendar Page */
import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { WorkCalendarView } from '../components/project/WorkCalendarView';
import {
  ArrowRight,
  Briefcase
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const { projects } = useApp();
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1550px] mx-auto pb-12 px-2 sm:px-4">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none">
              Work Calendar
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Day-by-day task agenda. See what's completed, what's pending, and what needs your review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            onClick={() => navigate('/work')}
          >
            <Briefcase size={14} />
            <span>My Work Cards</span>
          </button>

          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-[#FA795C] to-[#D95236] hover:brightness-105 active:scale-98 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={() => navigate('/create')}
          >
            <span>Create New Work</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Apple-Style Calendar Component ── */}
      <WorkCalendarView projects={projects} />
    </div>
  );
};

export default CalendarPage;
