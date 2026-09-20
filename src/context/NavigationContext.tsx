/* Clean HTML5 Pathname Router for AssignX (No # signs) */
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RouteInfo {
  path: string; // e.g., '/', '/landing', '/dashboard', '/work', '/work/proj-1', '/create', etc.
  params: Record<string, string>;
  query: Record<string, string>;
}

interface NavigationContextType {
  currentRoute: RouteInfo;
  navigate: (route: string) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function parsePath(pathname: string, search: string = window.location.search): RouteInfo {
  // Normalize pathname
  let clean = pathname.trim();
  if (!clean || clean === '') {
    clean = '/';
  }

  const query: Record<string, string> = {};
  if (search) {
    new URLSearchParams(search).forEach((val, key) => {
      query[key] = val;
    });
  }

  const segments = clean.split('/').filter(Boolean);
  const params: Record<string, string> = {};

  if (segments[0] === 'work' && segments[1]) {
    params.projectId = segments[1];
    if (segments[2]) {
      params.tab = segments[2];
    }
  } else if (segments[0] === 'submitted' && segments[1]) {
    params.requestId = segments[1];
  }

  // If root or empty, path is '/'
  const path = segments.length === 0 ? '/' : '/' + segments[0];

  return {
    path,
    params,
    query
  };
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteInfo>(() => {
    // If there was a legacy hash, strip it and normalize
    if (window.location.hash) {
      const cleanFromHash = window.location.hash.replace(/^#\/?/, '');
      if (cleanFromHash && cleanFromHash !== 'landing' && cleanFromHash !== 'dashboard') {
        window.history.replaceState({}, '', '/' + cleanFromHash);
        return parsePath('/' + cleanFromHash);
      } else {
        window.history.replaceState({}, '', '/');
        return parsePath('/');
      }
    }
    return parsePath(window.location.pathname);
  });

  useEffect(() => {
    // Clean up any stray hash immediately
    if (window.location.hash) {
      window.history.replaceState({}, '', window.location.pathname || '/');
    }

    const handlePopState = () => {
      setCurrentRoute(parsePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    const cleanRoute = route.startsWith('/') ? route : `/${route}`;
    window.history.pushState({}, '', cleanRoute);
    setCurrentRoute(parsePath(cleanRoute));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

