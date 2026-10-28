import { Theme, useTheme } from '@app/providers/ThemeProvider';
import { memo } from 'react';
import { Button, ButtonTheme, ButtonSize } from '@shared/ui/Button';
import { IconMoon2, IconSun } from '@shared/assets/icons';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(function ThemeSwitcher(
  props: ThemeSwitcherProps,
) {
  const { className } = props;

  const { toggleTheme, theme } = useTheme();

  const icon = theme === Theme.LIGHT ? <IconSun /> : <IconMoon2 />;

  return (
    <Button
      size={ButtonSize.S}
      theme={ButtonTheme.OUTLINE}
      className={className}
      square
      onClick={toggleTheme}
      addonLeft={icon}
    />
  );
});
