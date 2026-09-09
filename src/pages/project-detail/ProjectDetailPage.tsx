import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import {
  OverviewTab,
  ProgressTab,
  MilestonesTab,
  DeliverablesTab,
  MessagesTab,
  FilesTab,
  PaymentsTab,
  ActivityTab
} from './tabs';
import {
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { currentRoute, navigate } = useNavigation();
  const { projects, openModal } = useApp();

  const projectId = currentRoute.params.projectId || 'proj-1';
  const project = projects.find(p => p.id === projectId) || projects[0];

  const activeTab = currentRoute.params.tab || 'overview';

  const handleTabChange = (tabId: string) => {
    navigate(`/work/${project.id}/${tabId}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'progress', label: 'Progress' },
    { id: 'milestones', label: 'Milestones', count: project.milestones.length },
    { id: 'deliverables', label: 'Deliverables', count: project.deliverables.length },
    { id: 'messages', label: 'Messages' },
    { id: 'files', label: 'Files', count: project.files.length + project.deliverables.length },
    { id: 'payments', label: 'Payments' },
    { id: 'activity', label: 'Activity' }
  ];

  // Primary contextual button
  const getContextualAction = () => {
    if (project.nextAction) {
      const act = project.nextAction;
      return (
        <button
          className="btn btn-primary"
          onClick={() => {
            if (act.type === 'approve' && act.milestoneId) {
              openModal('approve_milestone', {
                projectId: project.id,
                milestoneId: act.milestoneId,
                milestoneName: project.currentMilestone,
                amount: project.milestones.find(m => m.id === act.milestoneId)?.amount
              });
            } else {
              handleTabChange('milestones');
            }
          }}
        >
          <CheckCircle2 size={15} />
          <span>{act.title}</span>
        </button>
      );
    }

    const unapprovedMilestone = project.milestones.find(m => m.status === 'Submitted');
    if (unapprovedMilestone) {
      return (
        <button
          className="btn btn-primary"
          onClick={() =>
            openModal('approve_milestone', {
              projectId: project.id,
              milestoneId: unapprovedMilestone.id,
              milestoneName: unapprovedMilestone.name,
              amount: unapprovedMilestone.amount
            })
          }
        >
          <CheckCircle2 size={15} />
          <span>Approve Milestone</span>
        </button>
      );
    }

    return (
      <button
        className="btn btn-secondary"
        onClick={() => handleTabChange('messages')}
      >
        Message Supervisor
      </button>
    );
  };

  return (
    <div>
      {/* Back to Projects link */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/work')}
          style={{ color: 'var(--text-secondary)', paddingLeft: 0 }}
        >
          <ArrowLeft size={14} />
          <span>All Work</span>
        </button>
      </div>

      {/* Project Master Header */}
      <div
        className="card"
        style={{
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-4)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {project.category}
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                {project.id}
              </span>
              <span className="tilted-label blue" style={{ fontSize: '11px', padding: '2px 8px', transform: 'rotate(-2deg)' }}>
                {project.status}
              </span>
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              {project.title}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            {getContextualAction()}
          </div>
        </div>

        {/* Progress & Quick Stats Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(200px, 1.6fr) repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--space-5)',
            alignItems: 'center',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Overall Progress</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{project.progress}%</span>
            </div>
            <ProgressBar progress={project.progress} height={6} />
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Target Deadline
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
              {project.deadline}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Budget (Escrow)
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
              ₹{project.budget.toLocaleString('en-IN')}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Accountable Supervisor
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <img
                src={project.supervisor.avatar}
                alt={project.supervisor.name}
                style={{ width: '18px', height: '18px', borderRadius: '9999px', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                {project.supervisor.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Tabs Bar */}
      <div className="tabs-nav" style={{ marginBottom: 'var(--space-6)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="tab-pill">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'overview' && (
          <OverviewTab project={project} onSelectTab={handleTabChange} />
        )}
        {activeTab === 'progress' && (
          <ProgressTab project={project} />
        )}
        {activeTab === 'milestones' && (
          <MilestonesTab project={project} onSelectTab={handleTabChange} />
        )}
        {activeTab === 'deliverables' && (
          <DeliverablesTab project={project} />
        )}
        {activeTab === 'messages' && (
          <MessagesTab project={project} />
        )}
        {activeTab === 'files' && (
          <FilesTab project={project} />
        )}
        {activeTab === 'payments' && (
          <PaymentsTab project={project} />
        )}
        {activeTab === 'activity' && (
          <ActivityTab project={project} />
        )}
      </div>
    </div>
  );
};
