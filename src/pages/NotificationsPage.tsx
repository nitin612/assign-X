/* Notifications Center */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigation } from '../context/NavigationContext';
import {
  Bell,
  Briefcase,
  MessageSquare,
  CreditCard,
  CheckCircle2,
  CheckCheck
} from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const { navigate } = useNavigation();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'approvals', label: 'Approvals' },
    { id: 'work', label: 'Work Updates' },
    { id: 'messages', label: 'Messages' },
    { id: 'payments', label: 'Payments' },
    { id: 'system', label: 'System' }
  ];

  const filteredNotifications = notifications.filter(n => {
    if (categoryFilter !== 'all' && n.category !== categoryFilter) return false;
    return true;
  });

  const getNotificationIcon = (category: string) => {
    switch (category) {
      case 'approvals': return <CheckCircle2 size={16} color="#B45309" />;
      case 'work': return <Briefcase size={16} color="#2563EB" />;
      case 'messages': return <MessageSquare size={16} color="#475569" />;
      case 'payments': return <CreditCard size={16} color="#059669" />;
      default: return <Bell size={16} color="#64748B" />;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-6)'
        }}
      >
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Notifications
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Live alerts regarding milestone submissions, approvals, and messages.
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={markAllNotificationsAsRead}
        >
          <CheckCheck size={14} />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Categories Filter Tabs */}
      <div className="tabs-nav" style={{ marginBottom: 'var(--space-5)' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`tab-btn ${categoryFilter === cat.id ? 'active' : ''}`}
            onClick={() => setCategoryFilter(cat.id)}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications in this category"
          description="You're completely caught up with your supervisors and milestone actions."
        />
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {filteredNotifications.map((notif, index) => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationAsRead(notif.id);
                if (notif.actionRoute) {
                  navigate(notif.actionRoute);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '14px var(--space-5)',
                borderBottom: index !== filteredNotifications.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                backgroundColor: notif.isRead ? 'var(--bg-surface)' : 'var(--brand-subtle)',
                cursor: 'pointer',
                transition: 'background-color var(--transition-fast)'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9999px',
                  backgroundColor: notif.isRead ? 'var(--bg-subtle)' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                  border: '1px solid var(--border-default)'
                }}
              >
                {getNotificationIcon(notif.category)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: notif.isRead ? 500 : 600, color: 'var(--text-primary)' }}>
                      {notif.title}
                    </span>
                    {!notif.isRead && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: 'var(--brand-primary)' }} />
                    )}
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    {notif.timestamp}
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {notif.message}
                </p>

                {notif.projectTitle && (
                  <div style={{ fontSize: '11px', color: 'var(--brand-primary)', marginTop: '4px', fontWeight: 500 }}>
                    {notif.projectTitle}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
