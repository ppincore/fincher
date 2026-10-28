import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'shared/Pagination/Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    currentPage: 1,
    pageSize: 4,
    totalCount: 104,
  },
};

export { Primary };
