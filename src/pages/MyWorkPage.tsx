/* Modern My Work Page — Clean SaaS Project Management & Filters */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { ProjectRow } from '../components/project/ProjectRow';
import { ProjectCard } from '../components/project/ProjectCard';
import { EmptyState } from '../components/common/EmptyState';
import {
  Search,
  Briefcase,
  LayoutGrid,
  List,
  ArrowRight
} from 'lucide-react';

export const MyWorkPage: React.FC = () => {
  const { projects } = useApp();
  const { navigate } = useNavigation();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');

  const tabs = [
    { id: 'all', label: 'All', count: projects.length },
    {
      id: 'active',
      label: 'Active',
      count: projects.filter(p => p.status === 'In Progress' || p.status === 'Under Review').length
    },
    {
      id: 'awaiting',
      label: 'Awaiting Action',
      count: projects.filter(p => p.status === 'Awaiting Action' || p.nextAction !== undefined).length
    },
    {
      id: 'completed',
      label: 'Completed',
      count: projects.filter(p => p.status === 'Completed').length
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      count: projects.filter(p => p.status === 'Cancelled').length
    }
  ];

  // Distinct categories & supervisors
  const categories = Array.from(new Set(projects.map(p => p.category)));
  const supervisors = Array.from(new Set(projects.map(p => p.supervisor.name)));

  // Filter projects
  const filteredProjects = projects.filter(p => {
    // Tab filter
    if (activeTab === 'active' && !(p.status === 'In Progress' || p.status === 'Under Review')) return false;
    if (activeTab === 'awaiting' && !(p.status === 'Awaiting Action' || p.nextAction !== undefined)) return false;
    if (activeTab === 'completed' && p.status !== 'Completed') return false;
    if (activeTab === 'cancelled' && p.status !== 'Cancelled') return false;

    // Category filter
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

    // Supervisor filter
    if (selectedSupervisor !== 'all' && p.supervisor.name !== selectedSupervisor) return false;

    // Search query
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none">
              My Work
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              On Track
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Everything you’ve asked AssignX to get done.
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-[#FA795C] to-[#D95236] hover:brightness-105 active:scale-98 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          onClick={() => navigate('/create')}
        >
          <span>Create New Work</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* ── Tabs Navigation (Modern Sleek Pills) ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                isActive
                  ? 'bg-gradient-to-b from-[#FA795C] to-[#D95236] text-white shadow-[0_3px_12px_-1px_rgba(238,107,80,0.35)]'
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-stone-200/80 dark:border-zinc-800'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isActive
                    ? 'bg-white/30 text-white border border-white/30'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Search & Filters Bar ── */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white dark:bg-[#121216] p-3.5 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3 flex-wrap flex-1 min-w-[280px]">
          {/* Search Box */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 flex-1 max-w-md">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search work, tags, supervisors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-slate-800 dark:text-zinc-200 outline-none w-full placeholder:text-slate-400"
            />
          </div>

          {/* Category Dropdown */}
          <select
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 text-xs font-semibold text-slate-700 dark:text-zinc-300 outline-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Supervisor Dropdown */}
          <select
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 text-xs font-semibold text-slate-700 dark:text-zinc-300 outline-none cursor-pointer"
            value={selectedSupervisor}
            onChange={(e) => setSelectedSupervisor(e.target.value)}
          >
            <option value="all">All Supervisors</option>
            {supervisors.map(sup => (
              <option key={sup} value={sup}>{sup}</option>
            ))}
          </select>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-zinc-800">
          <button
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300'
            }`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300'
            }`}
            onClick={() => setViewMode('table')}
            title="List View"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* ── Project Cards / Rows ── */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No projects found"
          description="Try changing your search terms or filter criteria to see your projects."
          actionText="Clear Filters"
          onAction={() => {
            setActiveTab('all');
            setSelectedCategory('all');
            setSelectedSupervisor('all');
            setSearchQuery('');
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredProjects.map(project => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};
