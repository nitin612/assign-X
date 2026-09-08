/* Focused Request Changes Modal */
import React, { useState } from 'react';
import { X, UploadCloud, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RequestChangesModal: React.FC = () => {
  const { activeModal, closeModal, requestChanges } = useApp();
  const [feedback, setFeedback] = useState('');
  const [files, setFiles] = useState<string[]>([]);

  if (activeModal.type !== 'request_changes' || !activeModal.payload) {
    return null;
  }

  const { projectId, milestoneId, milestoneName } = activeModal.payload;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || !projectId || !milestoneId) return;
    requestChanges(projectId, milestoneId, feedback);
    closeModal();
  };

  const handleSimulateUpload = () => {
    const fileName = `Feedback_Markup_${Date.now().toString().slice(-4)}.png`;
    setFiles(prev => [...prev, fileName]);
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Request changes</h3>
            {milestoneName && (
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                On: {milestoneName}
              </p>
            )}
          </div>
          <button className="modal-close-btn" onClick={closeModal}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div
              style={{
                display: 'flex',
                gap: '10px',
                padding: '12px',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                fontSize: '13px',
                color: 'var(--text-secondary)'
              }}
            >
              <AlertCircle size={16} color="var(--brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                Describe what needs to be updated so your supervisor can coordinate the changes with the team.
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Feedback & Required Modifications
              </label>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Be as specific as possible regarding design adjustments, copywriting, or functionality updates..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Attachments & Markups (Optional)
              </label>
              <div
                onClick={handleSimulateUpload}
                style={{
                  border: '1px dashed var(--border-strong)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-canvas)',
                  cursor: 'pointer'
                }}
              >
                <UploadCloud size={24} color="var(--text-muted)" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  Click to attach screenshots or annotated PDFs
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  PNG, JPG, PDF up to 25MB
                </div>
              </div>

              {files.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {files.map((f, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--bg-subtle)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      📎 {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!feedback.trim()}
            >
              Send Change Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
