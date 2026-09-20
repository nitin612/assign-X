/* Master Application Root for AssignX Client Panel */
import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
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
import { useApp } from './context/AppContext';

const AppRouter: React.FC = () => {
  const { currentRoute } = useNavigation();
  const { isLoggedIn } = useApp();

  // When opening the site (initial root / or /landing) or if not logged in, render the Landing Page
  if (currentRoute.path === '/landing' || currentRoute.path === '/' || !isLoggedIn) {
    return <LandingPage />;
  }

  const renderCurrentPage = () => {
    switch (currentRoute.path) {
      case '/dashboard':
        return <DashboardPage />;

      case '/work':
        if (currentRoute.params.projectId) {
          return <ProjectDetailPage />;
        }
        return <MyWorkPage />;

      case '/create':
      case '/work/new':
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
    <ThemeProvider>
      <NavigationProvider>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}
