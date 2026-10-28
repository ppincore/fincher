import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import LoginPage from './LoginPage';

const meta = {
  title: 'pages/LoginPage',
  component: LoginPage,
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
