import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';

const meta = {
  title: 'shared/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    title: 'Фильтры',
    footerProps: {
      primaryBtn: { text: 'Find', onClick: () => {} },
      outlineBtn: { text: 'Cancel', onClick: () => {} },
    },
    chipText: 'Chip',
    children: 'Content',
  },
};

export { Primary };
