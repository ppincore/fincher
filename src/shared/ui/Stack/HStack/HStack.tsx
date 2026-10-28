import { ElementType } from 'react';
import { Flex } from '../Flex/Flex';
import { FlexProps } from '../types/stack';

type HStackProps<TTag extends ElementType = 'div'> = Omit<
  FlexProps<TTag>,
  'direction'
>;

export const HStack = <TTag extends ElementType = 'div'>(
  props: HStackProps<TTag>,
) => <Flex {...props} direction="row" />;

HStack.displayName = 'HStack';
