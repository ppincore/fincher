import { memo } from 'react';
import clsx from 'clsx';
import cls from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo(function Overlay(props: OverlayProps) {
  const { className, onClick } = props;

  return (
    <div onClick={onClick} className={clsx(cls.overlay, {}, [className])} />
  );
});

Overlay.displayName = 'Overlay';
