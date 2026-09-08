/* Mobile Bottom Bar Component */
import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  MessageSquare,
  Settings
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const MobileNavigation: React.FC = () => {
  const { currentRoute, navigate } = useNavigation();

  const items = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Work', path: '/work', icon: Briefcase },
    { label: 'New Work', path: '/create', icon: PlusCircle, highlight: true },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {items.map(item => {
        const Icon = item.icon;
        const active = currentRoute.path.startsWith(item.path);

        return (
          <div
            key={item.path}
            className={`mobile-bottom-item ${active ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            style={{ cursor: 'pointer' }}
          >
            <Icon
              size={item.highlight ? 22 : 18}
              strokeWidth={active || item.highlight ? 2.2 : 1.8}
              color={item.highlight ? '#2563EB' : undefined}
            />
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
};
