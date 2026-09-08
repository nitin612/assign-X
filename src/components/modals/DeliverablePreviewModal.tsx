/* Deliverable Preview Modal */
import React from 'react';
import { X, Download, Check, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';

export const DeliverablePreviewModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useApp();

  if (activeModal.type !== 'deliverable_preview' || !activeModal.payload?.deliverable) {
    return null;
  }

  const { deliverable, projectId } = activeModal.payload;

  const handleRequestChanges = () => {
    closeModal();
    if (projectId && deliverable.milestoneId) {
      openModal('request_changes', {
        projectId,
        milestoneId: deliverable.milestoneId,
        milestoneName: deliverable.milestoneName
      });
    }
  };

  const handleApprove = () => {
    closeModal();
    if (projectId && deliverable.milestoneId) {
      openModal('approve_milestone', {
        projectId,
        milestoneId: deliverable.milestoneId,
        milestoneName: deliverable.milestoneName
      });
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-dialog" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 className="modal-title" style={{ fontSize: '16px' }}>
              {deliverable.name}
            </h3>
            <StatusBadge status={deliverable.status} size="sm" />
          </div>
          <button className="modal-close-btn" onClick={closeModal}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: 'var(--space-4) var(--space-6)' }}>
          {/* Preview canvas */}
          <div
            style={{
              width: '100%',
              height: '320px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginBottom: 'var(--space-4)',
              border: '1px solid var(--border-default)'
            }}
          >
            {deliverable.thumbnailUrl ? (
              <img
                src={deliverable.thumbnailUrl}
                alt={deliverable.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <FileText size={48} style={{ margin: '0 auto 8px', color: 'var(--text-tertiary)' }} />
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{deliverable.fileType} Document</div>
                <div style={{ fontSize: '12px' }}>{deliverable.fileSize}</div>
              </div>
            )}

            {deliverable.fileType.includes('PREVIEW') && (
              <a
                href="#demo"
                onClick={(e) => e.preventDefault()}
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Launch Interactive Demo</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Deliverable Metadata */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'var(--bg-canvas)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              fontSize: '12px'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Milestone:</span>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{deliverable.milestoneName}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Submitted By:</span>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{deliverable.submittedBy}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Submitted Date:</span>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{deliverable.submittedDate}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>File Size & Ver:</span>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{deliverable.fileSize} • {deliverable.version}</div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => alert(`Downloading ${deliverable.name}...`)}
          >
            <Download size={14} /> Download Asset
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-ghost btn-sm" onClick={handleRequestChanges}>
              <AlertCircle size={14} /> Request Changes
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleApprove}>
              <Check size={14} /> Approve Deliverable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
