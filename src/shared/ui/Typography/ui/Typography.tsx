import { ElementType, memo } from 'react';
import classNames from 'clsx';
import type { TypographyProps } from '../types/typography';
import cls from './Typography.module.scss';

export const Typography = memo(function Typography<
  TTag extends ElementType = 'p',
>(props: TypographyProps<TTag>) {
  const {
    as: Wrapper = 'p',
    className,
    children,
    color = 'primary',
    align = 'left',
    size = 'body1',
    weight = 'regular',
    'data-testid': dataTestId = 'Typography',
    ...otherProps
  } = props;

  const additionalCls: (string | undefined)[] = [
    className,
    cls[color],
    cls[align],
    cls[size],
    cls[weight],
  ];

  if (typeof children === 'undefined') {
    return null;
  }

  return (
    <Wrapper
      className={classNames(cls.text, additionalCls)}
      data-testid={`${dataTestId}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
});

Typography.displayName = 'Text';
