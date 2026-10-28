import type { Meta, StoryObj } from '@storybook/react';
import TransactionPage from './TransactionPage';

const meta = {
  title: 'pages/TransactionPage',
  component: TransactionPage,
} satisfies Meta<typeof TransactionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
