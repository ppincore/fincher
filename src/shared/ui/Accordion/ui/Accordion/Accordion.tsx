/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactNode, memo, useCallback, useRef, useState } from 'react';
import { Typography } from '@shared/ui/Typography';
import { IconChevron } from '@shared/assets/icons';
import clsx from 'clsx';
import cls from './Accordion.module.scss';

interface AccordionProps {
  text?: string;
  defaultIsShowed?: boolean;
  children?: ReactNode;
  isShown?: boolean;
  setIsShown?: (isShown: boolean) => void;
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
}

export const Accordion = memo(function Accordion(props: AccordionProps) {
  const {
    className,
    triggerClassName,
    contentClassName,
    children,
    text,
    defaultIsShowed = false,
    isShown,
    setIsShown,
  } = props;
  const [shown, setShown] = useState(defaultIsShowed);

  const onAccordionToggle = useCallback(() => {
    if (typeof isShown !== 'undefined') {
      setIsShown?.(!isShown);
      setShown(!isShown);
      return;
    }
    setShown((prev) => !prev);
  }, [isShown, setIsShown]);

  const contentHeight = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(cls.wrapper, className)}>
      <button
        type="button"
        className={clsx(cls.accordion, { [cls.active]: shown }, [
          triggerClassName,
        ])}
        onClick={onAccordionToggle}
      >
        <Typography size="body1" weight="semibold" color="secondary">
          {text}
        </Typography>
        <IconChevron className={cls.chevron} />
      </button>
      <div
        className={clsx(cls.content, contentClassName)}
        ref={contentHeight}
        style={
          shown
            ? { height: contentHeight.current?.scrollHeight }
            : { height: '0' }
        }
      >
        {children}
      </div>
    </div>
  );
});

Accordion.displayName = 'Accordion';
