import React, { createContext, useState, useContext } from 'react';

export type ThemeType = 'dark' | 'light';

export const Colors = {
  dark: {
    background: '#0f172a',
    card: '#1e293b',
    text: '#ffffff',
    textSecondary: '#cbd5e1',
    textTertiary: '#64748b',
    accent: '#38bdf8',
    border: '#334155',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gold: '#fbbf24',
  },
  light: {
    background: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    textSecondary: '#475569',
    textTertiary: '#94a3b8',
    accent: '#0ea5e9',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gold: '#fbbf24',
  },
};

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: typeof Colors.dark;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const colors = Colors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
