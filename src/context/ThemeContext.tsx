import React, { createContext, useContext, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyThemeToDOM = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('assignx_theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        applyThemeToDOM(saved);
        return saved;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyThemeToDOM('dark');
        return 'dark';
      }
    }
    applyThemeToDOM('light');
    return 'light';
  });

  useLayoutEffect(() => {
    applyThemeToDOM(theme);
    try {
      localStorage.setItem('assignx_theme', theme);
    } catch {
      // Ignore localStorage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      applyThemeToDOM(nextTheme);
      return nextTheme;
    });
  };

  const setTheme = (newTheme: Theme) => {
    applyThemeToDOM(newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

