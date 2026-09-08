/* Modern Top Navbar Component - Inspired by Fiverr Pro & Upwork */
import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';
import {
  PlusCircle,
  Search,
  Bell,
  MessageSquare,
  Briefcase,
  LayoutDashboard,
  CreditCard,
  HelpCircle,
  Settings,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const { currentRoute, navigate } = useNavigation();
  const { projects, notifications, searchQuery, setSearchQuery } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const activeWorkCount = projects.filter(
    p => p.status === 'In Progress' || p.status === 'Awaiting Action' || p.status === 'Under Review'
  ).length;

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    {
      label: 'My Work',
      path: '/work',
      icon: Briefcase,
      badge: activeWorkCount > 0 ? activeWorkCount : undefined
    },
    {
      label: 'Messages',
      path: '/messages',
      icon: MessageSquare,
      badge: 1
    },
    { label: 'Payments', path: '/payments', icon: CreditCard },
    { label: 'Help & Support', path: '/support', icon: HelpCircle }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileDrawerOpen(false);
    setUserDropdownOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/dashboard' && (currentRoute.path === '/' || currentRoute.path === '/dashboard')) {
      return true;
    }
    return currentRoute.path.startsWith(path);
  };

  return (
    <>
      <header className="top-navbar">
        <div className="top-navbar-container">
          {/* Brand Logo */}
          <div className="brand-section" onClick={() => handleNavigate('/dashboard')}>
            <div className="brand-geometric-icon" />
            <span className="brand-title">AssignX</span>
          </div>

          {/* Central Nav Links (Dribbble Upnow capsule dock) */}
          <nav className="nav-capsule-dock">
            {navLinks.map(link => {
              const active = isActive(link.path);

              return (
                <div
                  key={link.path}
                  className={`nav-capsule-item ${active ? 'active' : ''}`}
                  onClick={() => handleNavigate(link.path)}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className={`nav-badge-pill ${link.path === '/messages' ? 'danger' : ''}`}>
                      {link.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Search */}
            <div className="navbar-search">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search projects, milestones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Post a Request CTA Button */}
            <button
              className="btn-post-request"
              onClick={() => handleNavigate('/create')}
            >
              <PlusCircle size={15} />
              <span>Post a Request</span>
            </button>

            {/* Notifications Bell */}
            <button
              className="nav-icon-btn"
              onClick={() => handleNavigate('/notifications')}
              title="Notifications"
            >
              <Bell size={18} />
              {unreadNotifications > 0 && <span className="badge-dot" />}
            </button>

            {/* User Greeting (from Dribbble Reference) */}
            <div style={{ position: 'relative' }}>
              <div
                className="nav-user-greeting"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Jane Cooper"
                  className="nav-user-avatar"
                />
                <div className="nav-user-texts">
                  <span className="nav-user-hello">Hello!</span>
                  <span className="nav-user-name">Jane Cooper</span>
                </div>
                <ChevronDown size={14} color="var(--text-tertiary)" />
              </div>

              {/* Profile Dropdown */}
              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '46px',
                    right: 0,
                    width: '220px',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-default)',
                    boxShadow: 'var(--shadow-modal)',
                    padding: '8px',
                    zIndex: 60
                  }}
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Alex Vance</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Apex Hospitality Group</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '4px 0' }}>
                    <button
                      className="sidebar-nav-item"
                      onClick={() => handleNavigate('/settings')}
                      style={{ padding: '8px 12px' }}
                    >
                      <Settings size={15} />
                      <span>Account & Settings</span>
                    </button>
                    <button
                      className="sidebar-nav-item"
                      onClick={() => handleNavigate('/payments')}
                      style={{ padding: '8px 12px' }}
                    >
                      <CreditCard size={15} />
                      <span>Billing & Escrow</span>
                    </button>
                    <button
                      className="sidebar-nav-item"
                      onClick={() => handleNavigate('/support')}
                      style={{ padding: '8px 12px' }}
                    >
                      <HelpCircle size={15} />
                      <span>Help & Support</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              className="nav-icon-btn mobile-menu-btn"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileDrawerOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="brand-section" onClick={() => handleNavigate('/dashboard')}>
                <div className="brand-badge-mark">A</div>
                <span className="brand-title">AssignX</span>
              </div>
              <button className="nav-icon-btn" onClick={() => setMobileDrawerOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <button
              className="btn-post-request"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => handleNavigate('/create')}
            >
              <PlusCircle size={15} />
              <span>Post a Work Request</span>
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navLinks.map(link => {
                const Icon = link.icon;
                const active = isActive(link.path);

                return (
                  <div
                    key={link.path}
                    className={`sidebar-nav-item ${active ? 'active' : ''}`}
                    onClick={() => handleNavigate(link.path)}
                  >
                    <div className="sidebar-nav-item-content">
                      <Icon size={18} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="nav-badge-pill">{link.badge}</span>
                    )}
                  </div>
                );
              })}
              <div
                className="sidebar-nav-item"
                onClick={() => handleNavigate('/settings')}
              >
                <div className="sidebar-nav-item-content">
                  <Settings size={18} />
                  <span>Profile & Settings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
