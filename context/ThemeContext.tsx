'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
interface ThemeContextType { theme: Theme; toggleTheme: () => void; setTheme: (t: Theme) => void; }
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('polarquest_theme') as Theme | null;
    const resolved: Theme = saved === 'light' ? 'light' : 'dark';
    apply(resolved);
    setThemeState(resolved);
  }, []);

  function apply(t: Theme) {
    const root = document.documentElement;
    if (t === 'dark') { root.classList.add('dark'); root.classList.remove('light'); }
    else              { root.classList.remove('dark'); root.classList.add('light'); }
    localStorage.setItem('polarquest_theme', t);
  }

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    apply(next);
    setThemeState(next);
  };
  const setTheme = (t: Theme) => { apply(t); setThemeState(t); };

  return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}