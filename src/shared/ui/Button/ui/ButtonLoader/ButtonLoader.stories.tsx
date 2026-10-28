import type { Meta, StoryObj } from '@storybook/react';
import { ButtonLoader } from './ButtonLoader';

const meta = {
  title: 'shared/Button/ButtonLoader',
  component: ButtonLoader,
} satisfies Meta<typeof ButtonLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

const Square: Story = {
  args: {
    square: true,
  },
};

export { Primary, Square };
