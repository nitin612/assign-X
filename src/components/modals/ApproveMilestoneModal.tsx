/* Milestone Approval Confirmation Modal */
import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ApproveMilestoneModal: React.FC = () => {
  const { activeModal, closeModal, approveMilestone } = useApp();

  if (activeModal.type !== 'approve_milestone' || !activeModal.payload) {
    return null;
  }

  const { projectId, milestoneId, milestoneName, amount } = activeModal.payload;

  const handleConfirm = () => {
    if (projectId && milestoneId) {
      approveMilestone(projectId, milestoneId);
      closeModal();
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Approve Milestone</h3>
          <button className="modal-close-btn" onClick={closeModal}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ textAlign: 'center', margin: 'var(--space-2) 0 var(--space-4)' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '9999px',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}
            >
              <CheckCircle2 size={26} />
            </div>
            <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Sign off on {milestoneName}
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto' }}>
              By approving, you confirm the deliverables meet your expectations. Your supervisor will be notified and work on the next phase will begin immediately.
            </p>
          </div>

          {amount && (
            <div
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px',
                border: '1px solid var(--border-default)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Milestone Amount:</span>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  ₹{amount.toLocaleString('en-IN')}
                </div>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  backgroundColor: '#DBEAFE',
                  color: '#1E40AF',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontWeight: 500
                }}
              >
                Escrow Protected
              </span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleConfirm}>
            Approve Milestone
          </button>
        </div>
      </div>
    </div>
  );
};
