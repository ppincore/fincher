import type { Meta, StoryObj } from '@storybook/react';
import { RegisterForm } from './RegisterForm';

const meta = {
  title: 'features/Authentication/RegisterForm',
  component: RegisterForm,
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
