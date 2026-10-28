import type { Meta, StoryObj } from '@storybook/react';
import { PageNumber } from './PageNumber';

const meta = {
  title: 'shared/Pagination/PageNumber',
  component: PageNumber,
} satisfies Meta<typeof PageNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: { pageNumber: 1, selected: false },
};

export { Primary };
