import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  enableSystem = true,
  enableTransitions = true
}) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(storageKey) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const resolvedTheme = theme === 'system' && enableSystem 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  useEffect(() => {
    const html = document.documentElement;
    
    if (enableTransitions) {
      html.classList.add('[&*]:!transition-none');
    }

    if (resolvedTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    if (enableTransitions) {
      setTimeout(() => {
        html.classList.remove('[&*]:!transition-none');
      }, 0);
    }

    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // localStorage not available
    }
  }, [theme, resolvedTheme, enableTransitions, storageKey]);

  const toggleTheme = () => {
    setTheme(prev => 
      prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'
    );
  };

  const value = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    themes: ['light', 'dark', 'system']
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
}

export default ThemeContext;
