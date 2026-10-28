import type { Meta, StoryObj } from '@storybook/react';
import { ResetPasswordForm } from './ResetPasswordForm';

const meta = {
  title: 'features/Authentication/ResetPasswordForm',
  component: ResetPasswordForm,
} satisfies Meta<typeof ResetPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
