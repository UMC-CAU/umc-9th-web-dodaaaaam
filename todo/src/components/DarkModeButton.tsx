import { Sun, MoonStar } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { THEME } from '../context/ThemeContext';

export default function DarkModeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="darkModeBtn"
    >
      {theme === THEME.DARK ? (
        <Sun className="icon" />
      ) : (
        <MoonStar className="icon" />
      )}
    </button>
  );
}
