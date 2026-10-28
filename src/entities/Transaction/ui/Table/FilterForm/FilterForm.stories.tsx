import type { Meta, StoryObj } from '@storybook/react';
import { FilterForm } from './FilterForm';

const meta = {
  title: 'entities/Transaction/Table/FilterForm',
  component: FilterForm,
} satisfies Meta<typeof FilterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
