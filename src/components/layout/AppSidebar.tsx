import React, { useEffect } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  MessageSquare,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  Globe,
  LogOut,
  X
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';

export const AppSidebar: React.FC = () => {
  const { currentRoute, navigate } = useNavigation();
  const {
    projects,
    notifications,
    mobileMenuOpen,
    setMobileMenuOpen,
    logout,
    sidebarCollapsed,
    toggleSidebar
  } = useApp();

  // Keyboard shortcut: Cmd+B / Ctrl+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const activeWorkCount = projects.filter(
    p => p.status === 'In Progress' || p.status === 'Awaiting Action' || p.status === 'Under Review'
  ).length;

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'My Work',
      path: '/work',
      icon: Briefcase,
      badge: activeWorkCount > 0 ? activeWorkCount : undefined
    },
    {
      label: 'Create New Work',
      path: '/create',
      icon: PlusCircle,
      isSpecial: true
    },
    {
      label: 'Messages',
      path: '/messages',
      icon: MessageSquare,
      badge: 1 // active unread thread
    },
    {
      label: 'Payments',
      path: '/payments',
      icon: CreditCard
    },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
      badgeAccent: true
    }
  ];

  const bottomNavItems = [
    {
      label: 'Landing Page',
      path: '/landing',
      icon: Globe
    },
    {
      label: 'Support & Help',
      path: '/support',
      icon: HelpCircle
    },
    {
      label: 'Profile & Settings',
      path: '/settings',
      icon: Settings
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/dashboard' && (currentRoute.path === '/' || currentRoute.path === '/dashboard')) {
      return true;
    }
    return currentRoute.path.startsWith(path);
  };

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`app-sidebar ${mobileMenuOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-wrapper">
          <div
            className="brand-logo-container"
            onClick={() => handleNavigate('/dashboard')}
            style={{ cursor: 'pointer' }}
            title="AssignX Dashboard"
          >
            <div className="brand-mark">A</div>
            {!sidebarCollapsed && (
              <div>
                <div className="brand-text">AssignX</div>
              </div>
            )}
          </div>

          {mobileMenuOpen && (
            <button
              className="topbar-icon-btn"
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex' }}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav-section">
          {!sidebarCollapsed && <div className="sidebar-nav-label">Main Menu</div>}
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div
                key={item.path}
                className={`sidebar-nav-item ${active ? 'active' : ''} ${item.isSpecial ? 'special-cta' : ''}`}
                onClick={() => handleNavigate(item.path)}
                title={item.badge !== undefined ? `${item.label} (${item.badge})` : item.label}
              >
                <div className="sidebar-nav-item-content">
                  <Icon size={17} strokeWidth={active || item.isSpecial ? 2.2 : 1.8} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`sidebar-nav-badge ${item.badgeAccent ? 'accent' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Navigation & User Account */}
        <div className="sidebar-footer">
          {!sidebarCollapsed && (
            <div className="sidebar-nav-label" style={{ padding: '4px 10px' }}>
              System
            </div>
          )}
          {bottomNavItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div
                key={item.path}
                className={`sidebar-nav-item ${active ? 'active' : ''}`}
                onClick={() => handleNavigate(item.path)}
                title={item.label}
              >
                <div className="sidebar-nav-item-content">
                  <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
                  <span>{item.label}</span>
                </div>
              </div>
            );
          })}

          <div
            className="sidebar-user-pill"
            style={{ marginTop: 'var(--space-2)', justifyContent: sidebarCollapsed ? 'center' : 'space-between' }}
            onClick={() => handleNavigate('/settings')}
            title="Alex Vance (Apex Hospitality) — Settings"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div className="user-avatar">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                  alt="Alex Vance"
                />
              </div>
              <div className="user-details" style={{ overflow: 'hidden' }}>
                <span className="user-name" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Alex Vance</span>
                <span className="user-role" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Apex Hospitality</span>
              </div>
            </div>

            <button
              title="Sign Out to Landing Page"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '4px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0
              }}
              onClick={(e) => {
                e.stopPropagation();
                logout();
                navigate('/landing');
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
