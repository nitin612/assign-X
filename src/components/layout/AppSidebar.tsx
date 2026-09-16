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
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 flex flex-col p-2.5 bg-[#FAF8F5] dark:bg-[#000000] transition-all duration-200 select-none ${
          sidebarCollapsed ? 'w-[72px] items-center' : 'w-[236px]'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Header Card */}
        <div className={`w-full flex mb-2.5 bg-[#0052CC] rounded-2xl text-white shadow-sm transition-all ${
          sidebarCollapsed ? 'flex-col items-center py-2.5 px-1 gap-2' : 'items-center justify-between px-3.5 py-2.5'
        }`}>
          {/* AssignX Wordmark */}
          <div
            className="cursor-pointer flex items-center justify-center hover:opacity-90 transition-opacity"
            onClick={() => handleNavigate('/dashboard')}
            title="AssignX Dashboard"
          >
            {sidebarCollapsed ? (
              <span className="font-extrabold text-sm tracking-tight text-white select-none text-center">
                AX
              </span>
            ) : (
              <span className="font-extrabold text-[17px] tracking-tight text-white select-none">
                AssignX
              </span>
            )}
          </div>

          {/* Plus and 3x3 Grid Buttons */}
          <div className={`flex items-center justify-center ${sidebarCollapsed ? 'flex-col gap-1.5' : 'gap-2'}`}>
            <button
              className="text-white/90 hover:text-white hover:bg-white/15 w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer relative group"
              onClick={() => handleNavigate('/create')}
              title={sidebarCollapsed ? undefined : "Create Work"}
              aria-label="Create Work"
            >
              <Plus size={18} strokeWidth={2.4} />
              {sidebarCollapsed && (
                <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-950 dark:bg-zinc-800 text-white text-[11.5px] font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-150 z-50 flex items-center border border-slate-700/60 dark:border-zinc-700">
                  <span>Create Work</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-950 dark:border-r-zinc-800" />
                </div>
              )}
            </button>
            <button
              className="text-white/90 hover:text-white hover:bg-white/15 w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer relative group"
              onClick={toggleSidebar}
              title={sidebarCollapsed ? undefined : "Toggle Sidebar (Minimize)"}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="4" cy="4" r="2.5" />
                <circle cx="12" cy="4" r="2.5" />
                <circle cx="20" cy="2.5" />
                <circle cx="4" cy="12" r="2.5" />
                <circle cx="12" cy="12" r="2.5" />
                <circle cx="20" cy="12" r="2.5" />
                <circle cx="4" cy="20" r="2.5" />
                <circle cx="12" cy="20" r="2.5" />
                <circle cx="20" cy="20" r="2.5" />
              </svg>
              {sidebarCollapsed && (
                <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-950 dark:bg-zinc-800 text-white text-[11.5px] font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-150 z-50 flex items-center border border-slate-700/60 dark:border-zinc-700">
                  <span>Expand Sidebar</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-950 dark:border-r-zinc-800" />
                </div>
              )}
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
        <div className={`w-full flex-1 flex flex-col justify-between bg-[#0052CC] rounded-3xl text-white shadow-sm transition-all ${
          sidebarCollapsed ? 'p-1.5 items-center overflow-visible' : 'p-2.5 overflow-hidden'
        }`}>
          <div className={`flex flex-col flex-1 w-full ${sidebarCollapsed ? 'items-center overflow-visible' : 'overflow-hidden'}`}>
            {/* Navigation List — Previous tabs styled in the reference design */}
            <nav className={`flex flex-col gap-1 flex-1 w-full ${sidebarCollapsed ? 'items-center overflow-visible' : 'pr-0.5 overflow-y-auto'}`}>
              {mainNavItems.map(item => {
                const active = isActive(item.path);

                return (
                  <div
                    key={item.label}
                    className={`group relative flex items-center cursor-pointer transition-all duration-150 ${
                      sidebarCollapsed
                        ? 'w-10 h-10 justify-center rounded-2xl mx-auto'
                        : 'justify-between px-3 py-2 rounded-2xl text-[13.5px]'
                    } ${
                      active
                        ? 'bg-[#1868F6] text-white font-semibold shadow-sm'
                        : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
                    }`}
                    onClick={() => handleNavigate(item.path)}
                    title={!sidebarCollapsed ? item.label : undefined}
                  >
                    <span className="shrink-0 flex items-center justify-center text-white">
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && (
                      <>
                        <span className="truncate flex-1 ml-2.5 text-left">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="text-[10.5px] font-bold px-1.5 py-0.2 rounded-full bg-white/25 text-white ml-2">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Floating Section Tooltip on Icon Hover when Minimized */}
                    {sidebarCollapsed && (
                      <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-950 dark:bg-zinc-800 text-white text-[12px] font-semibold rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1.5 transition-all duration-150 z-50 flex items-center gap-2 border border-slate-700/60 dark:border-zinc-700">
                        <span>{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-500 text-white">
                            {item.badge}
                          </span>
                        )}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-950 dark:border-r-zinc-800" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Divider */}
              <div className={`my-1.5 h-px bg-white/15 ${sidebarCollapsed ? 'w-6 mx-auto' : 'w-full'}`} />

              {/* System Nav Items */}
              {systemNavItems.map(item => {
                const active = isActive(item.path);

                return (
                  <div
                    key={item.label}
                    className={`group relative flex items-center cursor-pointer transition-all duration-150 ${
                      sidebarCollapsed
                        ? 'w-10 h-10 justify-center rounded-2xl mx-auto'
                        : 'gap-2.5 px-3 py-2 rounded-2xl text-[13px]'
                    } ${
                      active
                        ? 'bg-[#1868F6] text-white font-semibold shadow-sm'
                        : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'
                    }`}
                    onClick={() => handleNavigate(item.path)}
                    title={!sidebarCollapsed ? item.label : undefined}
                  >
                    <span className="shrink-0 flex items-center justify-center text-white/90">
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && <span className="truncate flex-1 ml-2.5 text-left">{item.label}</span>}

                    {/* Floating Section Tooltip on Icon Hover when Minimized */}
                    {sidebarCollapsed && (
                      <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-950 dark:bg-zinc-800 text-white text-[12px] font-semibold rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1.5 transition-all duration-150 z-50 flex items-center gap-2 border border-slate-700/60 dark:border-zinc-700">
                        <span>{item.label}</span>
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-950 dark:border-r-zinc-800" />
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Profile Pill */}
          <div className="pt-2 shrink-0 flex justify-center w-full">
            <div
              className={`group relative flex items-center bg-white dark:bg-[#121216] border border-slate-200/80 dark:border-zinc-800 text-slate-900 dark:text-white rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all ${
                sidebarCollapsed ? 'w-10 h-10 justify-center p-0 mx-auto' : 'w-full gap-2.5 p-2'
              }`}
              onClick={() => handleNavigate('/settings')}
              title={!sidebarCollapsed ? "Robert Sofia (robert34@gmail.com)" : undefined}
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-[#F7E7B5] flex items-center justify-center shrink-0 border border-yellow-200 dark:border-yellow-700/50">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                  alt="Robert Sofia"
                  className="w-full h-full object-cover"
                />
              </div>
              {!sidebarCollapsed && (
                <>
                  <div className="flex flex-col min-w-0 flex-1 leading-tight">
                    <span className="text-[12px] font-bold text-slate-900 dark:text-white truncate">Robert Sofia</span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">robert34@gmail.com</span>
                  </div>
                  <ChevronRight size={15} className="text-[#0052CC] shrink-0 stroke-[2.5]" />
                </>
              )}

              {/* Floating Section Tooltip on Profile Hover when Minimized */}
              {sidebarCollapsed && (
                <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-950 dark:bg-zinc-800 text-white text-[12px] font-semibold rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1.5 transition-all duration-150 z-50 flex items-center gap-1.5 border border-slate-700/60 dark:border-zinc-700">
                  <span>Robert Sofia</span>
                  <span className="text-[10.5px] text-zinc-400 font-normal">(Profile & Settings)</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-950 dark:border-r-zinc-800" />
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
