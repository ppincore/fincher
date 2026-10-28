import type { Meta, StoryObj } from '@storybook/react';
import { TableCellHeader } from './TableCellHeader';

const meta = {
  title: 'shared/Table/TableCell/Header',
  component: TableCellHeader,
} satisfies Meta<typeof TableCellHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
