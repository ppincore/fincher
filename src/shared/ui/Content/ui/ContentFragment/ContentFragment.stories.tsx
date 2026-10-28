import type { Meta, StoryObj } from '@storybook/react';
import { ContentFragment } from './ContentFragment';

const meta = {
  title: 'shared/Content/ContentFragment',
  component: ContentFragment,
} satisfies Meta<typeof ContentFragment>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    label: 'Label',
    children: <div>Text</div>,
  },
};

export { Primary };
