import type { Meta, StoryObj } from '@storybook/react';
import { InfoCardList } from './InfoCardList';

const meta = {
  title: 'entities/Account/InfoCardList',
  component: InfoCardList,
  args: {},
} satisfies Meta<typeof InfoCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
