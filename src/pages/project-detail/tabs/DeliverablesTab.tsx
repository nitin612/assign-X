import type { Project } from '../../../types';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { useApp } from '../../../context/AppContext';
import {
  FileText,
  Download,
  Eye,
  Check,
  AlertCircle,
  Layers
} from 'lucide-react';
import { EmptyState } from '../../../components/common/EmptyState';

interface DeliverablesTabProps {
  project: Project;
}

export const DeliverablesTab: React.FC<DeliverablesTabProps> = ({ project }) => {
  const { openModal } = useApp();

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Project Deliverables & Assets
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Review prototypes, source code staging links, visual packages, and documents submitted by your supervisor.
        </p>
      </div>

      {project.deliverables.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No deliverables submitted yet"
          description="Your supervisor will upload deliverables once the upcoming milestones are completed."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
          {project.deliverables.map(del => {
            const isPendingReview = del.status === 'Pending Review';

            return (
              <div
                key={del.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: isPendingReview ? '1.5px solid #FCD34D' : '1px solid var(--border-default)'
                }}
              >
                {/* Thumbnail Header */}
                <div
                  style={{
                    height: '160px',
                    backgroundColor: 'var(--bg-subtle)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() =>
                    openModal('deliverable_preview', {
                      deliverable: del,
                      projectId: project.id
                    })
                  }
                >
                  {del.thumbnailUrl ? (
                    <img
                      src={del.thumbnailUrl}
                      alt={del.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      <FileText size={36} color="var(--text-tertiary)" style={{ margin: '0 auto 6px' }} />
                      <div style={{ fontSize: '12px', fontWeight: 500 }}>{del.fileType}</div>
                    </div>
                  )}

                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <StatusBadge status={del.status} size="sm" />
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {del.version} • {del.fileSize}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                      lineHeight: 1.3
                    }}
                  >
                    {del.name}
                  </h4>

                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: 'auto' }}>
                    <span>{del.milestoneName}</span>
                    <div style={{ marginTop: '2px' }}>
                      By {del.submittedBy} on {del.submittedDate}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'var(--space-3)',
                      paddingTop: 'var(--space-3)',
                      borderTop: '1px solid var(--border-subtle)'
                    }}
                  >
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() =>
                        openModal('deliverable_preview', {
                          deliverable: del,
                          projectId: project.id
                        })
                      }
                    >
                      <Eye size={13} />
                      <span>Preview</span>
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      {isPendingReview && (
                        <>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '4px 8px' }}
                            onClick={() =>
                              openModal('request_changes', {
                                projectId: project.id,
                                milestoneId: del.milestoneId,
                                milestoneName: del.milestoneName
                              })
                            }
                            title="Request Changes"
                          >
                            <AlertCircle size={13} />
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            style={{ padding: '4px 10px' }}
                            onClick={() =>
                              openModal('approve_milestone', {
                                projectId: project.id,
                                milestoneId: del.milestoneId,
                                milestoneName: del.milestoneName
                              })
                            }
                          >
                            <Check size={13} />
                            <span>Approve</span>
                          </button>
                        </>
                      )}

                      {!isPendingReview && (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => alert(`Downloading ${del.name}...`)}
                        >
                          <Download size={13} />
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
