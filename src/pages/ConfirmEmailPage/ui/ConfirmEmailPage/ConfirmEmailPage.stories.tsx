import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import ConfirmEmailPage from './ConfirmEmailPage';

const meta = {
  title: 'pages/ConfirmEmailPage',
  component: ConfirmEmailPage,
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof ConfirmEmailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
