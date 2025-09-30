import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext, THEME, type TTheme } from './ThemeContext';

export default function ThemeProvider({ children }: { children: ReactNode }): ReactNode {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  useEffect(() => {
    const root = document.documentElement; 
    root.classList.toggle('dark', theme === THEME.DARK);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
