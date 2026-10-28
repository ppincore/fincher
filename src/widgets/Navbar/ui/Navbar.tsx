import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'clsx';
import { HStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { useLocation, useParams } from 'react-router-dom';
import { getRouteHeader } from '@app/providers/router/config/routerConfig';
import { LangSwitcher } from '@features/LangSwitcher';
import { ThemeSwitcher } from '@features/ThemeSwitcher';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const params = useParams();

  const pageTitle = useMemo(() => {
    const route = getRouteHeader(location.pathname, params);
    const headerLabel = route?.headerLabel ?? route?.link;
    return headerLabel;
  }, [location.pathname, params]);

  return (
    <header className={classNames(cls.navbar, [className])}>
      <HStack max align="center" justify="between">
        <HStack gap="12">
          {pageTitle && (
            <>
              {pageTitle.Icon}
              <Typography color="primary" size="heading3">
                {t(pageTitle.text)}
              </Typography>
            </>
          )}
        </HStack>
        <HStack align="center" gap="8">
          <ThemeSwitcher />
          <LangSwitcher />
        </HStack>
      </HStack>
    </header>
  );
});

Navbar.displayName = 'Navbar';
