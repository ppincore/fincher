import type { Meta, StoryObj } from '@storybook/react';
import { ContentCard } from './ContentCard';

const meta = {
  title: 'shared/Content/ContentCard',
  component: ContentCard,
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    headingText: 'Some Head',
    children: <div>Some content</div>,
  },
};

export { Primary };
