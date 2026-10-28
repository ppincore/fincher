import type { Meta, StoryObj } from '@storybook/react';
import { EntitySelect } from './EntitySelect';

const meta = {
  title: 'entities/Account/EntitySelect',
  component: EntitySelect,
  decorators: [],
} satisfies Meta<typeof EntitySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
