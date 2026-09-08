import type { Project } from '../../../types';
import { MetricCard } from '../../../components/common/MetricCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { useApp } from '../../../context/AppContext';
import { CreditCard, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PaymentsTabProps {
  project: Project;
}

export const PaymentsTab: React.FC<PaymentsTabProps> = ({ project }) => {
  const { openModal, payments } = useApp();

  const projectPayments = payments.filter(p => p.projectId === project.id);
  const pendingAmount = project.milestones
    .filter(m => m.status === 'Submitted' || m.status === 'Approved')
    .reduce((sum, m) => sum + m.amount, 0);
  const remainingEscrow = project.budget - project.paidAmount;

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Project Financials & Milestone Invoices
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Transparent escrow billing. Milestone disbursements require your sign-off.
        </p>
      </div>

      {/* Top Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)'
        }}
      >
        <MetricCard
          label="Project Total"
          value={`₹${project.budget.toLocaleString('en-IN')}`}
          subtext="Allocated budget"
          icon={<CreditCard size={16} />}
        />
        <MetricCard
          label="Paid to Date"
          value={`₹${project.paidAmount.toLocaleString('en-IN')}`}
          subtext="Approved & released"
          icon={<CheckCircle2 size={16} color="#059669" />}
        />
        <MetricCard
          label="Pending Sign-off"
          value={`₹${pendingAmount.toLocaleString('en-IN')}`}
          subtext="Awaiting milestone sign-off"
          icon={<CreditCard size={16} color="#B45309" />}
        />
        <MetricCard
          label="Remaining Balance"
          value={`₹${remainingEscrow.toLocaleString('en-IN')}`}
          subtext="Unbilled project work"
          icon={<CreditCard size={16} />}
        />
      </div>

      {/* Milestone Invoices Table */}
      <div className="table-container" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-default)', backgroundColor: 'var(--bg-canvas)' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Milestone Billing & Payment History
          </h4>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Milestone</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Receipt / Invoice</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {project.milestones.map(m => {
              const matchingPayment = projectPayments.find(p => p.milestoneName === m.name);

              return (
                <tr key={m.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.id}</div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      ₹{m.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-secondary)' }}>{m.dueDate}</span>
                  </td>
                  <td>
                    <StatusBadge status={m.status === 'Paid' ? 'Paid' : m.status === 'Approved' ? 'Pending Payment' : m.status} size="sm" />
                  </td>
                  <td>
                    {matchingPayment ? (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--brand-primary)' }}>
                        {matchingPayment.invoiceNumber}
                      </span>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Pending completion</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {m.status === 'Approved' ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          openModal('pay_milestone', {
                            projectId: project.id,
                            milestoneId: m.id,
                            milestoneName: m.name,
                            amount: m.amount
                          })
                        }
                      >
                        Pay Now
                      </button>
                    ) : m.status === 'Paid' ? (
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => alert(`Downloading GST Invoice for ${m.name}...`)}
                      >
                        <Download size={13} />
                        <span>Receipt</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>In Progress</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Security notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          backgroundColor: '#F8FAFC',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #E2E8F0',
          fontSize: '12px',
          color: 'var(--text-secondary)'
        }}
      >
        <ShieldCheck size={18} color="#2563EB" />
        <span>All transactions are held in bank-grade escrow accounts until milestones are explicitly signed off by you.</span>
      </div>
    </div>
  );
};
