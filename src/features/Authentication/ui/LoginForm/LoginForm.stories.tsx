import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { LoginForm } from './LoginForm';

const meta = {
  title: 'features/LoginForm',
  component: LoginForm,
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
