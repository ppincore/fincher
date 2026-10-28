import { ButtonProps } from '@shared/ui/Button';

interface ModalButtonProps extends Partial<Omit<ButtonProps, 'children'>> {
  text: string;
}

export interface ModalFooterContent {
  link?: { text: string; path: string };
  delete?: ModalButtonProps;
  cancel?: ModalButtonProps;
  confirm?: ModalButtonProps;
}
