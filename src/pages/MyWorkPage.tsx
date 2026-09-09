/* My Work Page - Central Project Management & Filters */
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
  List
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
    <div>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em', margin: 0 }}>
              My Work
            </h1>
            <span className="tilted-label lime" style={{ fontSize: '11px', padding: '2px 8px', transform: 'rotate(2deg)' }}>
              On Track
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Everything you’ve asked AssignX to get done.
          </p>
        </div>

        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/create')}
        >
          <span>Create New Work</span>
          <span>→</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-nav" style={{ marginBottom: 'var(--space-5)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.label}</span>
            <span className="tab-pill">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-6)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', flex: 1 }}>
          {/* Search */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
            <input
              type="text"
              className="filter-pill-input"
              style={{ paddingLeft: '36px', width: '100%' }}
              placeholder="Search work, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select
            className="filter-pill-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Supervisor Filter */}
          <select
            className="filter-pill-select"
            value={selectedSupervisor}
            onChange={(e) => setSelectedSupervisor(e.target.value)}
          >
            <option value="all">All Supervisors</option>
            {supervisors.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* View Toggle (Grid / Table) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '3px',
            border: '1px solid var(--border-card)'
          }}
        >
          <button
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: viewMode === 'table' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'table' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: viewMode === 'table' ? 'var(--shadow-soft-sm)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <List size={15} />
          </button>
          <button
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'grid' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: viewMode === 'grid' ? 'var(--shadow-soft-sm)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <LayoutGrid size={15} />
          </button>
        </div>
      </div>

      {/* Content Rendering: Empty State, Table, or Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No work requests found"
          description="Try adjusting your search criteria or create a new work request."
          actionText="Create New Work"
          onAction={() => navigate('/create')}
        />
      ) : viewMode === 'table' ? (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Work</th>
                <th>Supervisor</th>
                <th>Progress</th>
                <th>Deadline</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Last Activity</th>
                <th style={{ width: '40px' }} />
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--space-6)'
          }}
        >
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};
