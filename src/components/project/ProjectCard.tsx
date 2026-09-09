/* Project Card Component — Clean Neo-Brutalist Layout (Non-Image) */
import React from 'react';
import type { Project } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  CheckCircle2,
  Layers,
  Calendar,
  CreditCard,
  AlertCircle,
  FileCheck,
  Globe,
  Smartphone,
  Palette,
  Sparkles,
  BarChart3,
  FileText
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { navigate } = useNavigation();

  const hasActionRequired = project.status === 'Awaiting Action' || Boolean(project.nextAction);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Website Development':
        return <Globe size={12} color="var(--color-blue)" />;
      case 'Mobile App Development':
        return <Smartphone size={12} color="var(--color-coral)" />;
      case 'UI/UX Design':
        return <Palette size={12} color="var(--color-purple)" />;
      case 'Graphic Design':
        return <Sparkles size={12} color="#E11D48" />;
      case 'Digital Marketing':
        return <BarChart3 size={12} color="#10B981" />;
      case 'Content Writing':
        return <FileText size={12} color="#F59E0B" />;
      default:
        return <Layers size={12} color="#666666" />;
    }
  };

  return (
    <div
      className="project-visual-card card-hoverable"
      onClick={() => navigate(`/work/${project.id}`)}
    >
      {/* ── Top Header Row: Category Pill & Status Badge ────── */}
      <div className="project-card-header-row">
        <span className="project-category-pill">
          {getCategoryIcon(project.category)}
          <span>{project.category}</span>
        </span>

        <StatusBadge status={project.status} size="sm" />
      </div>

      {/* ── Title & Progress Pill ──────────────────────────── */}
      <div className="project-title-row">
        <h3 className="project-card-title">
          {project.title}
        </h3>

        <span className="project-progress-pill">
          {project.progress}% Done
        </span>
      </div>

      {/* ── Description ────────────────────────────────────── */}
      <p className="project-card-desc">
        {project.description}
      </p>

      {/* ── Quick Spec Chips: Budget, Deliverables, Milestones ── */}
      <div className="project-chips-row">
        <div className="project-micro-chip">
          <CreditCard size={12} color="var(--text-secondary)" />
          <span>₹{project.budget ? project.budget.toLocaleString('en-IN') : 'Custom'}</span>
        </div>

        {project.deliverables && project.deliverables.length > 0 && (
          <div className="project-micro-chip">
            <FileCheck size={12} color="var(--text-secondary)" />
            <span>{project.deliverables.length} Deliverables</span>
          </div>
        )}

        {project.milestones && project.milestones.length > 0 && (
          <div className="project-micro-chip">
            <Layers size={12} color="var(--text-secondary)" />
            <span>{project.milestones.length} Milestones</span>
          </div>
        )}
      </div>

      {/* ── Action Required Callout Banner (if applicable) ─── */}
      {hasActionRequired && project.nextAction && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--color-coral-light)',
            border: '1.5px solid var(--color-coral)',
            borderRadius: '10px',
            padding: '7px 12px',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}
        >
          <AlertCircle size={14} color="var(--color-coral)" style={{ flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Action: {project.nextAction.title}
          </span>
        </div>
      )}

      {/* ── Metadata 2-Cell Info Box (Phase & Deadline) ─────── */}
      <div className="project-meta-box">
        <div className="project-meta-cell">
          <span className="project-meta-label">
            <Layers size={11} color="var(--brand-primary)" />
            <span>Phase</span>
          </span>
          <span className="project-meta-value" title={project.currentPhase}>
            {project.currentPhase}
          </span>
        </div>

        <div className="project-meta-cell">
          <span className="project-meta-label">
            <Calendar size={11} color="var(--text-muted)" />
            <span>Deadline</span>
          </span>
          <span className="project-meta-value" title={project.deadline}>
            {project.deadline}
          </span>
        </div>
      </div>

      {/* ── Active Milestone / Sprint Progress Module ──────── */}
      <div className="project-sprint-container">
        <div className="project-sprint-header">
          <span className="project-sprint-title">
            Next: <strong>{project.currentMilestone}</strong>
          </span>
          <span style={{ fontWeight: 800, color: 'var(--text-primary)', flexShrink: 0, fontSize: '11.5px' }}>
            {project.progress}%
          </span>
        </div>
        <div className="project-sprint-track">
          <div
            className="project-sprint-fill"
            style={{ width: `${Math.min(Math.max(project.progress, 4), 100)}%` }}
          />
        </div>
      </div>

      {/* ── Footer: Supervisor Capsule & Action CTA ─────────── */}
      <div className="project-card-footer">
        {/* Freelance Match Style Supervisor Capsule */}
        <div
          className="project-supervisor-capsule"
          title={`${project.supervisor.name} - Accountable Supervisor`}
        >
          <div className="project-supervisor-avatar-wrap">
            <img
              src={project.supervisor.avatar}
              alt={project.supervisor.name}
              className="project-supervisor-avatar"
            />
            <div className="project-supervisor-team-badge">
              +2
            </div>
          </div>

          <div className="project-supervisor-info">
            <div className="project-supervisor-name">
              <span>{project.supervisor.name}</span>
              <CheckCircle2 size={11} color="var(--color-blue)" />
            </div>
            <div className="project-supervisor-role">
              <span className="supervisor-online-dot" />
              <span>Supervisor</span>
            </div>
          </div>
        </div>

        {/* Action CTA Button */}
        <button
          className="project-action-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/work/${project.id}`);
          }}
        >
          <span>View Project</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};
