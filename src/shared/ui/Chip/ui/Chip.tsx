import { memo } from 'react';
import classNames from 'clsx';
import { IconChevron, IconCross } from '@shared/assets/icons';
import { ChipProps } from '../types/chip';
import cls from './Chip.module.scss';

export const Chip = memo(function Chip(props: ChipProps) {
  const {
    className,
    theme = 'brand',
    size = 'm',
    disabled,
    text,
    clickable,
  } = props;

  const commonClasses = [
    cls[theme],
    cls[size],
    {
      [cls.disabled]: disabled,
      [cls.chip]: !clickable,
    },
    className,
  ];

  const chip = (
    <span className={classNames(...commonClasses)} onClick={undefined}>
      {text}
    </span>
  );

  if (clickable) {
    let icon = null;
    switch (props.icon) {
      case 'x':
        icon = <IconCross className={cls.icon} />;
        break;
      case '>':
        icon = <IconChevron transform="rotate(-90)" className={cls.icon} />;
        break;
      default:
        icon = <IconChevron transform="rotate(-90)" className={cls.icon} />;
        break;
    }

    return (
      <button
        disabled={disabled}
        type="button"
        className={classNames(cls.button, ...commonClasses)}
        onClick={props.onClick}
      >
        {chip}
        {icon}
      </button>
    );
  }

  return chip;
});

Chip.displayName = 'Chip';
