import React, { useState, useMemo } from 'react';
import type { Project } from '../../types';
import { useNavigation } from '../../context/NavigationContext';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Plus,
  Layers,
  Globe,
  Smartphone,
  Palette,
  Sparkles,
  BarChart3,
  Calendar as CalendarIcon,
  Check
} from 'lucide-react';

export interface CalendarTaskItem {
  id: string;
  title: string;
  type: 'task' | 'milestone' | 'action' | 'custom';
  dateKey: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "10 Sep 2026"
  status: 'done' | 'pending';
  progress?: number;
  projectId: string;
  projectTitle: string;
  projectCategory: string;
  supervisorName: string;
  supervisorAvatar: string;
  supervisorRole?: string;
  isActionRequired?: boolean;
  actionLabel?: string;
  priority?: 'high' | 'medium' | 'normal';
}

interface WorkCalendarViewProps {
  projects: Project[];
}

// Helper to normalize any date string into YYYY-MM-DD
function parseDateKey(dateStr?: string): string | null {
  if (!dateStr) return null;

  // Try direct YYYY-MM-DD
  const isoMatch = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const y = parseInt(isoMatch[1], 10);
    const m = String(parseInt(isoMatch[2], 10)).padStart(2, '0');
    const d = String(parseInt(isoMatch[3], 10)).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // Matches like "10 Sep 2026" or "24 September 2026"
  const textMatch = dateStr.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (textMatch) {
    const day = String(parseInt(textMatch[1], 10)).padStart(2, '0');
    const monthName = textMatch[2].toLowerCase();
    const year = textMatch[3];

    const months = [
      ['jan', 'january'],
      ['feb', 'february'],
      ['mar', 'march'],
      ['apr', 'april'],
      ['may', 'may'],
      ['jun', 'june'],
      ['jul', 'july'],
      ['aug', 'august'],
      ['sep', 'september'],
      ['oct', 'october'],
      ['nov', 'november'],
      ['dec', 'december']
    ];

    const monthIndex = months.findIndex(
      m => m[0] === monthName || m[1] === monthName || monthName.startsWith(m[0])
    );
    if (monthIndex !== -1) {
      const month = String(monthIndex + 1).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }

  // Fallback to Date
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  return null;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const WorkCalendarView: React.FC<WorkCalendarViewProps> = ({ projects }) => {
  const { navigate } = useNavigation();

  // Active viewing month & year (defaulting to September 2026 where project sprints are active)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(8); // 8 is September (0-indexed)

  // Selected date key in YYYY-MM-DD
  const [selectedDateKey, setSelectedDateKey] = useState<string>('2026-09-10');

  // Filter in the Day Inspector: 'all' | 'pending' | 'done'
  const [dayTaskFilter, setDayTaskFilter] = useState<'all' | 'pending' | 'done'>('all');

  // Interactive task completion overrides (allowing user to check/uncheck tasks)
  const [taskStatusOverrides, setTaskStatusOverrides] = useState<Record<string, 'done' | 'pending'>>({});

  // Custom user-added tasks
  const [customTasks, setCustomTasks] = useState<CalendarTaskItem[]>([]);
  const [newQuickTaskTitle, setNewQuickTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Extract all tasks, milestones and actions from projects
  const allTasks = useMemo<CalendarTaskItem[]>(() => {
    const items: CalendarTaskItem[] = [];

    projects.forEach(project => {
      // 1. Phase Tasks
      project.phases?.forEach(phase => {
        phase.tasks?.forEach(task => {
          const dateKey = parseDateKey(task.expectedDate);
          if (dateKey) {
            const isCompleted = task.status === 'Completed' || task.progress === 100;
            items.push({
              id: task.id,
              title: task.name,
              type: 'task',
              dateKey,
              formattedDate: task.expectedDate,
              status: isCompleted ? 'done' : 'pending',
              progress: task.progress,
              projectId: project.id,
              projectTitle: project.title,
              projectCategory: project.category,
              supervisorName: project.supervisor.name,
              supervisorAvatar: project.supervisor.avatar,
              supervisorRole: project.supervisor.role,
              priority: task.progress > 0 && !isCompleted ? 'high' : 'normal'
            });
          }
        });
      });

      // 2. Milestones
      project.milestones?.forEach(milestone => {
        const dateKey = parseDateKey(milestone.dueDate);
        if (dateKey) {
          const isDone = milestone.status === 'Paid' || milestone.status === 'Approved';
          items.push({
            id: `ms-${milestone.id}`,
            title: `Milestone: ${milestone.name}`,
            type: 'milestone',
            dateKey,
            formattedDate: milestone.dueDate,
            status: isDone ? 'done' : 'pending',
            projectId: project.id,
            projectTitle: project.title,
            projectCategory: project.category,
            supervisorName: project.supervisor.name,
            supervisorAvatar: project.supervisor.avatar,
            isActionRequired: Boolean(milestone.actionRequired),
            actionLabel: milestone.actionRequired?.label,
            priority: milestone.actionRequired ? 'high' : 'medium'
          });
        }
      });

      // 3. Project Next Action
      if (project.nextAction?.deadline) {
        const dateKey = parseDateKey(project.nextAction.deadline);
        if (dateKey) {
          items.push({
            id: `action-${project.id}`,
            title: `Action: ${project.nextAction.title}`,
            type: 'action',
            dateKey,
            formattedDate: project.nextAction.deadline,
            status: 'pending',
            projectId: project.id,
            projectTitle: project.title,
            projectCategory: project.category,
            supervisorName: project.supervisor.name,
            supervisorAvatar: project.supervisor.avatar,
            isActionRequired: true,
            actionLabel: 'Immediate Review Needed',
            priority: 'high'
          });
        }
      }
    });

    // Merge custom user-added tasks
    return [...items, ...customTasks];
  }, [projects, customTasks]);

  // Apply user status overrides
  const tasksWithOverrides = useMemo(() => {
    return allTasks.map(t => {
      if (taskStatusOverrides[t.id]) {
        return { ...t, status: taskStatusOverrides[t.id] };
      }
      return t;
    });
  }, [allTasks, taskStatusOverrides]);

  // Group tasks by DateKey
  const tasksByDate = useMemo(() => {
    const map = new Map<string, CalendarTaskItem[]>();
    tasksWithOverrides.forEach(task => {
      const existing = map.get(task.dateKey) || [];
      existing.push(task);
      map.set(task.dateKey, existing);
    });
    return map;
  }, [tasksWithOverrides]);

  // Month Statistics
  const monthStats = useMemo(() => {
    const monthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    const monthTasks = tasksWithOverrides.filter(t => t.dateKey.startsWith(monthPrefix));
    const doneCount = monthTasks.filter(t => t.status === 'done').length;
    const pendingCount = monthTasks.filter(t => t.status === 'pending').length;
    const actionCount = monthTasks.filter(t => t.isActionRequired && t.status === 'pending').length;

    return {
      total: monthTasks.length,
      done: doneCount,
      pending: pendingCount,
      actionRequired: actionCount
    };
  }, [tasksWithOverrides, currentYear, currentMonth]);

  // Selected date tasks
  const selectedDayTasks = useMemo(() => {
    const list = tasksByDate.get(selectedDateKey) || [];
    if (dayTaskFilter === 'all') return list;
    return list.filter(t => t.status === dayTaskFilter);
  }, [tasksByDate, selectedDateKey, dayTaskFilter]);

  const selectedDayAllTasks = useMemo(() => {
    return tasksByDate.get(selectedDateKey) || [];
  }, [tasksByDate, selectedDateKey]);

  const selectedDayDoneCount = selectedDayAllTasks.filter(t => t.status === 'done').length;
  const selectedDayPendingCount = selectedDayAllTasks.filter(t => t.status === 'pending').length;

  // Toggle task status
  const handleToggleTaskStatus = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTaskStatusOverrides(prev => {
      const current = prev[taskId] || allTasks.find(t => t.id === taskId)?.status || 'pending';
      return {
        ...prev,
        [taskId]: current === 'done' ? 'pending' : 'done'
      };
    });
  };

  // Add custom task to selected day
  const handleAddQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuickTaskTitle.trim()) return;

    const parts = selectedDateKey.split('-');
    const y = parts[0];
    const m = MONTH_NAMES[parseInt(parts[1], 10) - 1].slice(0, 3);
    const d = parts[2];
    const formatted = `${d} ${m} ${y}`;

    const newTask: CalendarTaskItem = {
      id: `custom-${Date.now()}`,
      title: newQuickTaskTitle.trim(),
      type: 'custom',
      dateKey: selectedDateKey,
      formattedDate: formatted,
      status: 'pending',
      projectId: projects[0]?.id || 'custom',
      projectTitle: projects[0]?.title || 'Personal Workspace',
      projectCategory: 'Other',
      supervisorName: 'You (Personal Reminder)',
      supervisorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      priority: 'medium'
    };

    setCustomTasks(prev => [...prev, newTask]);
    setNewQuickTaskTitle('');
    setIsAddingTask(false);
  };

  // Navigate month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleToday = () => {
    // Jump to September 2026 active demo month & day 10
    setCurrentYear(2026);
    setCurrentMonth(8);
    setSelectedDateKey('2026-09-10');
  };

  // Find next active day with tasks
  const handleJumpToNextActiveDay = () => {
    const allDatesWithTasks = Array.from(tasksByDate.keys()).sort();
    const nextDate = allDatesWithTasks.find(d => d > selectedDateKey) || allDatesWithTasks[0];
    if (nextDate) {
      const [y, m] = nextDate.split('-').map(Number);
      setCurrentYear(y);
      setCurrentMonth(m - 1);
      setSelectedDateKey(nextDate);
    }
  };

  // Calendar days calculation
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    // Previous month filler days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateKey = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dayNum,
        dateKey,
        isCurrentMonth: false,
        isPrev: true
      });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNum: i,
        dateKey,
        isCurrentMonth: true,
        isPrev: false
      });
    }

    // Next month filler days to complete 35 or 42 grid
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateKey = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNum: i,
        dateKey,
        isCurrentMonth: false,
        isPrev: false
      });
    }

    return days;
  }, [currentYear, currentMonth]);

  // Format selected date for Apple-style header
  const selectedDateFormatted = useMemo(() => {
    const parts = selectedDateKey.split('-');
    if (parts.length !== 3) return { weekday: '', dayNum: '', monthYear: '' };
    const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const month = MONTH_NAMES[dateObj.getMonth()];
    return {
      weekday,
      dayNum: parts[2],
      monthYear: `${month} ${parts[0]}`,
      full: `${weekday}, ${month} ${parts[2]}, ${parts[0]}`
    };
  }, [selectedDateKey]);

  // Category Icon helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Website Development':
        return <Globe size={11} className="text-orange-500" />;
      case 'Mobile App Development':
        return <Smartphone size={11} className="text-rose-500" />;
      case 'UI/UX Design':
        return <Palette size={11} className="text-purple-500" />;
      case 'Graphic Design':
        return <Sparkles size={11} className="text-pink-500" />;
      case 'Digital Marketing':
        return <BarChart3 size={11} className="text-emerald-500" />;
      default:
        return <Layers size={11} className="text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ── Apple-Style Top Navigation & Filter Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)]">
        {/* Left: Month Selector & Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-all cursor-pointer active:scale-95"
              title="Previous Month"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-all cursor-pointer active:scale-95"
              title="Next Month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
            <span>{MONTH_NAMES[currentMonth]}</span>
            <span className="font-medium text-slate-400 dark:text-zinc-500">{currentYear}</span>
          </h2>

          <button
            onClick={handleToday}
            className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-all cursor-pointer"
          >
            Today
          </button>
        </div>

        {/* Right: Month Quick Stats & Status Legend */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Summary Badges */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
            <span>{monthStats.done} Done</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/40 text-orange-800 dark:text-orange-300 text-xs font-semibold">
            <Clock size={13} className="text-[#EE6B50]" />
            <span>{monthStats.pending} Pending</span>
          </div>

          {monthStats.actionRequired > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/40 text-rose-800 dark:text-rose-300 text-xs font-semibold">
              <AlertCircle size={13} className="text-rose-600" />
              <span>{monthStats.actionRequired} Actions</span>
            </div>
          )}

          <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium pl-1">
            Total {monthStats.total} deliverables in {MONTH_NAMES[currentMonth].slice(0, 3)}
          </div>
        </div>
      </div>

      {/* ── Apple-Style 2-Column Split: Calendar Grid + Day Inspector ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ─────────────────────────────────────────────────────────────
            LEFT COLUMN (7 cols): Apple Month Calendar Grid
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121216] rounded-2xl border border-slate-200/90 dark:border-white/10 p-3 sm:p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] flex flex-col">
          {/* Day of Week Header */}
          <div className="grid grid-cols-7 mb-2 border-b border-slate-100 dark:border-zinc-800/80 pb-2">
            {WEEKDAY_NAMES.map(weekday => (
              <div
                key={weekday}
                className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500"
              >
                {weekday}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {calendarDays.map((day) => {
              const dayTasks = tasksByDate.get(day.dateKey) || [];
              const isSelected = day.dateKey === selectedDateKey;
              const isToday = day.dateKey === '2026-09-10'; // Demo today anchor

              const doneCount = dayTasks.filter(t => t.status === 'done').length;
              const pendingCount = dayTasks.filter(t => t.status === 'pending').length;
              const hasAction = dayTasks.some(t => t.isActionRequired && t.status === 'pending');

              return (
                <div
                  key={day.dateKey}
                  onClick={() => {
                    setSelectedDateKey(day.dateKey);
                    if (!day.isCurrentMonth) {
                      const [y, m] = day.dateKey.split('-').map(Number);
                      setCurrentYear(y);
                      setCurrentMonth(m - 1);
                    }
                  }}
                  className={`min-h-[72px] sm:min-h-[92px] p-1 sm:p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left select-none relative group ${isSelected
                      ? 'bg-orange-50/70 dark:bg-orange-950/20 border-[#FA795C] dark:border-[#EE6B50] ring-2 ring-[#FA795C]/20 shadow-sm'
                      : day.isCurrentMonth
                        ? 'bg-slate-50/50 hover:bg-slate-100/70 dark:bg-zinc-900/40 dark:hover:bg-zinc-800/60 border-slate-200/60 dark:border-zinc-800/60'
                        : 'bg-transparent text-slate-300 dark:text-zinc-600 border-transparent hover:bg-slate-50 dark:hover:bg-zinc-900/20'
                    }`}
                >
                  {/* Day Number Header */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center transition-all ${isSelected
                          ? 'bg-gradient-to-b from-[#FA795C] to-[#D95236] text-white shadow-xs font-bold'
                          : isToday
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                            : day.isCurrentMonth
                              ? 'text-slate-800 dark:text-zinc-200'
                              : 'text-slate-400 dark:text-zinc-600'
                        }`}
                    >
                      {day.dayNum}
                    </span>

                    {/* Small count indicators or action flame */}
                    {hasAction && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" title="Action Required" />
                    )}
                  </div>

                  {/* Day Task Indicators (Apple-style mini pills) */}
                  <div className="flex flex-col gap-1 mt-1">
                    {/* Compact preview chips on screens >= 640px */}
                    <div className="hidden sm:flex flex-col gap-0.5 overflow-hidden">
                      {dayTasks.slice(0, 2).map(task => (
                        <div
                          key={task.id}
                          className={`text-[9.5px] px-1.5 py-0.5 rounded-md truncate font-medium flex items-center gap-1 ${task.status === 'done'
                              ? 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 line-through opacity-75'
                              : task.isActionRequired
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 font-semibold'
                                : 'bg-amber-100/70 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200'
                            }`}
                          title={task.title}
                        >
                          <span className="shrink-0">
                            {task.status === 'done' ? '✓' : task.isActionRequired ? '!' : '•'}
                          </span>
                          <span className="truncate">{task.title.replace(/^(Milestone:|Action:)\s*/, '')}</span>
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <span className="text-[8.5px] text-slate-500 dark:text-zinc-400 font-bold pl-0.5">
                          +{dayTasks.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Mobile colored dots view */}
                    <div className="flex sm:hidden items-center gap-1 mt-auto">
                      {doneCount > 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title={`${doneCount} Done`} />
                      )}
                      {pendingCount > 0 && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${hasAction ? 'bg-rose-500' : 'bg-amber-500'
                            }`}
                          title={`${pendingCount} Pending`}
                        />
                      )}
                      {dayTasks.length > 2 && (
                        <span className="text-[8px] text-slate-400 font-bold">
                          +{dayTasks.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom legend */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 pt-3 mt-3 border-t border-slate-100 dark:border-zinc-800/80 flex-wrap gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Done (Verified)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Pending / In Progress
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Action Required
              </span>
            </div>
            <span className="text-slate-400 text-[10.5px]">Click any date to inspect tasks</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT COLUMN (5 cols): Apple Reminders / Day Inspector
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 bg-white dark:bg-[#121216] rounded-2xl border border-slate-200/90 dark:border-white/10 p-4 sm:p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] flex flex-col gap-4">
          {/* Day Header Banner (Apple Style) */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#EE6B50]">
                {selectedDateFormatted.weekday}
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white mt-0.5">
                {selectedDateFormatted.monthYear ? `${selectedDateFormatted.dayNum} ${selectedDateFormatted.monthYear}` : 'Selected Day'}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  {selectedDayAllTasks.length} {selectedDayAllTasks.length === 1 ? 'task' : 'tasks'}
                </span>
                <span className="text-slate-300 dark:text-zinc-700">•</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  {selectedDayDoneCount} Done
                </span>
                <span className="text-slate-300 dark:text-zinc-700">•</span>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  {selectedDayPendingCount} Pending
                </span>
              </div>
            </div>

            {/* Quick Add Task Button */}
            <button
              onClick={() => setIsAddingTask(prev => !prev)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-semibold transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <Plus size={14} />
              <span>Add Task</span>
            </button>
          </div>

          {/* Quick Add Task Form */}
          {isAddingTask && (
            <form
              onSubmit={handleAddQuickTask}
              className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-700 flex flex-col gap-2"
            >
              <div className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                New Task for {selectedDateFormatted.dayNum} {selectedDateFormatted.monthYear?.split(' ')[0]}
              </div>
              <input
                type="text"
                autoFocus
                placeholder="e.g. Call Arjun regarding menu updates..."
                value={newQuickTaskTitle}
                onChange={e => setNewQuickTaskTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:border-[#EE6B50]"
              />
              <div className="flex items-center justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-700 dark:text-zinc-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newQuickTaskTitle.trim()}
                  className="px-3 py-1 bg-gradient-to-b from-[#FA795C] to-[#D95236] text-white rounded-lg text-xs font-semibold disabled:opacity-50 cursor-pointer active:scale-95"
                >
                  Save Task
                </button>
              </div>
            </form>
          )}

          {/* Filter Pills for the Day: All | Pending | Done */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-zinc-800/80 text-xs font-medium">
            <button
              onClick={() => setDayTaskFilter('all')}
              className={`flex-1 py-1 px-2.5 rounded-lg text-center transition-all cursor-pointer font-semibold ${dayTaskFilter === 'all'
                  ? 'bg-white dark:bg-zinc-700 text-slate-950 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                }`}
            >
              All ({selectedDayAllTasks.length})
            </button>
            <button
              onClick={() => setDayTaskFilter('pending')}
              className={`flex-1 py-1 px-2.5 rounded-lg text-center transition-all cursor-pointer font-semibold ${dayTaskFilter === 'pending'
                  ? 'bg-white dark:bg-zinc-700 text-slate-950 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                }`}
            >
              Pending ({selectedDayPendingCount})
            </button>
            <button
              onClick={() => setDayTaskFilter('done')}
              className={`flex-1 py-1 px-2.5 rounded-lg text-center transition-all cursor-pointer font-semibold ${dayTaskFilter === 'done'
                  ? 'bg-white dark:bg-zinc-700 text-slate-950 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                }`}
            >
              Done ({selectedDayDoneCount})
            </button>
          </div>

          {/* Day Task List */}
          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[460px] pr-1">
            {selectedDayTasks.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-dashed border-slate-200 dark:border-zinc-800 flex flex-col items-center justify-center my-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400 mb-2.5">
                  <CalendarIcon size={18} />
                </div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                  No tasks on this date
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed">
                  Your supervisor and team have no deliverables scheduled for this day.
                </p>
                <button
                  onClick={handleJumpToNextActiveDay}
                  className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Jump to Next Active Day</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ) : (
              selectedDayTasks.map(task => {
                const isDone = task.status === 'done';

                return (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl border transition-all text-left flex flex-col gap-2 ${isDone
                        ? 'bg-slate-50/70 dark:bg-zinc-900/40 border-slate-200/60 dark:border-zinc-800/60 opacity-80'
                        : task.isActionRequired
                          ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 shadow-2xs'
                          : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-2xs'
                      }`}
                  >
                    {/* Top Row: Apple Reminders Checkbox + Task Title */}
                    <div className="flex items-start gap-2.5">
                      {/* Apple Reminders Circular Checkbox */}
                      <button
                        type="button"
                        onClick={e => handleToggleTaskStatus(task.id, e)}
                        className={`w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center transition-all cursor-pointer ${isDone
                            ? 'bg-emerald-500 text-white shadow-2xs'
                            : 'border-2 border-slate-300 dark:border-zinc-600 hover:border-[#EE6B50] bg-white dark:bg-zinc-800'
                          }`}
                        title={isDone ? 'Mark as Pending' : 'Mark as Completed'}
                      >
                        {isDone && <Check size={12} strokeWidth={3} />}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            className={`text-xs font-semibold leading-snug ${isDone
                                ? 'line-through text-slate-500 dark:text-zinc-400'
                                : 'text-slate-900 dark:text-white'
                              }`}
                          >
                            {task.title}
                          </h4>

                          {/* Status Pill */}
                          <span
                            className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${isDone
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : task.isActionRequired
                                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}
                          >
                            {isDone ? 'Done' : task.isActionRequired ? 'Action Req.' : 'Pending'}
                          </span>
                        </div>

                        {/* Action banner if action required */}
                        {task.isActionRequired && !isDone && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-rose-700 dark:text-rose-300 font-semibold bg-rose-100/60 dark:bg-rose-950/40 px-2 py-1 rounded-lg">
                            <AlertCircle size={12} className="shrink-0 text-rose-600" />
                            <span>{task.actionLabel || 'Requires your review / approval'}</span>
                          </div>
                        )}

                        {/* Progress Bar (if in progress) */}
                        {task.progress !== undefined && task.progress > 0 && !isDone && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-zinc-400 mb-1">
                              <span>Progress</span>
                              <span className="font-semibold text-slate-700 dark:text-zinc-300">
                                {task.progress}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-orange-400 to-[#FA795C] rounded-full transition-all duration-300"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Project & Supervisor Footer Meta */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-zinc-800/80 text-[10.5px] text-slate-500 dark:text-zinc-400 flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/work/${task.projectId}`)}
                            className="flex items-center gap-1 font-medium hover:text-[#EE6B50] transition-colors truncate max-w-[190px] cursor-pointer"
                            title={task.projectTitle}
                          >
                            {getCategoryIcon(task.projectCategory)}
                            <span className="truncate">{task.projectTitle}</span>
                          </button>

                          {/* Supervisor Chip */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <img
                              src={task.supervisorAvatar}
                              alt={task.supervisorName}
                              className="w-4 h-4 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
                            />
                            <span className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                              {task.supervisorName.split(' ')[0]} (Lead)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
