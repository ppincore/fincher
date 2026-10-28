import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta = {
  title: 'shared/Loader',
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
