/* Reusable Minimal Progress Bar Component */
import React from 'react';

interface ProgressBarProps {
  progress: number;
  height?: number;
  showLabel?: boolean;
  colorVariant?: 'brand' | 'success';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 6,
  showLabel = false,
  colorVariant = 'brand'
}) => {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div className="progress-bar-container">
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{clamped}%</span>
        </div>
      )}
      <div className="progress-bar-track" style={{ height: `${height}px` }}>
        <div
          className={`progress-bar-fill ${colorVariant === 'success' ? 'success' : ''}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
