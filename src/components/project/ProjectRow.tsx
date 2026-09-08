import type { Project } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ProgressBar } from '../common/ProgressBar';
import { ChevronRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ProjectRowProps {
  project: Project;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ project }) => {
  const { navigate } = useNavigation();

  return (
    <tr
      onClick={() => navigate(`/work/${project.id}`)}
      style={{ cursor: 'pointer' }}
    >
      {/* Work Title & Category */}
      <td>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>
            {project.title}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {project.category} • {project.id}
          </span>
        </div>
      </td>

      {/* Supervisor */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={project.supervisor.avatar}
            alt={project.supervisor.name}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '9999px',
              objectFit: 'cover'
            }}
          />
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {project.supervisor.name}
          </span>
        </div>
      </td>

      {/* Progress */}
      <td style={{ minWidth: '130px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <ProgressBar progress={project.progress} height={5} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', minWidth: '30px' }}>
            {project.progress}%
          </span>
        </div>
      </td>

      {/* Deadline */}
      <td>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          {project.deadline}
        </span>
      </td>

      {/* Budget */}
      <td>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '13px' }}>
            ₹{project.budget.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Paid ₹{project.paidAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </td>

      {/* Status */}
      <td>
        <StatusBadge status={project.status} size="sm" />
      </td>

      {/* Last Activity */}
      <td>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {project.lastActivity}
        </span>
      </td>

      {/* Action */}
      <td style={{ textAlign: 'right' }}>
        <button
          className="btn btn-ghost btn-sm"
          style={{ padding: '4px' }}
          aria-label="Open project"
        >
          <ChevronRight size={16} color="var(--text-tertiary)" />
        </button>
      </td>
    </tr>
  );
};
