import type { Meta, StoryObj } from '@storybook/react';
import { TableCell } from './TableCell';

const meta = {
  title: 'shared/Table/TableCell/Body',
  component: TableCell,
} satisfies Meta<typeof TableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
