/* Minimal Metric Card Component */
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon,
  iconBg,
  trend
}) => {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        {icon && (
          <div
            className="metric-icon-wrap"
            style={iconBg ? { backgroundColor: iconBg } : undefined}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="metric-value">{value}</div>
      {(subtext || trend) && (
        <div className="metric-subtext">
          {trend && (
            <span
              style={{
                color: trend.isPositive ? '#059669' : '#DC2626',
                fontWeight: 600,
                marginRight: '4px'
              }}
            >
              {trend.value}
            </span>
          )}
          {subtext}
        </div>
      )}
    </div>
  );
};
