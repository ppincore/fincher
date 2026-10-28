import { memo, ReactNode } from 'react';
import classNames from 'clsx';
import cls from './MainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header: ReactNode;
  content: ReactNode;
  sidebar: ReactNode;
}

export const MainLayout = memo(function MainLayout(props: MainLayoutProps) {
  const { className, content, header, sidebar } = props;

  return (
    <div className={classNames(cls.mainLayout, {}, [className])}>
      <div className={cls.sidebar}>{sidebar}</div>
      <div className={cls.header}>{header}</div>
      <div className={cls.content}>{content}</div>
    </div>
  );
});

MainLayout.displayName = 'MainLayout';
