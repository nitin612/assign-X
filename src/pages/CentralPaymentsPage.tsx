/* Central Payments & Invoices Page */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { CreditCard, Download, CheckCircle2, Clock } from 'lucide-react';

export const CentralPaymentsPage: React.FC = () => {
  const { payments, projects } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string>('all');

  const totalSpent = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const upcomingAmount = 99000;
  const refundedAmount = 0;

  const filteredPayments = payments.filter(p => {
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    if (selectedProject !== 'all' && p.projectId !== selectedProject) return false;
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Payments
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Transparent escrow billing history, receipts, and automated invoices.
        </p>
      </div>

      {/* Top Financial Summary Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)'
        }}
      >
        <MetricCard
          label="Total Spent"
          value={`₹${totalSpent.toLocaleString('en-IN')}`}
          subtext="Released milestone payments"
          icon={<CheckCircle2 size={16} color="#059669" />}
        />
        <MetricCard
          label="Pending Sign-off"
          value={`₹${pendingAmount.toLocaleString('en-IN')}`}
          subtext="Held in escrow awaiting approval"
          icon={<Clock size={16} color="#B45309" />}
        />
        <MetricCard
          label="Upcoming Sprints"
          value={`₹${upcomingAmount.toLocaleString('en-IN')}`}
          subtext="Unbilled future milestones"
          icon={<CreditCard size={16} />}
        />
        <MetricCard
          label="Refunded"
          value={`₹${refundedAmount.toLocaleString('en-IN')}`}
          subtext="0 disputes / adjustments"
          icon={<CreditCard size={16} />}
        />
      </div>

      {/* Filters Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: 'var(--space-4)'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '7px 12px', fontSize: '13px' }}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Payment Statuses</option>
            <option value="Paid">Paid & Released</option>
            <option value="Pending">Pending Review</option>
            <option value="Upcoming">Upcoming</option>
          </select>

          <select
            className="form-select"
            style={{ width: 'auto', padding: '7px 12px', fontSize: '13px' }}
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="all">All Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => alert('Downloading statement for FY 2026-27 (CSV)...')}
        >
          <Download size={14} />
          <span>Export Statement</span>
        </button>
      </div>

      {/* Payment History Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Milestone</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Invoice</th>
              <th style={{ textAlign: 'right' }}>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(p => (
              <tr key={p.id}>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {p.projectTitle}
                  </span>
                </td>
                <td>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {p.milestoneName}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    ₹{p.amount.toLocaleString('en-IN')}
                  </span>
                </td>
                <td>
                  <span style={{ color: 'var(--text-muted)' }}>{p.date}</span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {p.method}
                  </span>
                </td>
                <td>
                  <StatusBadge status={p.status} size="sm" />
                </td>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--brand-primary)' }}>
                    {p.invoiceNumber}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {p.status === 'Paid' ? (
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => alert(`Downloading receipt for ${p.invoiceNumber}...`)}
                    >
                      <Download size={13} />
                      <span>PDF</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Awaiting</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
