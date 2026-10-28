import type { Meta, StoryObj } from '@storybook/react';
import { IconAlertOctagon } from '@shared/assets/icons';
import { PopupMenuItem } from './PopupMenuItem';

const meta = {
  title: 'shared/PopupMenu/Item',
  component: PopupMenuItem,
} satisfies Meta<typeof PopupMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: { text: 'text', icon: IconAlertOctagon },
};

export { Primary };
