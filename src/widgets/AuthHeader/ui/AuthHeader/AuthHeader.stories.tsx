import type { Meta, StoryObj } from '@storybook/react';
import { AuthHeader } from './AuthHeader';

const meta = {
  title: 'widgets/AuthHeader',
  component: AuthHeader,
} satisfies Meta<typeof AuthHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
