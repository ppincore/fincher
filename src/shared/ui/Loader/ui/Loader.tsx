import { FC } from 'react';
import classNames from 'clsx';
import cls from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ldsSpinner, className)}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

Loader.displayName = 'Loader';
