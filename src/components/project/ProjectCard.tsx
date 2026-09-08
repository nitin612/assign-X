/* Modern Marketplace Project Card - Fiverr / Upwork Pro Style */
import React from 'react';
import type { Project } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ProgressBar } from '../common/ProgressBar';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              color: '#FFFFFF',
              backdropFilter: 'blur(4px)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            {project.category}
          </span>
          <StatusBadge status={project.status} size="sm" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="project-card-body">
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '17px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              marginBottom: '4px'
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Milestone & Progress */}
        <div style={{ marginBottom: 'var(--space-4)', marginTop: 'auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              marginBottom: '6px'
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>
              Current Milestone: <strong style={{ color: 'var(--text-primary)' }}>{project.currentMilestone}</strong>
            </span>
            <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>
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
            gap: '8px'
          }}
        >
          {/* Supervisor pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={project.supervisor.avatar}
                alt={project.supervisor.name}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '9999px',
                  objectFit: 'cover',
                  border: '1.5px solid #FFFFFF'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: -1,
                  right: -1,
                  width: '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  backgroundColor: '#10B981',
                  border: '1.5px solid #FFFFFF'
                }}
              />
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                <span>{project.supervisor.name}</span>
                <CheckCircle2 size={12} color="#2563EB" />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Supervisor Lead
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                ₹{project.budget.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Due {project.deadline.split(' ')[0]} {project.deadline.split(' ')[1]}
              </div>
            </div>

            <button
              className="btn btn-secondary btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '12px',
                borderColor: 'var(--brand-border)',
                color: 'var(--brand-primary)'
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/work/${project.id}`);
              }}
            >
              <span>Manage</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
