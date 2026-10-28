import { OverrideTagProps } from '@shared/types/component';
import { ElementType, ReactNode } from 'react';

type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'brand'
  | 'grey'
  | 'greyLight'
  | 'greyDark'
  | 'danger'
  | 'dangerDisabled'
  | 'white';

type TypographySize =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'body1'
  | 'body2'
  | 'caption1';

type TypographyAlign = 'right' | 'left' | 'center';
type TypographyWeight = 'regular' | 'medium' | 'semibold';

export type TypographyProps<TTag extends ElementType = 'p'> = OverrideTagProps<
  TTag,
  {
    as?: TTag;
    children?: ReactNode;
    color?: TypographyColor;
    align?: TypographyAlign;
    size?: TypographySize;
    weight?: TypographyWeight;

    className?: string;
    'data-testid'?: string;
  }
>;
