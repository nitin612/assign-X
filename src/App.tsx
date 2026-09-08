/* Master Application Root for AssignX Client Panel */
import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { MyWorkPage } from './pages/MyWorkPage';
import { CreateWorkFlow } from './pages/create-work/CreateWorkFlow';
import { RequestSubmittedPage } from './pages/RequestSubmittedPage';
import { ProjectDetailPage } from './pages/project-detail/ProjectDetailPage';
import { CentralMessagesPage } from './pages/CentralMessagesPage';
import { CentralPaymentsPage } from './pages/CentralPaymentsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { SupportDisputesPage } from './pages/SupportDisputesPage';

const AppRouter: React.FC = () => {
  const { currentRoute } = useNavigation();

  const renderCurrentPage = () => {
    switch (currentRoute.path) {
      case '/':
      case '/dashboard':
        return <DashboardPage />;

      case '/work':
        if (currentRoute.params.projectId) {
          return <ProjectDetailPage />;
        }
        return <MyWorkPage />;

      case '/create':
        return <CreateWorkFlow />;

      case '/submitted':
        return <RequestSubmittedPage />;

      case '/messages':
        return <CentralMessagesPage />;

      case '/payments':
        return <CentralPaymentsPage />;

      case '/notifications':
        return <NotificationsPage />;

      case '/settings':
        return <ProfileSettingsPage />;

      case '/support':
        return <SupportDisputesPage />;

      default:
        return <DashboardPage />;
    }
  };

  return <AppLayout>{renderCurrentPage()}</AppLayout>;
};

export default function App() {
  return (
    <NavigationProvider>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </NavigationProvider>
  );
}
