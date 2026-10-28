import { useContext } from 'react';
import { THEME_LOCAL_STORAGE_KEY } from '@shared/const/browserStorage';
import { Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: Theme;

    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.LIGHT;
        break;
    }

    setTheme?.(newTheme);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
