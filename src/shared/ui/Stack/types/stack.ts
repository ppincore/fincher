import { ElementType, ReactNode } from 'react';
import { OverrideTagProps } from '@shared/types/component';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap =
  | '0'
  | '1'
  | '2'
  | '4'
  | '6'
  | '8'
  | '12'
  | '16'
  | '24'
  | '32'
  | '48'
  | '64'
  | '96'
  | '128';

export type FlexProps<TTag extends ElementType = 'div'> = OverrideTagProps<
  TTag,
  {
    as?: TTag;
    gap?: FlexGap;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    directionReverse?: boolean;
    wrap?: boolean;
    max?: boolean;
    fullFill?: boolean;
    children: ReactNode;
    className?: string;
  }
>;
