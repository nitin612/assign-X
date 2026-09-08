/* Lightweight Topbar Component */
import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Menu } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';

export const Topbar: React.FC = () => {
  const { currentRoute, navigate } = useNavigation();
  const { notifications, setMobileMenuOpen, searchQuery, setSearchQuery } = useApp();
  const [showSearchInput, setShowSearchInput] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getBreadcrumbTitle = () => {
    switch (currentRoute.path) {
      case '/dashboard':
      case '/':
        return 'Overview';
      case '/work':
        return currentRoute.params.projectId ? 'Project Workspace' : 'My Work';
      case '/create':
        return 'Create New Work';
      case '/messages':
        return 'Messages';
      case '/payments':
        return 'Payments & Invoices';
      case '/notifications':
        return 'Notifications';
      case '/settings':
        return 'Profile & Settings';
      case '/support':
        return 'Support & Help';
      default:
        return 'Client Panel';
    }
  };

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button
          className="topbar-icon-btn mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="topbar-breadcrumbs">
          <span style={{ color: 'var(--text-tertiary)' }}>AssignX</span>
          <span>/</span>
          <span className="current">{getBreadcrumbTitle()}</span>
        </div>
      </div>

      <div className="topbar-actions">
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <div
            className="topbar-search-trigger"
            onClick={() => setShowSearchInput(true)}
          >
            <Search size={15} />
            {showSearchInput ? (
              <input
                type="text"
                autoFocus
                placeholder="Search projects, files, invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (!searchQuery) setShowSearchInput(false);
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '13px',
                  padding: 0
                }}
              />
            ) : (
              <>
                <span>Search work, files...</span>
                <kbd>⌘K</kbd>
              </>
            )}
          </div>
        </div>

        {/* Notifications Icon Button */}
        <button
          className="topbar-icon-btn"
          onClick={() => navigate('/notifications')}
          title="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && <span className="badge-dot" />}
        </button>

        {/* Help Center */}
        <button
          className="topbar-icon-btn"
          onClick={() => navigate('/support')}
          title="Help & Support"
        >
          <HelpCircle size={18} />
        </button>

        {/* Avatar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            paddingLeft: 'var(--space-2)'
          }}
          onClick={() => navigate('/settings')}
        >
          <div
            className="user-avatar"
            style={{ width: '30px', height: '30px' }}
          >
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
              alt="Alex Vance"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
