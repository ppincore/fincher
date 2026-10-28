import type { Meta, StoryObj } from '@storybook/react';
import { AddAccountButtonCard } from './AddAccountButtonCard';

const meta = {
  title: 'entities/Account/AddAccountButtonCard',
  component: AddAccountButtonCard,
  args: { onClick: () => console.debug('clicked') },
} satisfies Meta<typeof AddAccountButtonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
