export type ChipTheme = 'brand' | 'grey' | 'blue' | 'successful' | 'danger';

interface ChipBaseProps {
  text?: string;
  theme?: ChipTheme;
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  className?: string;
}

interface NonClickableChipProps extends ChipBaseProps {
  clickable?: false;
}

interface ClickableChipProps extends ChipBaseProps {
  clickable: true;
  icon: 'x' | '>';
  onClick: () => void;
}

export type ChipProps = NonClickableChipProps | ClickableChipProps;
