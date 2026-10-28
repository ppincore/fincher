/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode, memo } from 'react';
import clsx from 'clsx';
import { Overlay } from '@shared/ui/Overlay';
import { Portal } from '@shared/ui/Portal';
import { useSharedModal } from '@shared/lib/hooks';
import { HStack, VStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { Icon, IconTheme } from '@shared/ui/Icon';
import { IconCross } from '@shared/assets/icons';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Chip, ChipTheme } from '@shared/ui/Chip';
import cls from './Drawer.module.scss';
import { DrawerFooterProps } from '../types/drawer';

interface DrawerProps {
  title?: string;
  isOpen?: boolean;
  footerProps?: DrawerFooterProps;
  onClose?: () => void;
  chipText?: string;
  chipTheme?: ChipTheme;
  className?: string;
  children: ReactNode;
}

export const Drawer = memo(function Drawer(props: DrawerProps) {
  const {
    className,
    children,
    isOpen,
    onClose,
    title,
    footerProps,
    chipText,
    chipTheme = 'grey',
  } = props;

  const primaryBtn = footerProps?.primaryBtn;
  const outlineBtn = footerProps?.outlineBtn;

  const { close, onAnimationEnd, isClosing } = useSharedModal({
    animationCls: cls.closeOverlay,
    isOpen,
    onClose,
  });

  const mods = {
    [cls.opened]: isOpen,
    [cls.closing]: isClosing,
  };

  return (
    <Portal>
      <aside
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={onAnimationEnd}
        className={clsx(cls.drawer, mods, className)}
      >
        <Overlay className={cls.overlay} onClick={close} />
        <VStack className={cls.content} max fullFill align="start">
          <HStack
            max
            gap="8"
            justify="between"
            align="center"
            className={cls.header}
          >
            <HStack gap="8" align="center">
              <Typography color="primary" size="heading3" weight="semibold">
                {title}
              </Typography>
              {chipText && <Chip text={chipText} size="l" theme={chipTheme} />}
            </HStack>
            <Icon
              Svg={IconCross}
              theme={IconTheme.PRIMARY}
              clickable
              onClick={close}
              measure="1.25rem"
            />
          </HStack>
          <div className={cls.body}>{children}</div>
          {footerProps && (
            <HStack gap="8" align="start" max className={cls.footer}>
              {primaryBtn && (
                <Button
                  className={cls.btn}
                  size={ButtonSize.S}
                  theme={ButtonTheme.PRIMARY}
                  onClick={primaryBtn.onClick}
                  {...primaryBtn}
                >
                  {primaryBtn.text}
                </Button>
              )}
              {outlineBtn && (
                <Button
                  className={cls.btn}
                  size={ButtonSize.S}
                  theme={ButtonTheme.OUTLINE}
                  onClick={outlineBtn.onClick}
                  {...outlineBtn}
                >
                  {outlineBtn.text}
                </Button>
              )}
            </HStack>
          )}
        </VStack>
      </aside>
    </Portal>
  );
});

Drawer.displayName = 'Drawer';
