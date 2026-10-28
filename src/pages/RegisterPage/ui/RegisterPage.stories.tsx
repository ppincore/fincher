import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import RegisterPage from './RegisterPage';

const meta = {
  title: 'pages/RegisterPage',
  component: RegisterPage,
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof RegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
