import { AnimationEvent, useCallback, useEffect, useState } from 'react';

interface UseModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  animationCls: string;
  closeModalState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export function useSharedModal(props: UseModalProps) {
  const { animationCls, isOpen, onClose, closeModalState = [] } = props;

  const [closeModal = false, setCloseModal] = closeModalState; // TODO: Find better solution (useImperativeHandle)

  const [isClosing, setIsClosing] = useState(false);

  const close = useCallback(() => {
    if (!onClose) return;
    setIsClosing(true);
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    },
    [close],
  );

  const onAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLDivElement>) => {
      if (event.animationName === animationCls) {
        setIsClosing(false);
        onClose?.();
      }
    },
    [animationCls, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
      if (closeModal) close();
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
      setCloseModal?.(false);
    };
  }, [close, closeModal, isOpen, onKeyDown, setCloseModal]);
  return {
    close,
    onAnimationEnd,
    isClosing,
  };
}
