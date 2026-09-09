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
  ArrowLeft,
  MessageSquare,
  Calendar,
  CreditCard,
  ShieldCheck,
  Sparkles
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

  // Concise, professional header contextual buttons
  const getContextualAction = () => {
    if (project.nextAction) {
      const act = project.nextAction;
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-primary btn-sm"
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
            <span>Review Submission</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleTabChange('messages')}
          >
            <MessageSquare size={14} />
            <span>Message</span>
          </button>
        </div>
      );
    }

    const unapprovedMilestone = project.milestones.find(m => m.status === 'Submitted');
    if (unapprovedMilestone) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-primary btn-sm"
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
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleTabChange('messages')}
          >
            <MessageSquare size={14} />
            <span>Message</span>
          </button>
        </div>
      );
    }

    return (
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => handleTabChange('messages')}
      >
        <MessageSquare size={14} />
        <span>Message Supervisor</span>
      </button>
    );
  };

  return (
    <div>
      {/* Back to Projects link */}
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/work')}
          style={{ color: 'var(--text-secondary)', paddingLeft: 0, gap: '6px' }}
        >
          <ArrowLeft size={14} />
          <span>All Work</span>
        </button>
      </div>

      {/* Project Master Header */}
      <div className="workspace-header-card">
        <div className="workspace-header-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-card)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                {project.category}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
                #{project.id}
              </span>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 800,
                  padding: '2px 10px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-lime)',
                  color: '#111111',
                  border: '1.5px solid #111111',
                  boxShadow: '1.5px 1.5px 0px #111111',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#166534' }} />
                {project.status}
              </span>
            </div>

            <h1 className="workspace-header-title">
              {project.title}
            </h1>
          </div>

          <div>
            {getContextualAction()}
          </div>
        </div>

        {/* Progress & Quick Stats Bar */}
        <div className="workspace-stats-grid">
          {/* Pod 1: Overall Progress */}
          <div className="workspace-stat-pod">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="workspace-stat-label">
                <Sparkles size={12} color="var(--color-coral)" /> Sprint Progress
              </span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {project.progress}%
              </span>
            </div>
            <div style={{ marginTop: '5px' }}>
              <ProgressBar progress={project.progress} height={6} />
            </div>
          </div>

          {/* Pod 2: Target Deadline */}
          <div className="workspace-stat-pod">
            <span className="workspace-stat-label">
              <Calendar size={12} /> Target Deadline
            </span>
            <div className="workspace-stat-value">
              {project.deadline}
            </div>
          </div>

          {/* Pod 3: Escrow Budget */}
          <div className="workspace-stat-pod">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="workspace-stat-label">
                <CreditCard size={12} /> Escrow Budget
              </span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#166534', backgroundColor: '#DCFCE7', padding: '1px 6px', borderRadius: '4px' }}>
                Protected
              </span>
            </div>
            <div className="workspace-stat-value" style={{ fontFamily: 'var(--font-heading)' }}>
              ₹{project.budget.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Pod 4: Dedicated Supervisor */}
          <div className="workspace-stat-pod">
            <span className="workspace-stat-label">
              <ShieldCheck size={12} color="#2563EB" /> Dedicated Lead
            </span>
            <div className="workspace-stat-value" style={{ gap: '8px' }}>
              <img
                src={project.supervisor.avatar}
                alt={project.supervisor.name}
                style={{ width: '22px', height: '22px', borderRadius: '9999px', objectFit: 'cover', border: '1px solid #111111' }}
              />
              <span style={{ fontSize: '13px', fontWeight: 700 }}>
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
