import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme는 <ThemeProvider> 내부에서만 사용하세요.');
  return ctx;
}
