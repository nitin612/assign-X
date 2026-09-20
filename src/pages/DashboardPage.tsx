/* Modern Client Marketplace Dashboard — AssignX with Framer Motion */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { MetricCard } from '../components/common/MetricCard';
import { ActionRequiredCard } from '../components/project/ActionRequiredCard';
import { ProjectCard } from '../components/project/ProjectCard';
import {
  Briefcase,
  AlertCircle,
  CheckCircle2,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
  ChevronsUp,
  ArrowRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { projects, openModal } = useApp();
  const { navigate } = useNavigation();

  // Metrics
  const activeProjects = projects.filter(
    p => p.status === 'In Progress' || p.status === 'Awaiting Action' || p.status === 'Under Review'
  );
  const actionRequiredProjects = projects.filter(p => p.nextAction !== undefined);
  const completedProjects = projects.filter(p => p.status === 'Completed');
  const totalSpent = projects.reduce((sum, p) => sum + p.paidAmount, 0) || 281000;

  const [showAllActions, setShowAllActions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'action' | 'active'>('all');

  // Currently active project for the timeline scrubber
  const currentProject = projects[selectedProjectIndex] || projects[0];
  const projectMilestones = currentProject?.milestones || [];

  const handlePrevProject = () => {
    setSelectedProjectIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1));
    setSelectedMilestoneIndex(0);
  };

  const handleNextProject = () => {
    setSelectedProjectIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
    setSelectedMilestoneIndex(0);
  };

  // Filter projects for the Active Work list
  const filteredProjects = projects.filter(p => {
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'action') return p.nextAction !== undefined;
    if (activeFilter === 'active') return p.status === 'In Progress' || p.status === 'Awaiting Action' || p.status === 'Under Review';
    return true;
  });

  const displayedActions = showAllActions ? actionRequiredProjects : actionRequiredProjects.slice(0, 2);

  // Selected milestone for active tooltip card
  const activeMilestone = projectMilestones[selectedMilestoneIndex] || projectMilestones[0];

  const getMilestonePinColor = (status: string) => {
    switch (status) {
      case 'Paid':
      case 'Approved':
        return '#22C55E'; // Green
      case 'Submitted':
      case 'Pending Client Action':
        return '#F59E0B'; // Amber
      default:
        return '#EE6B50'; // Coral / Upcoming
    }
  };

  const handleTooltipClick = () => {
    if (activeMilestone?.status === 'Submitted' || activeMilestone?.approvalStatus === 'Pending Client Action') {
      openModal('approve_milestone', {
        projectId: currentProject.id,
        milestoneId: activeMilestone.id,
        milestoneName: activeMilestone.name,
        amount: activeMilestone.amount
      });
    } else {
      navigate(`/work/${currentProject.id}`);
    }
  };

  // Position calculation for milestones
  const total = projectMilestones.length || 1;
  const currentPosPercent = total === 1 ? 50 : Math.round(14 + (selectedMilestoneIndex * 72) / (total - 1));
  const pinColor = activeMilestone ? getMilestonePinColor(activeMilestone.status) : '#EE6B50';

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-12">
      {/* ── 1. Top Header & Greeting ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <div>
          <div className="text-sm font-normal text-slate-500 dark:text-zinc-400 mb-1">
            Good morning, Alex.
          </div>
          <div className="flex items-center gap-3.5 flex-wrap">
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none">
              Here’s your work at a glance.
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E0E7FF] text-[#4338CA] dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Let’s Build
            </span>
          </div>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-[#FA795C] to-[#D95236] hover:brightness-105 active:scale-98 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          onClick={() => navigate('/create')}
        >
          <span>Create New Work</span>
          <ArrowRight size={16} />
        </button>
      </motion.div>

      {/* ── 2. Interactive Milestone Delivery Scrubber with Framer Motion ── */}
      <div className="milestone-scrubber-card overflow-hidden">
        {/* Scrubber Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5"
            >
              <span className="text-[15px] font-semibold text-slate-950 dark:text-white">
                {currentProject.title}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 font-medium border border-orange-100 dark:border-orange-900/40">
                {currentProject.currentPhase} · {currentProject.progress}% Done
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="text-xs text-slate-500 dark:text-zinc-400 font-normal flex items-center gap-1.5">
            <span>Supervisor:</span>
            <strong className="text-slate-800 dark:text-zinc-200 font-medium">{currentProject.supervisor.name}</strong>
          </div>
        </div>

        {/* Timeline Axis Track */}
        <div className="scrubber-track-container relative py-2">
          <button
            className="scrubber-arrow-btn cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            onClick={handlePrevProject}
            title="Previous project timeline"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="scrubber-axis-wrapper relative min-h-[145px] flex flex-col justify-end pt-12 pb-2">
            {/* Horizontal Timeline Track */}
            <div className="scrubber-line" />

            {/* Framer Motion Gliding Floating Tooltip Card */}
            {activeMilestone && (
              <motion.div
                layout
                animate={{
                  left: `${currentPosPercent}%`,
                  x: '-50%'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 28
                }}
                className="absolute top-1 z-20"
                style={{ pointerEvents: 'auto' }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.03 }}
                  className="w-[185px] bg-[#FEF3C7] dark:bg-[#2D2312] border border-[#FDE68A] dark:border-[#78350F] rounded-xl p-2.5 shadow-md cursor-pointer"
                  onClick={handleTooltipClick}
                >
                  <div className="text-xs font-semibold text-[#92400E] dark:text-[#FDE68A] truncate mb-0.5">
                    {activeMilestone.name}
                  </div>
                  <div className="text-[11px] text-[#B45309] dark:text-[#FCD34D] mb-1.5 leading-tight font-normal">
                    {activeMilestone.status === 'Paid' || activeMilestone.status === 'Approved'
                      ? '100% completed · Signed off'
                      : activeMilestone.status === 'Submitted'
                        ? 'Under Review · Action Required'
                        : `Due: ${activeMilestone.dueDate}`}
                  </div>
                  <div className="w-full h-1 rounded-full bg-amber-900/15 overflow-hidden mb-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          activeMilestone.status === 'Paid' || activeMilestone.status === 'Approved'
                            ? '100%'
                            : activeMilestone.status === 'Submitted'
                              ? '85%'
                              : '25%'
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: pinColor }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-[#EE6B50] fill-[#EE6B50] text-white" />
                      <ChevronsUp size={12} className="text-red-500" strokeWidth={3} />
                      <span className="text-[11px] font-semibold text-[#92400E] dark:text-[#FDE68A]">
                        ₹{activeMilestone.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <ChevronRight size={13} className="text-amber-600" />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Pinned Milestone Nodes based on project data */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full"
              >
                {projectMilestones.map((ms, idx) => {
                  const posPercent = total === 1 ? 50 : Math.round(14 + (idx * 72) / (total - 1));
                  const isSelected = selectedMilestoneIndex === idx;
                  const msPinColor = getMilestonePinColor(ms.status);

                  return (
                    <div
                      key={ms.id}
                      className="scrubber-pin-anchor"
                      style={{ left: `${posPercent}%` }}
                      onClick={() => setSelectedMilestoneIndex(idx)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          scale: isSelected ? 1.15 : 1,
                          boxShadow: isSelected ? '0 0 0 4px rgba(238, 107, 80, 0.35)' : '0 2px 4px rgba(0,0,0,0.15)'
                        }}
                        className="scrubber-pin-circle"
                        style={{ backgroundColor: msPinColor }}
                        title={`${ms.name} (${ms.status})`}
                      >
                        {idx + 1}
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Date Labels along the axis */}
            <div
              className="scrubber-dates-grid"
              style={{ gridTemplateColumns: `repeat(${projectMilestones.length || 4}, 1fr)` }}
            >
              {projectMilestones.map((ms, idx) => (
                <div
                  key={ms.id + idx}
                  className="scrubber-date-col cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedMilestoneIndex(idx)}
                >
                  <div className={`scrubber-date-label ${selectedMilestoneIndex === idx ? 'text-[#EE6B50] dark:text-orange-400 font-bold' : ''}`}>
                    {ms.dueDate || `Milestone ${idx + 1}`}
                  </div>
                  <div className="scrubber-days-row">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, dIdx) => (
                      <span
                        key={dIdx}
                        className={`scrubber-day-letter ${day === 'F' && idx === 1 ? 'active-day' : ''}`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="scrubber-arrow-btn cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            onClick={handleNextProject}
            title="Next project timeline"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Scrubber Search & Quick Filter Controls */}
        <div className="scrubber-controls-row pt-2">
          <div className="scrubber-search-box">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, milestones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="scrubber-search-input"
            />
          </div>

          <div className="relative">
            <button
              className="scrubber-quick-filters-btn cursor-pointer"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <span>
                {activeFilter === 'all' ? 'All Projects' : activeFilter === 'action' ? 'Action Required' : 'In Progress'}
              </span>
              <ChevronDown size={14} />
            </button>
            {showFilterMenu && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="scrubber-filter-dropdown"
              >
                <button
                  className={`filter-dropdown-item ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => { setActiveFilter('all'); setShowFilterMenu(false); }}
                >
                  All Projects ({projects.length})
                </button>
                <button
                  className={`filter-dropdown-item ${activeFilter === 'action' ? 'active' : ''}`}
                  onClick={() => { setActiveFilter('action'); setShowFilterMenu(false); }}
                >
                  Action Required ({actionRequiredProjects.length})
                </button>
                <button
                  className={`filter-dropdown-item ${activeFilter === 'active' ? 'active' : ''}`}
                  onClick={() => { setActiveFilter('active'); setShowFilterMenu(false); }}
                >
                  In Progress ({activeProjects.length})
                </button>
              </motion.div>
            )}
          </div>

          {/* Project Switcher Quick Pills */}
          <div className="hidden md:flex items-center gap-1.5 ml-auto">
            {projects.slice(0, 3).map((p, pIdx) => (
              <button
                key={p.id}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer ${selectedProjectIndex === pIdx
                    ? 'bg-gradient-to-b from-[#FA795C] to-[#D95236] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700'
                  }`}
                onClick={() => {
                  setSelectedProjectIndex(pIdx);
                  setSelectedMilestoneIndex(0);
                }}
              >
                {p.title.split(' ')[0]} {p.title.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Summary Metric Cards ───────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Active Work"
          value={activeProjects.length || 4}
          subtext="Under active supervision"
          icon={<Briefcase size={17} color="#EE6B50" />}
          iconBg="rgba(238, 107, 80, 0.08)"
        />
        <MetricCard
          label="Awaiting Action"
          value={actionRequiredProjects.length || 4}
          subtext={actionRequiredProjects.length > 0 ? "Requires your review" : "All approvals clear"}
          icon={<AlertCircle size={17} color="#EA580C" />}
          iconBg="rgba(234, 88, 12, 0.08)"
        />
        <MetricCard
          label="Completed"
          value={completedProjects.length || 1}
          subtext="Delivered & signed off"
          icon={<CheckCircle2 size={17} color="#16A34A" />}
          iconBg="rgba(22, 163, 74, 0.08)"
        />
        <MetricCard
          label="Total Spent"
          value={`₹${totalSpent.toLocaleString('en-IN')}`}
          subtext="Protected in milestone escrow"
          icon={<CreditCard size={17} color="#64748B" />}
          iconBg="rgba(100, 116, 139, 0.08)"
        />
      </div>

      {/* ── 4. Action Required Section ────────────────────────── */}
      {actionRequiredProjects.length > 0 && (
        <section className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white tracking-tight">
                Action Required
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                {actionRequiredProjects.length} Pending
              </span>
            </div>

            {actionRequiredProjects.length > 2 && (
              <button
                className="text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-[#EE6B50] dark:hover:text-orange-400 flex items-center gap-1 cursor-pointer transition-colors"
                onClick={() => setShowAllActions(!showAllActions)}
              >
                <span>{showAllActions ? 'Show Less' : `View All (${actionRequiredProjects.length})`}</span>
                <span>{showAllActions ? '↑' : '→'}</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {displayedActions.map(project => {
              if (!project.nextAction) return null;

              return (
                <ActionRequiredCard
                  key={project.id}
                  projectId={project.id}
                  projectTitle={project.title}
                  actionTitle={project.nextAction.title}
                  actionDescription={project.nextAction.description}
                  actionType={project.nextAction.type}
                  deadline={project.nextAction.deadline}
                  onActionClick={() => {
                    if (project.nextAction?.type === 'review' || project.nextAction?.type === 'approve') {
                      openModal('approve_milestone', {
                        projectId: project.id,
                        milestoneId: project.nextAction.milestoneId || 'm-3',
                        milestoneName: project.nextAction.title,
                        amount: 20000
                      });
                    } else {
                      navigate(`/work/${project.id}`);
                    }
                  }}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* ── 5. Active Work Projects ───────────────────────────── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white tracking-tight">
              Active Work
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal mt-0.5">
              Milestones managed and tracked by your appointed supervisors.
            </p>
          </div>

          <button
            className="text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-[#EE6B50] dark:hover:text-orange-400 flex items-center gap-1 cursor-pointer transition-colors"
            onClick={() => navigate('/work')}
          >
            <span>View All ({filteredProjects.length})</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};
