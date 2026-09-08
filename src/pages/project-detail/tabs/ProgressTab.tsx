import React, { useState } from 'react';
import type { Project } from '../../../types';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { ProgressBar } from '../../../components/common/ProgressBar';
import { Check, ChevronDown, ChevronRight, Calendar } from 'lucide-react';

interface ProgressTabProps {
  project: Project;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({ project }) => {
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    [project.phases[0]?.id || '']: true,
    [project.phases[1]?.id || '']: true,
    [project.phases[2]?.id || '']: true
  });

  const togglePhase = (id: string) => {
    setExpandedPhases((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Project Phases & Workstream Milestones
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Supervised workflow breakdown. Expand any phase to inspect planned task completions.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {project.phases.map((phase, index) => {
          const isExpanded = !!expandedPhases[phase.id];
          const isCompleted = phase.status === 'Completed';
          const isInProgress = phase.status === 'In Progress';

          return (
            <div
              key={phase.id}
              className="card"
              style={{
                padding: 'var(--space-4) var(--space-5)',
                border: isInProgress ? '1.5px solid var(--brand-primary)' : '1px solid var(--border-default)',
                boxShadow: isInProgress ? '0 0 0 2px var(--brand-glow)' : 'var(--shadow-subtle)'
              }}
            >
              {/* Phase Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
                onClick={() => togglePhase(phase.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  {/* Phase number / status icon */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '9999px',
                      backgroundColor: isCompleted
                        ? '#ECFDF5'
                        : isInProgress
                        ? 'var(--brand-subtle)'
                        : 'var(--bg-subtle)',
                      color: isCompleted
                        ? '#059669'
                        : isInProgress
                        ? 'var(--brand-primary)'
                        : 'var(--text-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '13px'
                    }}
                  >
                    {isCompleted ? <Check size={16} strokeWidth={2.5} /> : index + 1}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {phase.name}
                      </h4>
                      {phase.completedDate && (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Completed on {phase.completedDate}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {phase.tasks.length} task items tracked by supervisor
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <StatusBadge status={phase.status} size="sm" />
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ padding: '4px' }}
                    aria-label="Toggle details"
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
              </div>

              {/* Tasks Sublist */}
              {isExpanded && phase.tasks.length > 0 && (
                <div
                  style={{
                    marginTop: 'var(--space-4)',
                    paddingTop: 'var(--space-3)',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  {phase.tasks.map(task => (
                    <div
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: 'var(--bg-canvas)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '13px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '9999px',
                            backgroundColor:
                              task.status === 'Completed'
                                ? '#10B981'
                                : task.status === 'In Progress'
                                ? '#2563EB'
                                : '#CBD5E1'
                          }}
                        />
                        <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                          {task.name}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} /> {task.expectedDate}
                        </span>

                        <div style={{ width: '80px' }}>
                          <ProgressBar progress={task.progress} height={4} />
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', minWidth: '28px' }}>
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
