/* Support & Project Issue / Dispute Resolution Page */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  UploadCloud
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const SupportDisputesPage: React.FC = () => {
  const { projects, tickets, createTicket } = useApp();

  const [activeTab, setActiveTab] = useState<'help' | 'report' | 'tickets'>('help');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Form State for reporting project issue
  const [issueForm, setIssueForm] = useState({
    projectId: projects[0]?.id || '',
    milestone: 'General Work Coordination',
    issueType: 'Timeline & Milestone Delay',
    subject: '',
    description: ''
  });

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find(p => p.id === issueForm.projectId);
    createTicket({
      subject: issueForm.subject || `${issueForm.issueType} on ${proj?.title || 'Project'}`,
      projectId: issueForm.projectId,
      projectTitle: proj?.title,
      issueType: issueForm.issueType,
      description: issueForm.description
    });
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setActiveTab('tickets');
    }, 2000);
  };

  const faqItems = [
    {
      q: 'How does AssignX guarantee project completion?',
      a: 'Every project is supervised by a dedicated domain lead who manages workers, inspects deliverables, enforces deadlines, and protects your escrow funds until you approve work.'
    },
    {
      q: 'What if I am unhappy with a milestone deliverable?',
      a: 'Click "Request Changes" directly on the milestone or deliverable. Your supervisor will coordinate the adjustments with the team at no extra cost until it meets requirements.'
    },
    {
      q: 'When are funds released to workers?',
      a: 'Workers and supervisors are only paid once you explicitly sign off on a completed milestone.'
    },
    {
      q: 'Can I replace my assigned Supervisor?',
      a: 'Yes. If you feel your supervisor does not align with your technical requirements, you can submit a request below and AssignX will assign a new lead within 24 hours.'
    }
  ];

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Support & Resolution Center
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Direct platform assistance, knowledge base, and dispute arbitration.
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs-nav" style={{ marginBottom: 'var(--space-6)' }}>
        <button
          className={`tab-btn ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => setActiveTab('help')}
        >
          <span>Knowledge & Help</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          <span>Report Project Issue</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'tickets' ? 'active' : ''}`}
          onClick={() => setActiveTab('tickets')}
        >
          <span>My Tickets ({tickets.length})</span>
        </button>
      </div>

      {/* Tab 1: Help & FAQs */}
      {activeTab === 'help' && (
        <div>
          {/* Search Help */}
          <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>
              How can we assist you today?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
              Search across our managed service guidelines, billing questions, and milestone protocols.
            </p>

            <div style={{ position: 'relative', maxWidth: '460px', margin: '0 auto' }}>
              <Search size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                className="form-input"
                style={{ padding: '10px 14px 10px 38px' }}
                placeholder="Type your question..."
              />
            </div>
          </div>

          {/* Quick Action Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div
              className="card card-hoverable"
              onClick={() => setActiveTab('report')}
              style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
            >
              <AlertTriangle size={20} color="#B45309" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>Report an Issue</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Request mediation or report milestone bottlenecks.
                </p>
              </div>
            </div>

            <div
              className="card card-hoverable"
              onClick={() => alert('Support representative connected. Average response under 10 minutes.')}
              style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
            >
              <MessageSquare size={20} color="var(--brand-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>Live Support Chat</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Speak with an AssignX client success manager.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="card" style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              Frequently Asked Questions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    paddingBottom: idx !== faqItems.length - 1 ? 'var(--space-4)' : 0,
                    borderBottom: idx !== faqItems.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                  }}
                >
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {item.q}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Report Project Issue / Dispute */}
      {activeTab === 'report' && (
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          {ticketSubmitted && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: 'var(--status-success-bg)',
                border: '1px solid var(--status-success-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--status-success-text)',
                fontSize: '13px',
                marginBottom: 'var(--space-4)'
              }}
            >
              <CheckCircle2 size={18} />
              <span>Your issue report was submitted. An AssignX senior operations lead will review it shortly.</span>
            </div>
          )}

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Report a Project Issue or Escalate
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              AssignX handles dispute resolution neutrally. We safeguard your escrow and ensure strict accountability.
            </p>
          </div>

          <form onSubmit={handleSubmitIssue}>
            <div className="form-group">
              <label className="form-label">Select Related Project</label>
              <select
                className="form-select"
                value={issueForm.projectId}
                onChange={(e) => setIssueForm({ ...issueForm, projectId: e.target.value })}
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.id}) — Led by {p.supervisor.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Issue Category</label>
                <select
                  className="form-select"
                  value={issueForm.issueType}
                  onChange={(e) => setIssueForm({ ...issueForm, issueType: e.target.value })}
                >
                  <option value="Timeline & Milestone Delay">Timeline & Milestone Delay</option>
                  <option value="Quality of Deliverables">Quality of Deliverables</option>
                  <option value="Supervisor Communication">Supervisor Communication</option>
                  <option value="Scope Disagreement">Scope Disagreement</option>
                  <option value="Billing or Invoicing Issue">Billing or Invoicing Issue</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Milestone in Question</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Frontend Development & Menu Interaction"
                  value={issueForm.milestone}
                  onChange={(e) => setIssueForm({ ...issueForm, milestone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                placeholder="Brief summary of the issue..."
                value={issueForm.subject}
                onChange={(e) => setIssueForm({ ...issueForm, subject: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Description</label>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Provide a clear, neutral summary of what happened, previous discussions with your supervisor, and what resolution you expect..."
                value={issueForm.description}
                onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Attachments & Evidence (Optional)</label>
              <div
                onClick={() => alert('Simulate file attachment')}
                style={{
                  border: '1px dashed var(--border-strong)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-canvas)',
                  cursor: 'pointer'
                }}
              >
                <UploadCloud size={20} color="var(--text-muted)" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '12px', fontWeight: 500 }}>Upload screenshots, emails, or specifications</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
              <button type="submit" className="btn btn-primary">
                Submit Issue for Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: My Tickets */}
      {activeTab === 'tickets' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Issue Type</th>
                <th>Created</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{t.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.subject}</div>
                    {t.projectTitle && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.projectTitle}</div>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t.issueType}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.createdAt}</span>
                  </td>
                  <td>
                    <StatusBadge status={t.status} size="sm" />
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.lastUpdated}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
