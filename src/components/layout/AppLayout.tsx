/* Modern App Shell Layout Wrapper — Left Sidebar + Topbar Layout */
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { Topbar } from './Topbar';
import { RequestChangesModal } from '../modals/RequestChangesModal';
import { ApproveMilestoneModal } from '../modals/ApproveMilestoneModal';
import { PayMilestoneModal } from '../modals/PayMilestoneModal';
import { DeliverablePreviewModal } from '../modals/DeliverablePreviewModal';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-layout-root">
      {/* Left Minimal Sidebar */}
      <AppSidebar />

      {/* Main Column */}
      <div className="app-main-wrapper">
        <Topbar />
        
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
