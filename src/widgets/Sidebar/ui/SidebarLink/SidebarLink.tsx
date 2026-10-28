import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteLink } from '@shared/types/router';
import { AppLink, AppLinkTheme } from '@shared/ui/AppLink';
import { useLocation } from 'react-router-dom';

interface SidebarItemProps {
  link: RouteLink;
  textClass?: string;
}

export const SidebarLink = memo(function SidebarLink(props: SidebarItemProps) {
  const { link, textClass } = props;
  const { t } = useTranslation();

  const { Icon, text = '', path = '' } = link;
  const { pathname } = useLocation();

  return (
    <AppLink
      theme={AppLinkTheme.ROUTE}
      currentPage={pathname === path}
      to={path}
    >
      {Icon}
      <span className={textClass}>{t(text)}</span>
    </AppLink>
  );
});

SidebarLink.displayName = 'SidebarLink';
