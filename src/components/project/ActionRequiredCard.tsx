/* Modern Action Required Alert Card Component */
import React from 'react';
import { AlertCircle, Clock, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ActionRequiredCardProps {
  projectId: string;
  projectTitle: string;
  actionTitle: string;
  actionDescription: string;
  actionType: 'approve' | 'review' | 'pay' | 'info';
  deadline?: string;
  onActionClick?: () => void;
}

export const ActionRequiredCard: React.FC<ActionRequiredCardProps> = ({
  projectId,
  projectTitle,
  actionTitle,
  actionDescription,
  actionType,
  deadline,
  onActionClick
}) => {
  const { navigate } = useNavigation();

  const getActionLabel = () => {
    switch (actionType) {
      case 'approve': return 'Approve Milestone';
      case 'pay': return 'Pay Escrow';
      case 'review': return 'Review Work';
      case 'info': return 'Provide Info';
      default: return 'Take Action';
    }
  };

  const handleClick = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      navigate(`/work/${projectId}`);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900/60 border border-stone-200/80 dark:border-zinc-800 rounded-2xl p-4 lg:p-5 flex items-center justify-between gap-4 transition-all hover:border-blue-300 dark:hover:border-blue-900 shadow-xs">
      <div className="flex items-start gap-3.5 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0052CC] dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100 dark:border-blue-900/40">
          <AlertCircle size={18} strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
              {projectTitle}
            </span>
            {deadline && (
              <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1 font-normal">
                <Clock size={12} /> Deadline: {deadline}
              </span>
            )}
          </div>

          <h4 className="text-sm font-semibold text-slate-950 dark:text-white leading-snug">
            {actionTitle}
          </h4>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-1 font-normal">
            {actionDescription}
          </p>
        </div>
      </div>

      <button
        className="px-4 py-2 rounded-xl bg-[#0052CC] hover:bg-[#0047B3] text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 shadow-xs hover:shadow-sm cursor-pointer transition-all"
        onClick={handleClick}
      >
        <span>{getActionLabel()}</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
};
