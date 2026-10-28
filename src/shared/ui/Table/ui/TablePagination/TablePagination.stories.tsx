import type { Meta, StoryObj } from '@storybook/react';
import { TablePagination } from './TablePagination';

const meta = {
  title: 'shared/Table/TablePagination',
  component: TablePagination,
} satisfies Meta<typeof TablePagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  // @ts-ignore
  args: {},
};

export { Primary };
