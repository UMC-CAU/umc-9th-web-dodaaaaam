import { createContext } from 'react';

export const THEME = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
} as const;

export type TTheme = (typeof THEME)[keyof typeof THEME];

export interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

// 초기값 undefined로 두고 Provider 밖 사용 시 에러 유도
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
