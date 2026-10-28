import type { Meta, StoryObj } from '@storybook/react';
import { Currency } from '@shared/const/money';
import { InfoCard } from './InfoCard';

const meta = {
  title: 'entities/Account/InfoCard',
  component: InfoCard,
  args: {
    link: '',
  },
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    entityData: {
      userId: '1',
      currency: Currency.RUB,
      name: 'Heading',
      balance: '999',
      id: 'id1',
    },
    chipText: '3,1%',
    type: 'neutral',
  },
};

export { Primary };
