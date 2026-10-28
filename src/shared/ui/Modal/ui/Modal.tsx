/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FC, ReactNode } from 'react';
import { Overlay } from '@shared/ui/Overlay';
import { Portal } from '@shared/ui/Portal';
import clsx from 'clsx';
import { HStack, VStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { IconCross } from '@shared/assets/icons';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { AppLink, AppLinkTheme, AppLinkSize } from '@shared/ui/AppLink';
import { useSharedModal } from '@shared/lib/hooks';
import cls from './Modal.module.scss';
import { ModalFooterContent } from '../types/modal';

interface OpenedModalProps {
  footerProps?: ModalFooterContent;
  headingText: string;
  chipText?: string;
  isOpen?: boolean;
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
  closeModalState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  loadingState?: {
    isDeleteLoading?: boolean;
    isUpdateLoading?: boolean;
  };
}

// eslint-disable-next-line react/display-name
const OpenedModal: FC<OpenedModalProps> = (props) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    closeModalState,
    footerProps,
    headingText,
    chipText,
    loadingState,
  } = props;

  const linkProps = footerProps?.link;
  const cancelProps = footerProps?.cancel;
  const deleteProps = footerProps?.delete;
  const confirmProps = footerProps?.confirm;

  const { close, onAnimationEnd, isClosing } = useSharedModal({
    animationCls: cls.closeOverlay,
    closeModalState,
    isOpen,
    onClose,
  });

  const mods = {
    [cls.opened]: isOpen,
    [cls.closing]: isClosing,
  };

  return (
    <Portal>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={clsx(cls.modal, mods, [className])}
        onAnimationEnd={onAnimationEnd}
      >
        <Overlay className={cls.overlay} onClick={close} />
        <VStack className={cls.content}>
          <HStack
            max
            gap="8"
            justify="between"
            align="center"
            className={cls.header}
          >
            <Typography color="primary" size="heading3" weight="semibold">
              {headingText}
            </Typography>
            {chipText}
            <button title="close modal" type="button" onClick={close}>
              <IconCross className={cls.crossIcon} />
            </button>
          </HStack>
          <div className={cls.body}>{children}</div>
          {footerProps && (
            <HStack
              max
              gap="8"
              justify="between"
              align="center"
              className={cls.footer}
            >
              <HStack justify="start" gap="8" align="center" max>
                {deleteProps && (
                  <Button
                    size={ButtonSize.S}
                    theme={ButtonTheme.DANGEROUS}
                    onClick={deleteProps.onClick}
                    isLoading={loadingState?.isDeleteLoading || false}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...deleteProps}
                  >
                    {deleteProps.text}
                  </Button>
                )}
                {linkProps && (
                  <AppLink
                    to={linkProps.path}
                    theme={AppLinkTheme.LINK}
                    size={AppLinkSize.M}
                  >
                    {linkProps.text}
                  </AppLink>
                )}
              </HStack>
              <HStack justify="end" gap="8" align="center" max>
                {cancelProps && (
                  <Button
                    size={ButtonSize.S}
                    theme={ButtonTheme.OUTLINE}
                    onClick={cancelProps.onClick}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...cancelProps}
                  >
                    {cancelProps.text}
                  </Button>
                )}
                {confirmProps && (
                  <Button
                    size={ButtonSize.S}
                    theme={ButtonTheme.PRIMARY}
                    onClick={confirmProps.onClick}
                    isLoading={loadingState?.isUpdateLoading || false}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...confirmProps}
                  >
                    {confirmProps.text}
                  </Button>
                )}
              </HStack>
            </HStack>
          )}
        </VStack>
      </div>
    </Portal>
  );
};

interface ModalProps extends OpenedModalProps {
  keepMounted?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
  const { isOpen, keepMounted } = props;

  if (!isOpen && !keepMounted) return null;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <OpenedModal {...props} />;
};

Modal.displayName = 'Modal';
