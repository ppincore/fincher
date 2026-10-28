import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'shared/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    isOpen: true,
    headingText: 'Heading',
    footerProps: {
      delete: {
        text: 'Удалить',
        onClick: () => {},
      },
      confirm: {
        text: 'Оплатить',
        onClick: () => {},
      },
      cancel: {
        text: 'Не оплатить',
        onClick: () => {},
      },
    },
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ipsum a doloremque assumenda unde porro culpa. Nam, numquam, qui voluptas nihil officiis et, tempora tempore assumenda quam suscipit magnam nesciunt.',
  },
};

export { Primary };
