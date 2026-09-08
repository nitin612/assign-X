/* Modern Client Marketplace Dashboard - Fiverr & Upwork Pro Style */
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
  PlusCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  MessageSquare,
  FileCheck,
  Zap,
  Globe,
  Smartphone,
  Layout,
  Palette
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

  // Recent activity
  const recentActivities = projects
    .flatMap(p => p.activities.map(a => ({ ...a, projectId: p.id, projectTitle: p.title })))
    .slice(0, 5);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'deliverable': return <FileCheck size={14} color="#4F46E5" />;
      case 'comment': return <MessageSquare size={14} color="#64748B" />;
      case 'payment': return <CreditCard size={14} color="#059669" />;
      case 'supervisor': return <Briefcase size={14} color="#7C3AED" />;
      default: return <Clock size={14} color="#94A3B8" />;
    }
  };

  const quickLaunchCategories = [
    { label: 'Website Redesign', icon: Globe },
    { label: 'Mobile App MVP', icon: Smartphone },
    { label: 'UI/UX System', icon: Layout },
    { label: 'Brand Kit', icon: Palette },
    { label: 'Cloud & DevOps', icon: Zap }
  ];

  return (
    <div>
      {/* Marketplace Hero Welcome Banner */}
      <div className="marketplace-hero">
        <div className="hero-content">
          <div className="hero-badge-pill">
            <Sparkles size={14} />
            <span>Managed Work Platform • Dedicated Supervisors</span>
          </div>

          <h1 className="hero-title">
            Welcome back, Alex. What would you like AssignX to get done?
          </h1>

          <p className="hero-subtitle">
            Skip the freelance bidding chaos. Tell us what outcome you need, and your assigned supervisor will architect the milestones, coordinate workers, and ensure quality delivery.
          </p>

          {/* Quick Category Launch Chips */}
          <div className="hero-quick-chips">
            <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500, marginRight: '4px' }}>
              Quick start:
            </span>
            {quickLaunchCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <button
                  key={i}
                  className="hero-chip-btn"
                  onClick={() => navigate('/create')}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Metrics Row */}
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
          value={activeProjects.length}
          subtext="Under active supervision"
          icon={<Briefcase size={16} />}
        />
        <MetricCard
          label="Awaiting Sign-off"
          value={actionRequiredProjects.length}
          subtext={actionRequiredProjects.length > 0 ? "Requires your review" : "All approvals clear"}
          icon={<AlertCircle size={16} color={actionRequiredProjects.length > 0 ? "#B45309" : undefined} />}
        />
        <MetricCard
          label="Completed Work"
          value={completedProjects.length}
          subtext="Delivered & signed off"
          icon={<CheckCircle2 size={16} color="#059669" />}
        />
        <MetricCard
          label="Total Invested"
          value={`₹${totalSpent.toLocaleString('en-IN')}`}
          subtext="Protected in milestone escrow"
          icon={<CreditCard size={16} />}
        />
      </div>

      {/* Action Required Banner */}
      {actionRequiredProjects.length > 0 && (
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Action Required</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {actionRequiredProjects.length} pending
              </span>
            </h2>
          </div>

          <div>
            {actionRequiredProjects.map(project => {
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

      {/* Main Grid: Active Projects Grid + Activity Sidebar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(320px, 1fr)',
          gap: 'var(--space-8)',
          alignItems: 'flex-start'
        }}
      >
        {/* Active Work Column */}
        <section>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)'
            }}
          >
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Active Work In Progress
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Milestones managed and tracked by your appointed supervisors.
              </p>
            </div>

            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate('/work')}
            >
              <span>View All ({projects.length})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {activeProjects.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No active work in progress"
              description="Tell us what you need and your dedicated supervisor will take it from there."
              actionText="Post a Work Request"
              onAction={() => navigate('/create')}
            />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-4)'
              }}
            >
              {activeProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        {/* Right Sidebar: Supervisor Spotlight & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Managed Service Assurance Card */}
          <div
            className="card"
            style={{
              padding: 'var(--space-5)',
              background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
              border: '1px solid #C7D2FE'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={20} color="#4F46E5" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#312E81' }}>
                AssignX Managed Guarantee
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#4338CA', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
              You never coordinate individual freelancers or deal with technical blockers. Your appointed supervisor takes 100% accountability for deadlines and code quality.
            </p>
            <button
              className="btn btn-primary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => navigate('/create')}
            >
              <PlusCircle size={14} />
              <span>Post New Work</span>
            </button>
          </div>

          {/* Recent Activity Timeline */}
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Recent Workstream Activity
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Real-time updates from supervisor sprints.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {recentActivities.map((act, index) => (
                <div
                  key={act.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    position: 'relative'
                  }}
                >
                  {index !== recentActivities.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '28px',
                        bottom: '-16px',
                        width: '1px',
                        backgroundColor: 'var(--border-subtle)'
                      }}
                    />
                  )}

                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      zIndex: 1,
                      border: '1px solid var(--border-default)'
                    }}
                  >
                    {getActivityIcon(act.type)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {act.title}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                        {act.timestamp}
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                      {act.description}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '4px',
                        fontSize: '11px',
                        color: 'var(--brand-primary)',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                      onClick={() => navigate(`/work/${act.projectId}`)}
                    >
                      <span>{act.projectTitle}</span>
                      <ArrowRight size={10} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
