import { ButtonProps } from '@shared/ui/Button';

interface DrawerButtonProps extends Partial<Omit<ButtonProps, 'children'>> {
  text: string;
}

export interface DrawerFooterProps {
  primaryBtn?: DrawerButtonProps;
  outlineBtn?: DrawerButtonProps;
}
