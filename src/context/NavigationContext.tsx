/* Client-Side Hash Router for AssignX */
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RouteInfo {
  path: string; // e.g., '/dashboard', '/work', '/work/proj-1', '/create', '/messages', etc.
  params: Record<string, string>;
  query: Record<string, string>;
}

interface NavigationContextType {
  currentRoute: RouteInfo;
  navigate: (route: string) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function parseHash(hash: string): RouteInfo {
  // Remove leading '#' or '#/'
  let clean = hash.replace(/^#\/?/, '');
  if (!clean) {
    clean = 'landing';
  }

  const [pathPart, queryPart] = clean.split('?');
  const query: Record<string, string> = {};
  if (queryPart) {
    new URLSearchParams(queryPart).forEach((val, key) => {
      query[key] = val;
    });
  }

  const segments = pathPart.split('/').filter(Boolean);
  const params: Record<string, string> = {};

  if (segments[0] === 'work' && segments[1]) {
    params.projectId = segments[1];
    if (segments[2]) {
      params.tab = segments[2];
    }
  } else if (segments[0] === 'submitted' && segments[1]) {
    params.requestId = segments[1];
  }

  return {
    path: '/' + (segments[0] || 'landing'),
    params,
    query
  };
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteInfo>(() =>
    parseHash(window.location.hash)
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    const targetHash = route.startsWith('#') ? route : `#/${route.replace(/^\//, '')}`;
    window.location.hash = targetHash;
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <NavigationContext.Provider value={{ currentRoute, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
