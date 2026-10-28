import { MouseEventHandler } from 'react';
import { IconTheme } from '../consts/icon';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

export type IconSize = '10' | '12' | '16' | '18' | '20' | '24';

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  measure?: number | string;
  size?: IconSize;
  theme?: IconTheme;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
  onClick?: void;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export type IconProps = NonClickableIconProps | ClickableIconProps;
