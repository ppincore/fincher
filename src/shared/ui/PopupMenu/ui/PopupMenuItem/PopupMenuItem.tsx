import { ForwardedRef, forwardRef } from 'react';
import classNames from 'clsx';
import { HStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { Icon, IconTheme } from '@shared/ui/Icon';
import { IPopupMenuItem } from '../../types/popupMenu';
import cls from './PopupMenuItem.module.scss';

interface PopupMenuItemProps extends IPopupMenuItem {
  className?: string;
}

export const PopupMenuItem = forwardRef(function PopupMenuItem(
  props: PopupMenuItemProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { className, text, icon: Svg, onClick, ...otherProps } = props;

  return (
    <button
      onClick={onClick}
      className={classNames(cls.popupMenuItem, className)}
      type="button"
      ref={ref}
      {...otherProps}
    >
      <HStack
        gap="8"
        align="center"
        as={Typography}
        size="body2"
        weight="medium"
        color="secondary"
      >
        <>
          {Svg && <Icon Svg={Svg} theme={IconTheme.SECONDARY} measure={16} />}
          {text}
        </>
      </HStack>
    </button>
  );
});

PopupMenuItem.displayName = 'PopupMenuItem';
