/* Modern App Shell Layout Wrapper */
import React from 'react';
import { TopNavbar } from './TopNavbar';
import { MobileNavigation } from './MobileNavigation';
import { RequestChangesModal } from '../modals/RequestChangesModal';
import { ApproveMilestoneModal } from '../modals/ApproveMilestoneModal';
import { PayMilestoneModal } from '../modals/PayMilestoneModal';
import { DeliverablePreviewModal } from '../modals/DeliverablePreviewModal';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-shell">
      <div className="app-frame">
        <TopNavbar />
        
        <main className="app-content">
          {children}
        </main>
      </div>

      <MobileNavigation />

      {/* Global Modals */}
      <RequestChangesModal />
      <ApproveMilestoneModal />
      <PayMilestoneModal />
      <DeliverablePreviewModal />
    </div>
  );
};
