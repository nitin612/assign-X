import React, { useEffect } from 'react';
import {
  X,
  ChevronRight,
  Plus,
  LogOut,
  Settings,
  HelpCircle
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
    toggleSidebar,
    logout
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

  const isAccountRoute = currentRoute.path === '/settings' || currentRoute.path === '/support';
  const [profileMenuOpen, setProfileMenuOpen] = React.useState<boolean>(() => isAccountRoute);
  const profileRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isAccountRoute) {
      setProfileMenuOpen(true);
    }
  }, [isAccountRoute]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If user is not on settings/support, close on click outside
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        if (!isAccountRoute) {
          setProfileMenuOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAccountRoute]);

  const handleLogout = () => {
    setProfileMenuOpen(false);
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

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
        {/* Top Header Card — Apple Frosted Glass */}
        <div className={`relative overflow-hidden w-full flex mb-2.5 bg-slate-950/75 dark:bg-black/65 backdrop-blur-2xl border border-white/15 dark:border-white/10 rounded-2xl text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.2)] transition-all ${
          sidebarCollapsed ? 'flex-col items-center py-2.5 px-1 gap-2' : 'items-center justify-between px-3.5 py-2.5'
        }`}>
          {/* Apple Specular Top Highlight Glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.09] to-transparent rounded-t-2xl" />

          {/* AssignX Wordmark */}
          <div
            className="cursor-pointer flex items-center justify-center hover:opacity-90 transition-opacity relative z-10"
            onClick={() => handleNavigate('/dashboard')}
          >
            {sidebarCollapsed ? (
              <span className="font-extrabold text-sm tracking-tight text-white select-none text-center drop-shadow-xs">
                AX
              </span>
            ) : (
              <span className="font-extrabold text-[17px] tracking-tight text-white select-none drop-shadow-xs">
                AssignX
              </span>
            )}
          </div>

          {/* Plus and 3x3 Grid Buttons */}
          <div className={`flex items-center justify-center relative z-10 ${sidebarCollapsed ? 'flex-col gap-1.5' : 'gap-2'}`}>
            <button
              className="text-white/80 hover:text-white bg-white/5 hover:bg-white/15 w-8 h-8 flex items-center justify-center rounded-xl border border-white/10 transition-colors duration-150 cursor-pointer relative group shadow-2xs"
              onClick={() => handleNavigate('/create')}
              aria-label="Create Work"
            >
              <Plus size={17} strokeWidth={2.4} />
              {sidebarCollapsed && (
                <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-950/95 backdrop-blur-xl dark:bg-zinc-900/95 text-white text-[11.5px] font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-150 z-50 flex items-center border border-white/15">
                  <span>Create Work</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-950/95" />
                </div>
              )}
            </button>
            <button
              className="text-white/80 hover:text-white bg-white/5 hover:bg-white/15 w-8 h-8 flex items-center justify-center rounded-xl border border-white/10 transition-colors duration-150 cursor-pointer relative group shadow-2xs"
              onClick={toggleSidebar}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
                <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-950/95 backdrop-blur-xl dark:bg-zinc-900/95 text-white text-[11.5px] font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-150 z-50 flex items-center border border-white/15">
                  <span>Expand Sidebar</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-950/95" />
                </div>
              )}
            </button>
            {mobileMenuOpen && (
              <button
                className="text-white/80 hover:text-white p-1 rounded-lg lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Main Frosted Glass Body Card */}
        <div className={`relative w-full flex-1 flex flex-col justify-between bg-slate-950/75 dark:bg-black/65 backdrop-blur-2xl border border-white/15 dark:border-white/10 rounded-3xl text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_36px_rgba(0,0,0,0.22)] transition-all ${
          sidebarCollapsed ? 'p-1.5 items-center overflow-visible' : 'p-2.5 overflow-hidden'
        }`}>
          {/* Apple Specular Top Highlight Glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent rounded-t-3xl" />

          <div className={`relative z-10 flex flex-col flex-1 w-full justify-between ${sidebarCollapsed ? 'items-center overflow-visible' : 'overflow-hidden'}`}>
            {/* Top Navigation List */}
            <nav className={`flex flex-col gap-1 w-full flex-1 ${sidebarCollapsed ? 'items-center overflow-visible' : 'pr-0.5 overflow-y-auto'}`}>
              {mainNavItems.map(item => {
                const active = isActive(item.path);

                return (
                  <div
                    key={item.label}
                    className={`group relative flex items-center cursor-pointer transition-colors duration-150 ${
                      sidebarCollapsed
                        ? 'w-10 h-10 justify-center rounded-2xl mx-auto'
                        : 'justify-between px-3 py-2 rounded-2xl text-[13.5px]'
                    } ${
                      active
                        ? 'bg-gradient-to-r from-[#FA795C] to-[#D95236] text-white font-semibold shadow-[0_4px_18px_rgba(238,107,80,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] border border-white/25'
                        : 'text-white/75 hover:bg-white/12 hover:text-white font-medium'
                    }`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <span className="shrink-0 flex items-center justify-center text-white drop-shadow-2xs">
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && (
                      <>
                        <span className="truncate flex-1 ml-2.5 text-left">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className={`text-[10.5px] font-bold px-1.5 py-0.2 rounded-full ml-2 ${
                            active
                              ? 'bg-white/30 text-white border border-white/30 shadow-2xs'
                              : 'bg-white/15 text-white/90 border border-white/15'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Floating Section Tooltip on Icon Hover when Minimized */}
                    {sidebarCollapsed && (
                      <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-950/95 dark:bg-zinc-900/95 backdrop-blur-xl text-white text-[12px] font-semibold rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1.5 transition-all duration-150 z-50 flex items-center gap-2 border border-white/20">
                        <span>{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#EE6B50] text-white shadow-xs">
                            {item.badge}
                          </span>
                        )}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-950/95" />
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Profile Pill with Interactive Popup Menu */}
          <div ref={profileRef} className="relative z-20 pt-2 shrink-0 flex justify-center w-full">
            {/* Popover Dropdown Menu */}
            {profileMenuOpen && (
              <div
                className={`absolute bottom-full mb-2 z-50 bg-slate-950/98 dark:bg-[#0E0E11]/98 backdrop-blur-2xl border border-white/20 dark:border-white/15 rounded-2xl p-2.5 text-white shadow-2xl shadow-black/70 transition-all animate-in fade-in zoom-in-95 duration-150 ${
                  sidebarCollapsed
                    ? 'left-full ml-3 bottom-0 w-[240px]'
                    : 'left-0 right-0 w-full'
                }`}
              >
                {/* User Info Header */}
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10 mb-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F7E7B5] shrink-0 border border-white/30 shadow-2xs">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                      alt="Robert Sofia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1 leading-tight text-left">
                    <span className="text-[12.5px] font-bold text-white truncate">Robert Sofia</span>
                    <span className="text-[10px] text-white/60 truncate">robert34@gmail.com</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-1.5 h-px bg-white/10" />

                {/* Dropdown Options with Uniform Fixed Sizing */}
                <div className="flex flex-col gap-1">
                  {/* Profile & Settings Option */}
                  <button
                    onClick={() => {
                      setProfileMenuOpen(true);
                      handleNavigate('/settings');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer border ${
                      currentRoute.path === '/settings'
                        ? 'bg-gradient-to-r from-[#FA795C] to-[#D95236] text-white border-white/20 shadow-sm shadow-orange-500/30'
                        : 'border-transparent text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Settings size={15} className={currentRoute.path === '/settings' ? 'text-white shrink-0' : 'text-white/70 shrink-0'} />
                    <span className="truncate">Profile & Settings</span>
                  </button>

                  {/* Help & Support Option */}
                  <button
                    onClick={() => {
                      setProfileMenuOpen(true);
                      handleNavigate('/support');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer border ${
                      currentRoute.path === '/support'
                        ? 'bg-gradient-to-r from-[#FA795C] to-[#D95236] text-white border-white/20 shadow-sm shadow-orange-500/30'
                        : 'border-transparent text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <HelpCircle size={15} className={currentRoute.path === '/support' ? 'text-white shrink-0' : 'text-white/70 shrink-0'} />
                    <span className="truncate">Help & Support</span>
                  </button>

                  {/* Divider */}
                  <div className="my-1 h-px bg-white/10" />

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-rose-400 hover:bg-rose-500/15 hover:text-rose-300 transition-colors text-left cursor-pointer border border-transparent"
                  >
                    <LogOut size={15} className="text-rose-400 shrink-0" />
                    <span className="truncate">Log Out</span>
                  </button>
                </div>
              </div>
            )}

            {/* Profile Card Button */}
            <div
              className={`group relative flex items-center bg-white/[0.08] hover:bg-white/[0.14] border ${
                profileMenuOpen ? 'border-white/40 bg-white/[0.16]' : 'border-white/15 hover:border-white/25'
              } shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.12)] text-white rounded-2xl cursor-pointer transition-colors duration-150 ${
                sidebarCollapsed ? 'w-10 h-10 justify-center p-0 mx-auto' : 'w-full gap-2.5 p-2'
              }`}
              onClick={() => setProfileMenuOpen(prev => !prev)}
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-[#F7E7B5] flex items-center justify-center shrink-0 border border-white/30 shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                  alt="Robert Sofia"
                  className="w-full h-full object-cover"
                />
              </div>
              {!sidebarCollapsed && (
                <>
                  <div className="flex flex-col min-w-0 flex-1 leading-tight text-left">
                    <span className="text-[12px] font-bold text-white truncate drop-shadow-2xs">Robert Sofia</span>
                    <span className="text-[10px] text-white/60 truncate">robert34@gmail.com</span>
                  </div>
                  <ChevronRight
                    size={15}
                    className={`text-[#FA795C] shrink-0 stroke-[2.5] transition-transform duration-200 ${
                      profileMenuOpen ? '-rotate-90' : 'rotate-0'
                    }`}
                  />
                </>
              )}

              {/* Floating Section Tooltip on Profile Hover when Minimized & Menu Closed */}
              {sidebarCollapsed && !profileMenuOpen && (
                <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-950/95 dark:bg-zinc-900/95 backdrop-blur-xl text-white text-[12px] font-semibold rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1.5 transition-all duration-150 z-50 flex items-center gap-1.5 border border-white/20">
                  <span>Robert Sofia</span>
                  <span className="text-[10.5px] text-white/70 font-normal">(Account Menu)</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-950/95" />
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
