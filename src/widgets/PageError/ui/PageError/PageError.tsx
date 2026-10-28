import { memo } from 'react';
import clsx from 'clsx';
import cls from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
}

export const PageError = memo(function PageError(props: PageErrorProps) {
  const { className } = props;

  // add UI later
  return <div className={clsx(cls.pageError, {}, [className])} />;
});

PageError.displayName = 'PageError';
