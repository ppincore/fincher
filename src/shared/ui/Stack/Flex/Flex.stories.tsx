import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'shared/Flex',
  component: Flex,
  args: {
    children: (
      <>
        <div>Lorem</div>
        <div>Lorem</div>
        <div>Lorem</div>
        <div>Lorem</div>
        <div>Lorem</div>
      </>
    ),
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row: Story = {
  args: {},
};
const RowGap4: Story = {
  args: {
    gap: '4',
  },
};
const RowGap8: Story = {
  args: {
    gap: '8',
  },
};

const RowGap16: Story = {
  args: {
    gap: '16',
  },
};

const Column: Story = {
  args: {
    direction: 'column',
    wrap: true,
  },
};

const ColumnAlignEnd: Story = {
  args: {
    direction: 'column',
    wrap: true,
    align: 'end',
  },
};

const ColumnGap16: Story = {
  args: {
    direction: 'column',
    wrap: true,
    gap: '16',
  },
};

export { Row, RowGap4, RowGap8, RowGap16, Column, ColumnAlignEnd, ColumnGap16 };
