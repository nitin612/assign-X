/* Reusable Status Badge Component */
import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant, size = 'md' }) => {
  const getSemanticVariant = (statusText: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    if (variant) return variant;
    const lower = statusText.toLowerCase();
    
    if (lower.includes('completed') || lower.includes('approved') || lower.includes('paid') || lower.includes('resolved')) {
      return 'success';
    }
    if (lower.includes('awaiting') || lower.includes('action') || lower.includes('warning') || lower.includes('pending') || lower.includes('submitted')) {
      return 'warning';
    }
    if (lower.includes('changes') || lower.includes('danger') || lower.includes('overdue') || lower.includes('error') || lower.includes('dispute')) {
      return 'danger';
    }
    if (lower.includes('in progress') || lower.includes('review') || lower.includes('active') || lower.includes('open')) {
      return 'info';
    }
    return 'neutral';
  };

  const currentVariant = getSemanticVariant(status);

  return (
    <span
      className={`status-badge ${currentVariant}`}
      style={size === 'sm' ? { fontSize: '11px', padding: '2px 8px' } : undefined}
    >
      <span className="status-badge-dot" />
      <span>{status}</span>
    </span>
  );
};
