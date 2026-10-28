import type { Meta, StoryObj } from '@storybook/react';
import ResetPasswordPage from './ResetPasswordPage';

const meta = {
  title: 'pages/ResetPasswordPage',
  component: ResetPasswordPage,
} satisfies Meta<typeof ResetPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
