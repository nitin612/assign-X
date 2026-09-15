/* Modern App Shell Layout Wrapper — Clean Sidebar + Main Content Layout */
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { RequestChangesModal } from '../modals/RequestChangesModal';
import { ApproveMilestoneModal } from '../modals/ApproveMilestoneModal';
import { PayMilestoneModal } from '../modals/PayMilestoneModal';
import { DeliverablePreviewModal } from '../modals/DeliverablePreviewModal';
import { Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setMobileMenuOpen } = useApp();

  return (
    <div className="app-layout-root">
      {/* Left Sidebar */}
      <AppSidebar />

      {/* Main Column (without topbar) */}
      <div className="app-main-wrapper">
        {/* Floating Mobile Hamburger Button (Only on small screens) */}
        <button
          className="lg:hidden fixed top-4 right-4 z-30 p-2.5 rounded-xl bg-white dark:bg-zinc-800 shadow-md border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-white"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <main className="app-main-content">
          <div className="app-content-container">
            {children}
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <RequestChangesModal />
      <ApproveMilestoneModal />
      <PayMilestoneModal />
      <DeliverablePreviewModal />
    </div>
  );
};
