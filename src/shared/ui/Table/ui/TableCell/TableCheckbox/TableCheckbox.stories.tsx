import type { Meta, StoryObj } from '@storybook/react';
import { TableCheckbox } from './TableCheckbox';

const meta = {
  title: 'shared/TableCell/TableCheckbox',
  component: TableCheckbox,
} satisfies Meta<typeof TableCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
};

export { Primary };
