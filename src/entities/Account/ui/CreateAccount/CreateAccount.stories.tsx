import type { Meta, StoryObj } from '@storybook/react';
import { CreateAccount } from './CreateAccount';
import { AddAccountButtonCard } from '../AddAccountButtonCard/AddAccountButtonCard';

const meta = {
  title: 'entities/Account/CreateAccount',
  component: CreateAccount,
  args: {},
} satisfies Meta<typeof CreateAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    Trigger: AddAccountButtonCard,
  },
};

export { Primary };
