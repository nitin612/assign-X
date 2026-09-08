/* Matching Skeleton Loader Component */
import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  borderRadius = 'var(--radius-sm)',
  className = '',
  style
}) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton width="40%" height="20px" />
        <Skeleton width="80px" height="22px" borderRadius="9999px" />
      </div>
      <Skeleton width="70%" height="14px" />
      <div style={{ marginTop: '8px' }}>
        <Skeleton width="100%" height="6px" borderRadius="9999px" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <Skeleton width="30%" height="14px" />
        <Skeleton width="20%" height="14px" />
      </div>
    </div>
  );
};
