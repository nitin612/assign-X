import React, { useState } from 'react';
import type { Project, ProjectFile } from '../../../types';
import { FileText, Download, UploadCloud, Search } from 'lucide-react';
import { EmptyState } from '../../../components/common/EmptyState';

interface FilesTabProps {
  project: Project;
}

export const FilesTab: React.FC<FilesTabProps> = ({ project }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [fileSearch, setFileSearch] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'All Files' },
    { id: 'my_upload', label: 'My Uploads' },
    { id: 'supervisor_upload', label: 'Supervisor Uploads' },
    { id: 'deliverable', label: 'Deliverables' },
    { id: 'document', label: 'Documents' }
  ];

  // Merge project files and deliverables into file list
  const allFiles: ProjectFile[] = [
    ...project.files,
    ...project.deliverables.map(d => ({
      id: d.id,
      name: d.name,
      type: 'deliverable' as const,
      uploadedBy: d.submittedBy,
      uploadedDate: d.submittedDate,
      size: d.fileSize
    }))
  ];

  const filteredFiles = allFiles.filter(f => {
    if (filterType !== 'all' && f.type !== filterType) return false;
    if (fileSearch && !f.name.toLowerCase().includes(fileSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Files, Specifications & Deliverables
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Central repository for source archives, brand assets, and milestone handoffs.
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => alert('Simulating file upload... File added to your project uploads.')}
        >
          <UploadCloud size={14} />
          <span>Upload File</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
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
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {filterTabs.map(t => (
            <button
              key={t.id}
              className={`btn btn-sm ${filterType === t.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={14} color="var(--text-tertiary)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          <input
            type="text"
            className="form-input"
            style={{ padding: '6px 12px 6px 30px', fontSize: '12px' }}
            placeholder="Search files..."
            value={fileSearch}
            onChange={(e) => setFileSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {filteredFiles.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No files match your filter"
          description="Try switching the category filter or upload a new file."
        />
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Category</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Size</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map(file => (
                <tr key={file.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={16} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
                      <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                        {file.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '11px',
                        textTransform: 'capitalize',
                        backgroundColor: 'var(--bg-subtle)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {file.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-secondary)' }}>{file.uploadedBy}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-muted)' }}>{file.uploadedDate}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{file.size}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => alert(`Downloading ${file.name}...`)}
                      title="Download file"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
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
