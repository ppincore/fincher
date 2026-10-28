import { ElementType } from 'react';
import clsx from 'clsx';
import { capitalizeFirstChar } from '@shared/lib/utils';
import { FlexProps } from '../types/stack';
import cls from './Flex.module.scss';

export const Flex = <TTag extends ElementType = 'div'>(
  props: FlexProps<TTag>,
) => {
  const {
    as: Wrapper = 'div',
    className,
    children,
    gap,
    justify = 'start',
    align = 'center',
    direction = 'row',
    directionReverse,
    wrap,
    max,
    fullFill,
    ...otherProps
  } = props;

  const justifyCapital = capitalizeFirstChar(justify);
  const alignCapital = capitalizeFirstChar(align);
  const directionCapital = capitalizeFirstChar(direction);

  const additionalClasses = [
    className,
    cls[`justify${justifyCapital}`],
    cls[`align${alignCapital}`],
    cls[`direction${directionCapital}${directionReverse ? 'Reverse' : ''}`],
    gap && cls[`gap${gap}`],
  ];

  const mods = {
    [cls.wrap]: wrap,
    [cls.max]: max,
    [cls.fullFill]: fullFill,
  };

  return (
    <Wrapper
      className={clsx(cls.flex, mods, additionalClasses)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </Wrapper>
  );
};

Flex.displayName = 'Flex';
