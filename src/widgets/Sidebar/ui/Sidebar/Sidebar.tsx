import { memo, useMemo } from 'react';
import { VStack } from '@shared/ui/Stack';
import classNames from 'clsx';
import { getRouteLinks } from '@app/providers/router/config/routerConfig';
import { useTranslation } from 'react-i18next';
import { Accordion } from '@shared/ui/Accordion';
import { Logo } from '@shared/ui/Logo';
import { Sections } from '@shared/const/router';
import { LogoutButton } from '@features/Authentication';
import { RouteLink } from '@shared/types/router';
import { CreateTransactionButton } from '@entities/Transaction';
import cls from './Sidebar.module.scss';
import { SidebarLink } from '../SidebarLink/SidebarLink';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(function Sidebar(props: SidebarProps) {
  const { className } = props;
  const { t } = useTranslation();

  const sidebarLinks = useMemo(() => {
    // TODO: refactor code
    const links = getRouteLinks();

    const renderedLinks: React.ReactNode[] = [];

    let currentSection: Sections | null = null;
    let currentGroup: RouteLink[] = [];

    const pushGroup = () => {
      if (currentGroup.length === 0) return;

      const content = (
        <VStack gap="8" key={`group-${renderedLinks.length}`}>
          {currentGroup.map((link) => (
            <SidebarLink key={link.path} link={link} textClass={cls.itemText} />
          ))}
        </VStack>
      );

      if (currentSection) {
        renderedLinks.push(
          <Accordion
            contentClassName={cls.accordionItems}
            key={`acc-${renderedLinks.length}`}
            defaultIsShowed
            text={t(currentSection)}
          >
            {content}
          </Accordion>,
        );
      } else {
        renderedLinks.push(content);
      }

      currentGroup = [];
      currentSection = null;
    };

    links.forEach((link) => {
      if (link.section !== currentSection) {
        pushGroup();
        currentSection = link.section ?? null;
      }
      currentGroup.push(link);
    });

    pushGroup();

    return renderedLinks;
  }, [t]);

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.sidebar, [className])}
    >
      <VStack max gap="6">
        <Logo className={cls.logo} />
        <VStack gap="16" fullFill className={cls.navigationMenu}>
          <CreateTransactionButton />
          <VStack max gap="16" fullFill className={cls.links}>
            {sidebarLinks}
          </VStack>
        </VStack>
        <VStack className={cls.footer} max fullFill align="center" gap="8">
          <LogoutButton />
        </VStack>
      </VStack>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
