import type { Meta, StoryObj } from '@storybook/react';
import { AuthFooter } from './AuthFooter';

const meta = {
  title: 'widgets/AuthFooter',
  component: AuthFooter,
} satisfies Meta<typeof AuthFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
