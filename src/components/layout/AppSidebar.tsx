import React, { useEffect } from 'react';
import {
  X,
  ChevronRight,
  Plus
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
    sidebarCollapsed,
    toggleSidebar
  } = useApp();

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
  ).length || 4;

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length || 2;

  // The authentic AssignX tabs from previous sidebar
  const mainNavItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="16" x="3" y="4" rx="4" />
          <line x1="9" x2="9" y1="4" y2="20" />
          <line x1="15" x2="15" y1="4" y2="20" />
        </svg>
      )
    },
    {
      label: 'My Work',
      path: '/work',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="5" x="3" y="3" rx="2" />
          <path d="M7 8v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8" />
          <path d="M7 14v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4" />
        </svg>
      ),
      badge: activeWorkCount
    },
    {
      label: 'Create New Work',
      path: '/create',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
          <line x1="15" x2="21" y1="3" y2="3" />
          <line x1="18" x2="18" y1="0" y2="6" />
        </svg>
      )
    },
    {
      label: 'Messages',
      path: '/messages',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      badge: 1
    },
    {
      label: 'Payments',
      path: '/payments',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      )
    },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      ),
      badge: unreadNotificationsCount
    }
  ];

  const systemNavItems = [
    {
      label: 'Landing Page',
      path: '/landing',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" x2="22" y1="12" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      label: 'Support & Help',
      path: '/support',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
      )
    },
    {
      label: 'Profile & Settings',
      path: '/settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
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
    return currentRoute.path === path;
  };

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Outer Sidebar wrapper matching the exact same right-hand canvas background */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 flex flex-col p-3 bg-[#FAF8F5] dark:bg-[#000000] transition-all duration-200 select-none ${
          sidebarCollapsed ? 'w-[84px]' : 'w-[236px]'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Header Card */}
        <div className="flex items-center justify-between px-3 py-2.5 mb-2.5 bg-[#0052CC] rounded-2xl text-white shadow-sm">
          {/* Logo Mark */}
          <div
            className="cursor-pointer flex items-center justify-center hover:opacity-90 transition-opacity"
            onClick={() => handleNavigate('/dashboard')}
            title="Dashboard"
          >
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 3L4 15C3 16 3 17 4 18L16 30L28 18C29 17 29 16 28 15L16 3Z"
                fill="white"
              />
              <path
                d="M16 9L9 16L16 23L23 16L16 9Z"
                fill="#0052CC"
              />
            </svg>
          </div>

          {/* Plus and 3x3 Grid Buttons */}
          <div className="flex items-center gap-2">
            <button
              className="text-white/90 hover:text-white hover:bg-white/15 p-1 rounded-lg transition-all cursor-pointer"
              onClick={() => handleNavigate('/create')}
              title="Create Work"
            >
              <Plus size={20} strokeWidth={2.4} />
            </button>
            <button
              className="text-white/90 hover:text-white hover:bg-white/15 p-1 rounded-lg transition-all cursor-pointer"
              onClick={() => handleNavigate('/landing')}
              title="Landing Page"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="4" cy="4" r="2.5" />
                <circle cx="12" cy="4" r="2.5" />
                <circle cx="20" cy="4" r="2.5" />
                <circle cx="4" cy="12" r="2.5" />
                <circle cx="12" cy="12" r="2.5" />
                <circle cx="20" cy="12" r="2.5" />
                <circle cx="4" cy="20" r="2.5" />
                <circle cx="12" cy="20" r="2.5" />
                <circle cx="20" cy="20" r="2.5" />
              </svg>
            </button>
            {mobileMenuOpen && (
              <button
                className="text-white/90 hover:text-white p-1 rounded-lg lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Main Royal Blue Body Card */}
        <div className="flex-1 flex flex-col justify-between bg-[#0052CC] rounded-3xl p-3 text-white overflow-hidden shadow-sm">
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Navigation List — Previous tabs styled in the reference design */}
            <nav className="flex flex-col gap-1 overflow-y-auto flex-1 pr-0.5">
              {mainNavItems.map(item => {
                const active = isActive(item.path);

                return (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-3 py-2 rounded-2xl text-[13.5px] cursor-pointer transition-all duration-150 ${
                      active
                        ? 'bg-[#1868F6] text-white font-semibold shadow-sm'
                        : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
                    } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                    onClick={() => handleNavigate(item.path)}
                    title={item.label}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="shrink-0 flex items-center justify-center text-white">
                        {item.icon}
                      </span>
                      {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {item.badge !== undefined && !sidebarCollapsed && (
                      <span className="text-[10.5px] font-bold px-1.5 py-0.2 rounded-full bg-white/25 text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Divider */}
              <div className="my-1.5 h-px bg-white/15" />

              {/* System Nav Items */}
              {systemNavItems.map(item => {
                const active = isActive(item.path);

                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl text-[13px] cursor-pointer transition-all duration-150 ${
                      active
                        ? 'bg-[#1868F6] text-white font-semibold shadow-sm'
                        : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'
                    } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                    onClick={() => handleNavigate(item.path)}
                    title={item.label}
                  >
                    <span className="shrink-0 flex items-center justify-center text-white/90">
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Profile Pill */}
          <div className="pt-2.5 shrink-0">
            <div
              className={`flex items-center gap-2.5 p-2 bg-white text-slate-900 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
              onClick={() => handleNavigate('/settings')}
              title="Robert Sofia (robert34@gmail.com)"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F7E7B5] flex items-center justify-center shrink-0 border border-yellow-200">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                  alt="Robert Sofia"
                  className="w-full h-full object-cover"
                />
              </div>
              {!sidebarCollapsed && (
                <>
                  <div className="flex flex-col min-w-0 flex-1 leading-tight">
                    <span className="text-[12px] font-bold text-slate-900 truncate">Robert Sofia</span>
                    <span className="text-[10px] text-slate-500 truncate">robert34@gmail.com</span>
                  </div>
                  <ChevronRight size={15} className="text-[#0052CC] shrink-0 stroke-[2.5]" />
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
