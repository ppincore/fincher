import { ReactNode, memo } from 'react';
import classNames from 'clsx';
import cls from './ButtonLoader.module.scss';

interface ButtonLoaderProps {
  className?: string;
  square?: boolean;
  children?: ReactNode;
}

export const ButtonLoader = memo(function ButtonLoader(
  props: ButtonLoaderProps,
) {
  const { className, square, children } = props;
  const btnTypeCls = square ? cls.square : cls.rectangle;

  return (
    <div className={classNames(btnTypeCls, [className])}>
      <div className={cls.loader} />
      <div className={cls.children}>{children}</div>
    </div>
  );
});

ButtonLoader.displayName = 'ButtonLoader';
