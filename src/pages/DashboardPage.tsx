/* Modern Client Marketplace Dashboard — AssignX */
import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import { MetricCard } from '../components/common/MetricCard';
import { ActionRequiredCard } from '../components/project/ActionRequiredCard';
import { ProjectCard } from '../components/project/ProjectCard';
import { EmptyState } from '../components/common/EmptyState';
import {
  Briefcase,
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Clock,
  MessageSquare,
  FileCheck,
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
  const totalSpent = projects.reduce((sum, p) => sum + p.paidAmount, 0);

  const [showAllActions, setShowAllActions] = React.useState(false);
  const displayedActions = showAllActions ? actionRequiredProjects : actionRequiredProjects.slice(0, 2);

  // Recent activity
  const recentActivities = projects
    .flatMap(p => p.activities.map(a => ({ ...a, projectId: p.id, projectTitle: p.title })))
    .slice(0, 5);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'deliverable': return <FileCheck size={14} color="var(--color-blue)" />;
      case 'comment': return <MessageSquare size={14} color="#666666" />;
      case 'payment': return <CreditCard size={14} color="#10B981" />;
      case 'supervisor': return <Briefcase size={14} color="var(--color-coral)" />;
      default: return <Clock size={14} color="#888888" />;
    }
  };

  return (
    <div>
      {/* ── Top Header Section ──────────────────────────────── */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
          Good morning, Alex.
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em', margin: 0 }}>
              Here’s your work at a glance.
            </h1>
            <span className="tilted-label blue">
              Let’s Build
            </span>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/create')}
          >
            <span>Create New Work</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* ── Summary Section (Minimal White Cards) ───────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)'
        }}
      >
        <MetricCard
          label="Active Work"
          value={activeProjects.length || 4}
          subtext="Under active supervision"
          icon={<Briefcase size={17} color="var(--color-blue)" />}
          iconBg="var(--color-blue-light)"
        />
        <MetricCard
          label="Awaiting Action"
          value={actionRequiredProjects.length || 3}
          subtext={actionRequiredProjects.length > 0 ? "Requires your review" : "All approvals clear"}
          icon={<AlertCircle size={17} color="var(--color-coral)" />}
          iconBg="var(--color-coral-light)"
        />
        <MetricCard
          label="Completed"
          value={completedProjects.length || 12}
          subtext="Delivered & signed off"
          icon={<CheckCircle2 size={17} color="#0D7A3E" />}
          iconBg="#E8FDF0"
        />
        <MetricCard
          label="Total Spent"
          value={`₹${totalSpent ? totalSpent.toLocaleString('en-IN') : '48,000'}`}
          subtext="Protected in milestone escrow"
          icon={<CreditCard size={17} color="#4B5563" />}
          iconBg="var(--bg-subtle)"
        />
      </div>

      {/* ── Action Required Section ─────────────────────────── */}
      {actionRequiredProjects.length > 0 && (
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Action Required
              </h2>
              <span className="tilted-label coral" style={{ fontSize: '11px', padding: '2px 8px', transform: 'rotate(2deg)' }}>
                {actionRequiredProjects.length} Pending
              </span>
            </div>

            {actionRequiredProjects.length > 2 && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowAllActions(!showAllActions)}
              >
                <span>{showAllActions ? 'Show Less' : `View All (${actionRequiredProjects.length})`}</span>
                <span>{showAllActions ? '↑' : '→'}</span>
              </button>
            )}
          </div>

          <div>
            {displayedActions.map(project => {
              const act = project.nextAction!;
              return (
                <ActionRequiredCard
                  key={project.id}
                  projectId={project.id}
                  projectTitle={project.title}
                  actionTitle={act.title}
                  actionDescription={act.description}
                  actionType={act.type}
                  deadline={act.deadline}
                  onActionClick={() => {
                    if (act.type === 'approve' && act.milestoneId) {
                      openModal('approve_milestone', {
                        projectId: project.id,
                        milestoneId: act.milestoneId,
                        milestoneName: project.currentMilestone,
                        amount: project.milestones.find(m => m.id === act.milestoneId)?.amount
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

      {/* ── Active Work Section ─────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-4)'
          }}
        >
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Active Work
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Milestones managed and tracked by your appointed supervisors.
            </p>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/work')}
          >
            <span>View All ({projects.length})</span>
            <span>→</span>
          </button>
        </div>

        {activeProjects.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No active work in progress"
            description="Tell us what you need and your dedicated supervisor will take it from there."
            actionText="Create New Work"
            onAction={() => navigate('/create')}
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {activeProjects.slice(0, 3).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* ── Recent Activity Section (Beneath Active Work) ────── */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--border-dark)',
            borderRadius: '22px',
            boxShadow: '4px 4px 0px var(--border-dark)',
            padding: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
                Recent Activity
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Real-time updates from supervisor sprints.
              </p>
            </div>

          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            }}
          >
            {recentActivities.map(act => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  backgroundColor: '#F9F9FC',
                  border: '1.5px solid #ECECF2',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid var(--border-dark)',
                    boxShadow: '1.5px 1.5px 0px var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getActivityIcon(act.type)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {act.title}
                    </span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5EE',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        flexShrink: 0
                      }}
                    >
                      {act.timestamp}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                    {act.description}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '6px',
                      fontSize: '11.5px',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontWeight: 800,
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E2EC',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      transition: 'all 0.15s ease'
                    }}
                    onClick={() => navigate(`/work/${act.projectId}`)}
                  >
                    <span>{act.projectTitle}</span>
                    <ArrowRight size={11} color="var(--brand-primary)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
