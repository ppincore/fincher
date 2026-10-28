import { ElementType } from 'react';
import { FlexProps } from '../types/stack';
import { Flex } from '../Flex/Flex';

type VStackProps<TTag extends ElementType = 'div'> = Omit<
  FlexProps<TTag>,
  'direction'
>;

export const VStack = <TTag extends ElementType = 'div'>(
  props: VStackProps<TTag>,
) => {
  const { align = 'start' } = props;
  return <Flex {...props} direction="column" align={align} />;
};

VStack.displayName = 'VStack';
