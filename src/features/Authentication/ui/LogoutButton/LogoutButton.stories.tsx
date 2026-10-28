import type { Meta, StoryObj } from '@storybook/react';
import { LogoutButton } from './LogoutButton';

const meta = {
  title: 'features/Authentication/LogoutButton',
  component: LogoutButton,
} satisfies Meta<typeof LogoutButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
