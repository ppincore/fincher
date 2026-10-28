import type { Meta, StoryObj } from '@storybook/react';
import { TableFilter } from './TableFilter';

const ComponentForStories = TableFilter;

const meta = {
  title: 'entities/Transaction/TableFilter',
  component: ComponentForStories,
  args: {},
} satisfies Meta<typeof ComponentForStories>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
