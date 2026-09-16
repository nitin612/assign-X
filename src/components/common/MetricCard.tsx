/* Minimal Modern Metric Card Component */
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon,
  iconBg,
  trend
}) => {
  return (
    <div className="bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-zinc-800/90 rounded-2xl p-5 shadow-[0_3px_12px_-1px_rgba(15,23,42,0.06),0_1px_4px_-1px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_-3px_rgba(15,23,42,0.09)] hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
          {label}
        </span>
        {icon && (
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: iconBg || 'rgba(0, 82, 204, 0.08)' }}
          >
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl lg:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight mb-1">
          {value}
        </div>
        {(subtext || trend) && (
          <div className="text-xs text-slate-500 dark:text-zinc-400 flex items-center font-normal">
            {trend && (
              <span
                className={`font-medium mr-1.5 ${
                  trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {trend.value}
              </span>
            )}
            <span>{subtext}</span>
          </div>
        )}
      </div>
    </div>
  );
};
