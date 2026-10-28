import type { Meta, StoryObj } from '@storybook/react';
import { EntityTable } from './EntityTable';

const meta = {
  title: 'entities/Transaction/Table',
  component: EntityTable,
} satisfies Meta<typeof EntityTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
