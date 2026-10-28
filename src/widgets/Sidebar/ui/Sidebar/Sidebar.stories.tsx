import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'widgets/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {},
  decorators: [],
};

export { Primary };
