/* Project Card Component — Freelance Match Modern Editorial Style */
import React from 'react';
import type { Project } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ProgressBar } from '../common/ProgressBar';
import { CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { navigate } = useNavigation();

  const defaultCover =
    project.coverImage ||
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80';

  return (
    <div
      className="project-visual-card card-hoverable"
      onClick={() => navigate(`/work/${project.id}`)}
    >
      {/* Cover Header */}
      <div className="project-cover-container">
        <img
          src={defaultCover}
          alt={project.title}
          className="project-cover-img"
        />
        <div className="project-cover-badges">
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              backgroundColor: '#FFFFFF',
              color: '#111111',
              border: '1.5px solid #111111',
              padding: '3px 12px',
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-offset-xs)'
            }}
          >
            {project.category}
          </span>
          <StatusBadge status={project.status} size="sm" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="project-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: 'var(--space-2)' }}>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '17px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25
            }}
          >
            {project.title}
          </h3>

          <span
            className="tilted-label lime"
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              transform: 'rotate(2deg)',
              flexShrink: 0
            }}
          >
            {project.progress}% Done
          </span>
        </div>

        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 'var(--space-4)'
          }}
        >
          {project.description}
        </p>

        {/* Phase & Milestone Info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Phase: <strong style={{ color: 'var(--text-primary)' }}>{project.currentPhase}</strong>
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            Deadline: <strong style={{ color: 'var(--text-primary)' }}>{project.deadline}</strong>
          </span>
        </div>

        {/* Milestone & Progress (With Robust Truncation To Prevent Collisions) */}
        <div style={{ marginBottom: 'var(--space-4)', marginTop: 'auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              marginBottom: '6px'
            }}
          >
            <span
              style={{
                color: 'var(--text-muted)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: 0,
                flex: 1
              }}
            >
              Next: <strong style={{ color: 'var(--text-primary)' }}>{project.currentMilestone}</strong>
            </span>
            <span style={{ fontWeight: 800, color: 'var(--text-primary)', flexShrink: 0 }}>
              {project.progress}%
            </span>
          </div>
          <ProgressBar progress={project.progress} height={6} />
        </div>

        {/* Supervisor & Footer Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-3)',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          {/* Freelance Match Inspired Supervisor Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '3px 12px 3px 3px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--border-dark)',
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-offset-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={project.supervisor.avatar}
                alt={project.supervisor.name}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '9999px',
                  objectFit: 'cover'
                }}
              />
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-blue)',
                  border: '1.5px solid #FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 800,
                  marginLeft: '-6px',
                  color: '#111111'
                }}
              >
                +2
              </div>
            </div>

            <div style={{ lineHeight: 1.15 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                <span>{project.supervisor.name}</span>
                <CheckCircle2 size={11} color="var(--color-blue)" />
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Supervisor
              </div>
            </div>
          </div>

          {/* Action CTA: View Project → */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/work/${project.id}`);
            }}
          >
            <span>View Project</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
